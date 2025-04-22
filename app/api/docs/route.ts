import { getMastra } from "@/src/mastra";
import { docsMcp } from "@/src/mastra/mcp-config";

// Allow streaming responses up to 60 seconds for complex tool usage and reasoning
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // Extract the messages from the request body
    const { messages } = await req.json();

    const mastra = await getMastra();
    if (!mastra) {
      return new Response("Mastra not initialized", { status: 500 });
    }
    const agent = mastra.getAgent("docsAgent");

    if (!agent) {
      console.error("Docs agent not initialized yet");
      return new Response("Agent not initialized yet. Please try again in a moment.", { status: 503 });
    }

    // Get the current toolsets from the MCP server
    const toolsets = await docsMcp.getToolsets();

    // Stream the response using the agent with the MCP toolsets
    const result = await agent.stream(messages, {
      toolsets,
      maxSteps: 20,
    });

    // Log chunks for debugging
    for await (const chunk of result.fullStream) {
      console.log(chunk);
    }

    // Return the result as a data stream response
    return result.toDataStreamResponse({
      getErrorMessage(error: unknown) {
        return `An error occurred while processing your request. ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      },
    });
  } catch (error) {
    console.error({ error });
    return new Response("Internal Server Error", { status: 500 });
  }
}
