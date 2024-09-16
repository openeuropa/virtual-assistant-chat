# Embeddable Virtual Assistant Chat

This repository provides an embeddable chat widget designed to be seamlessly integrated into any websites.
It enables site editors to interact with an AI virtual assistant directly from their site, enhancing productivity and streamlining workflows.

## Installation

To integrate the **Embeddable Virtual Assistant Chat** into your website, follow these steps:

### 1. Prerequisites

The chat widget requires **React** and **ReactDOM** to be loaded on the page. Ensure that your project includes these
libraries, either via CDN or installed as part of your project’s dependencies.

### 2. Add the Virtual Assistant Chat Files

[Download](https://github.com/openeuropa/virtual-assistant-chat/releases/) and include the following files in your project:

- **`virtual-assistant-chat.css`**: Stylesheet for the chat widget.
- **`virtual-assistant-chat.js`**: JavaScript file that contains the chat functionality.

```html
<!-- Include CSS for styling -->
<link rel="stylesheet" href="path/to/virtual-assistant-chat.css">

<!-- Include JS for the chat functionality -->
<script src="path/to/virtual-assistant-chat.js"></script>
```

### 3. Setting Up the Chat Widget

In your HTML, add a container where the chat widget will be rendered, for example:

```html
<div id="virtual-assistant"></div>
```

Then, in your JavaScript, initialize the chat widget as follows:

```javascript
const domContainer = document.querySelector('#virtual-assistant');
const root = ReactDOM.createRoot(domContainer);

const chat = VirtualAssistant({
  backendUrl: "https://ai-backend-url.eu",
  jwtEndpoint: "https://your-site.eu/jwt-endpoint",
});

root.render(chat);
```

- **`backendUrl`**: This is the base URL of your AI virtual assistant backend.
- **`jwtEndpoint`**: This is the URL of your JWT issuer endpoint, likely the current website where the chat is embedded.

### 4. JWT Token Handling

When the chat widget is mounted and ready, it makes an initial request to the **JWT issuer** (defined by the `jwtEndpoint`) to retrieve a JWT token.
This token is then used to authenticate the user in interactions with the AI virtual assistant backend.

#### Required Fields in JWT Payload:

The JWT payload must contain the following information:

```json
{
  "iat": 1726136574,
  "exp": 1726140174,
  "name": "John Doe",
  "sub": "john@example.org",
  "iss": "https://your-site.eu"
}
```

- **`iat`**: Issued At - timestamp of when the token was created.
- **`exp`**: Expiration - timestamp indicating when the token will expire.
- **`name`**: Full name of the user.
- **`sub`**: Subject - an identifier for the user, typically the user's email address.
- **`iss`**: Issuer - the URL of the website where the chat is embedded.

### 5. Example of JWT Authorization in Requests

The JWT token obtained from the issuer will be included in every request made by the chat to the AI virtual assistant backend.
The token will be sent as a **Bearer token** in the HTTP `Authorization` header.

An example HTTP request to the backend’s `/ask` endpoint:

#### Example Request:

```http
GET /ask?question=What is the weather today? HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjYxMzY1NzQsImV4cCI6MTcyNjE0MDE3NCwibmFtZSI6IkpvaG4gRG9lIiwic3ViIjoiam9obkBleGFtcGxlLm9yZyIsImlzcyI6Imh0dHBzOi8veW91ci1zaXRlLmV1In0.jp19AcFwegwKJIKg2_TrUaVXrTTTI0IK9BwORwI7R1Y
```

- **`/ask?question=What is the weather today?`**: Example request to the AI backend, asking a question.
- **`Authorization: Bearer <JWT token>`**: The JWT token is sent in the request's `Authorization` header.

### 6. Token Expiration and Renewal

Once the JWT token expires (as determined by the `exp` field in the payload), the chat will automatically request a
new token from the JWT issuer (`jwtEndpoint`). This process ensures uninterrupted communication between the chat widget
and the AI virtual assistant backend.

## Developer Documentation

This project is built using modern web development tools like **pnpm**, **Vite**, and **React**, and includes both unit and end-to-end testing with **Vitest** and **Cypress**.

### 1. Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Make sure Node.js is installed on your machine.
- **pnpm**: This project uses `pnpm` as the package manager. Install it globally if you don't have it:

  ```bash
  npm install -g pnpm
  ```

### 2. Project Setup

To get started with the project, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/openeuropa/virtual-assistant-chat.git

# Navigate into the project directory
cd virtual-assistant-chat

# Install dependencies using pnpm
pnpm install
```

### 3. Running the Development Server

To start the development server, run the following command:

```bash
pnpm dev
```

This will start a development server with **Vite** and make the project available at `http://127.0.0.1:5173` by default.

#### Mock Servers Setup

The project is equipped with two mock servers:

1. **JWT Issuer**: Simulates the JWT token issuance process, which is essential for authentication.
2. **AI Virtual Assistant Backend**: Mocks the backend responses from the AI assistant.

Both mock servers are managed using Docker. To run these servers, you need to have **Docker** and **Docker Compose** installed.

You can spin up the containers by running the following command:

```bash
docker compose up -d
```

This will start the mock services in the background (`-d` runs the containers in detached mode).

### 4. Building for Production

To build the project for production, use:

```bash
pnpm build
```

The build files will be output to the `dist/` directory, ready to be deployed to your web server.

### 5. Previewing the Build

After building the project, you can preview the production build locally by running:

```bash
pnpm preview
```

### 6. Linting and Formatting

This project uses **ESLint** for linting and **Prettier** for code formatting.

- **To lint the project**:

  ```bash
  pnpm lint
  ```

- **To format the code using Prettier**:

  ```bash
  pnpm prettier-write
  ```

- **To check formatting with Prettier** (without modifying files):

  ```bash
  pnpm prettier-check
  ```

### 7. Unit Testing

The project uses **Vitest** for unit tests. To run the unit tests, use:

```bash
pnpm test
```

This command will execute all unit tests located in the `tests/` folder and display the results in the terminal.

### 8. End-to-End Testing

End-to-end tests are handled using **Cypress**. There are two ways to run Cypress tests:

- **To run Cypress tests in headless mode**:

  ```bash
  pnpm cypress-run
  ```

- **To open the Cypress test runner in the browser** (for interactive testing):

  ```bash
  pnpm cypress-open
  ```

By default, the tests will be executed in **Chrome** when running the interactive mode.

### 9. Storybook

This project uses **Storybook** for UI component development. Storybook allows you to visually test and document React components in isolation.

- **To start Storybook locally**:

  ```bash
  pnpm storybook
  ```

  This will start a Storybook server at `http://localhost:6006`.

- **To build Storybook for production**:

  ```bash
  pnpm build-storybook
  ```

The Storybook build files will be output to the `storybook-static/` directory.

### 10. Git Hooks

This project uses **Husky** for Git hooks. Husky is already set up to automatically lint and format code before each commit to ensure code quality.

- **To prepare Husky** (this is automatically run during the install phase):

  ```bash
  pnpm prepare
  ```

### 11. Available Scripts

Here is a summary of the available scripts defined in the `package.json`:

- **`pnpm dev`**: Start the Vite development server.
- **`pnpm build`**: Build the project for production.
- **`pnpm lint`**: Run ESLint to check for linting errors.
- **`pnpm preview`**: Preview the production build locally.
- **`pnpm test`**: Run unit tests using Vitest.
- **`pnpm cypress-run`**: Run end-to-end tests in headless mode using Cypress.
- **`pnpm cypress-open`**: Open Cypress test runner in the browser for interactive testing.
- **`pnpm prettier-write`**: Format the codebase using Prettier.
- **`pnpm prettier-check`**: Check code formatting without modifying files.
- **`pnpm storybook`**: Start Storybook to develop components in isolation.
- **`pnpm build-storybook`**: Build Storybook for production.
- **`pnpm prepare`**: Prepare Husky for Git hooks.
