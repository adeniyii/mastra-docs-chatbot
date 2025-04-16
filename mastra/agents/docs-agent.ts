import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { docsMcp } from "../mcp-config";

// Initialize the agent in an async function
export const initDocsAgent = async () => {
  // Get all tools from the MCP server
  const tools = await docsMcp.getTools();

  return new Agent({
    name: "docs-agent",
    instructions:
      // Persistence reminder - ensures the model keeps going through multi-step process
      "You are a helpful assistant specialized in Mastra documentation and usage. " +
      "You are an agent - please keep going until the user's query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved. " +

      // Tool-calling reminder - encourages proper use of available tools
      "You have access to the complete Mastra documentation, code examples, blog posts, and package changelogs through your tools. " +
      "If you are not sure about specific Mastra features, documentation, or codebase structure pertaining to the user's request, use your tools to search and gather the relevant information: do NOT guess or make up an answer. " +

      // Planning reminder - ensures thoughtful approach before tool use
      "You MUST plan extensively before each tool call, and reflect extensively on the outcomes of the previous tool calls. This will help you provide more accurate and helpful information. " +

      // Task-specific guidance
      "When answering questions about Mastra: " +
      "1. Break down complex questions into specific search queries " +
      "2. Use documentation tools to find accurate information " +
      "3. Analyze the retrieved information critically " +
      "4. Provide complete, practical code examples that follow Mastra best practices " +
      "5. When showing code, ensure it includes all necessary imports and setup " +
      "6. If information is not available in the docs, be honest about the limitations " +
      "7. For implementation questions, provide step-by-step guidance with context",
    model: openai("gpt-4.1"),
    tools,
  });
};

// Export the function initially, will be replaced with the agent instance when initialized
export const docsAgent = initDocsAgent();
