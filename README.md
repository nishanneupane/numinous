# Numinous: Your Personalized AI Companion Platform

Numinous is an innovative platform that allows users to create and interact with custom AI companions. This unique project combines cutting-edge AI technology with personalization to offer a tailored digital experience for each user.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Ngrok Setup](#ngrok-setup)
- [Stripe Webhook Configuration](#stripe-webhook-configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up Numinous on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nishanneupane/numinous.git
   ```
   This command creates a local copy of the Numinous project, giving you access to all the source code and resources.

2. Navigate to the project directory:
   ```bash
   cd numinous
   ```
   This step ensures you're in the correct folder to proceed with the setup.

3. Install dependencies:
   ```bash
   npm install
   ```
   This command installs all necessary Node.js packages, including AI libraries and user interface components.

## Usage

Numinous offers a unique and personalized AI experience:

- Create Your Companion: Design and customize your AI companion based on your preferences and needs.
- Interact and Learn: Engage in conversations, ask questions, and receive personalized responses from your AI companion.
- Evolve Together: As you interact more, your AI companion learns and adapts, providing an increasingly tailored experience.

Detailed instructions on creating and interacting with your AI companion are available in our user guide.

## Development

To start developing and enhancing Numinous:

1. Ensure you're in the project directory.
2. Launch the development server:
   ```bash
   npm run dev
   ```
   This command starts the local server, typically accessible at `http://localhost:3000`.
3. Open your web browser and navigate to the local server address to view and interact with the application.
4. As you modify the code, the development server will automatically update to reflect your changes, allowing for real-time testing and development.

## Ngrok Setup

To expose your local development server to the internet using Ngrok:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open Ngrok and run the following command:
   ```bash
   ngrok http --domain=working-shepherd-locally.ngrok-free.app 3000
   ```

3. Update Stripe webhook:
   - Add the new webhook address to your Stripe dashboard:
     `https://working-shepherd-locally.ngrok-free.app/api/webhook`
   - Generate a new Webhook Secret in Stripe and update your environment variables.

Note: Ensure your Ngrok domain is consistent across sessions to avoid frequent Stripe webhook updates.