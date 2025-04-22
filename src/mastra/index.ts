import { Mastra } from "@mastra/core";
import { docsAgent } from "./agents/docs-agent";

export const mastra = new Mastra({
  agents: {
    docsAgent,
  },
});
