# Mastra Docs Chatbot

A Next.js application that uses Mastra agents to provide a chat interface for interacting with:

1. Docs Agent - a documentation assistant that uses the Mastra MCP docs server to provide accurate information about Mastra

## Features

- A specialized Mastra agent with a custom model and tools
- Model Context Protocol (MCP) integration for documentation search
- Real-time streaming responses
- Conversation memory between sessions
- Modern UI with Assistant UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mastra-docs-chatbot
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
   Create a `.env.local` file with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

- The homepage features the Docs Agent, which can answer questions about Mastra documentation, code examples, and best practices.
- The agent maintains conversation history across sessions.

## How It Works

- The application uses Mastra agents with the MCP (Model Context Protocol) integration to access documentation.
- The docs agent can search through the Mastra documentation, examples, blog posts, and package changelog information.
- The UI is built with Next.js and Assistant UI components for a modern chat experience.
