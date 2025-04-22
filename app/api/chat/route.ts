import { getMastra } from "@/src/mastra";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {

    // Extract the messages from the request body
    const { messages } = await req.json();

    // Get the chefAgent instance from Mastra
    const mastra = await getMastra();
    if (!mastra) {
      return new Response("Mastra not initialized", { status: 500 });
    }
    const agent = mastra.getAgent("docsAgent");

    // Stream the response using the agent
    const result = await agent.stream(messages);

    for await (const chunk of result.fullStream) {
      console.log(chunk);
    }

    // Return the result as a data stream response
    return result.toDataStreamResponse({
      getErrorMessage (error) {
        return `An error occurred while processing your request. ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      },
    });
  } catch (error) {
    console.error({error});
    return new Response("Internal Server Error", { status: 500 });
  }
}
