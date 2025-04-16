import { Mastra } from "@mastra/core";
import { docsAgent } from "./agents/docs-agent";

// Async initialization function for docs agent
export const getMastra = async () => {
  try {
    // Wait for the docs agent to be initialized
    const initializedDocsAgent = await docsAgent;
		console.log("Docs agent successfully initialized in Mastra");

    // Create a new Mastra instance with both agents
    return new Mastra({
      agents: {
        docsAgent: initializedDocsAgent,
      },
    });

  } catch (error) {
    console.error("Failed to initialize docs agent:", error);
  }
};
