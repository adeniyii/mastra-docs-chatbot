import { MCPConfiguration } from "@mastra/mcp";

// Create an MCP configuration for the Mastra docs server
export const docsMcp = new MCPConfiguration({
  id: "mastra-docs", // Unique identifier to prevent memory leaks
  servers: {
    mastraDocs: {
      // Using npx to run the Mastra docs server
      command: "npx",
      args: ["-y", "@mastra/mcp-docs-server@latest"],
    },
  },
});
