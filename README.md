# Gemini-API Chatbot Assistant

This repository contains the Gemini-API chatbot assistant, organized as a monorepo using Turborepo. The project includes a Next.js frontend, a NestJS backend, and NextAuth.js v5 for authentication.

## Monorepo Structure

The monorepo is structured as follows:
- `apps/web`: The Next.js frontend application.
- `apps/server`: The NestJS backend application.

## Prerequisites

- Node.js (>= 18.x)
- Yarn

## Getting Started

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/akapez/gemini-chat-bot.git
    cd gemini-chat-bot
    ```

2. Install dependencies using Yarn:

    ```sh
    yarn install
    ```

### Environment Variables

Create `.env` files in the `apps/web` and `apps/server` directories with the following variables:

#### Server Environment Variables (`apps/server/.env`)

```env
GEMINI_API_KEY=""
```

#### Web Environment Variables (`apps/web/.env.development.local`)

```env
API_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

### Build

To build all apps and packages, run the following command:

```
cd gemini-chat-bot
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd gemini-chat-bot
yarn dev
```


## Useful Links

- [Gemini API reference](https://ai.google.dev/api?lang=node)
