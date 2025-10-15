# Nest Hub: Your Gateway to Africa’s Digital Economy

This is a Next.js application built with Firebase Studio, designed to power the Nest Hub ecosystem. It includes multiple modules like NestMall, NestHomes, NestTravel, and a powerful AI-driven search functionality.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Set Up Environment Variables](#2-set-up-environment-variables)
  - [3. Run the Development Server](#3-run-the-development-server)
- [Deployment with Firebase App Hosting](#deployment-with-firebase-app-hosting)
  - [Why Firebase App Hosting?](#why-firebase-app-hosting)
  - [Step 1: Install Firebase CLI](#step-1-install-firebase-cli)
  - [Step 2: Login to Firebase](#step-2-login-to-firebase)
  - [Step 3: Initialize Firebase](#step-3-initialize-firebase)
  - [Step 4: Deploy Your Application](#step-4-deploy-your-application)
- [Project Structure Overview](#project-structure-overview)
- [Available Scripts](#available-scripts)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js**: Version 20 or later.
- **npm**: (Comes with Node.js)

## Getting Started

Follow these steps to get the application running locally.

### 1. Install Dependencies

Navigate to the project's root directory in your terminal and run the following command to install all the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

The application may require environment variables for connecting to various services. Create a file named `.env.local` in the root of your project and add any required variables. For example:

```
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** The Genkit AI flows require a `GEMINI_API_KEY` to function correctly.

### 3. Run the Development Server

To start the Next.js application in development mode, run:

```bash
npm run dev
```

This will start the development server, typically on `http://localhost:9002`. The application will automatically reload if you make changes to the code.

## Deployment with Firebase App Hosting

This project is pre-configured for easy deployment using **Firebase App Hosting**, a fully-managed, secure hosting service for web apps.

### Why Firebase App Hosting?

- **SSR with Next.js**: Built-in support for server-side rendering frameworks like Next.js.
- **Fully-Managed**: Handles infrastructure, so you can focus on your app.
- **Security**: Provides built-in protection against DDoS and other threats.
- **CI/CD**: Integrates seamlessly with GitHub for automated builds and deployments.

### Step 1: Install Firebase CLI

If you haven't already, install the Firebase Command Line Interface (CLI) globally on your machine.

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

Log in to your Google account using the Firebase CLI.

```bash
firebase login
```

### Step 3: Initialize Firebase

From your project's root directory, you can connect your local project to a Firebase project. If you haven't created a Firebase project yet, you can do so in the [Firebase Console](https://console.firebase.google.com/).

Run the `init` command and select **App Hosting**.

```bash
firebase init
```

Follow the prompts to associate your local project with your Firebase project. The `apphosting.yaml` file in this repository already contains the basic configuration for a Next.js app.

### Step 4: Deploy Your Application

Once your project is initialized, you can deploy your application with a single command. This command builds your Next.js app and deploys it to the App Hosting backend.

```bash
npm run deploy
```

After the deployment is complete, the CLI will output the URL of your live application.

## Project Structure Overview

- **`src/app/`**: Contains all the routes and pages of the application, following the Next.js App Router structure.
- **`src/components/`**: Shared React components used across the application.
- **`src/lib/`**: Utility functions, mock data, and service layers (e.g., `firebase-services.ts`).
- **`src/ai/`**: Contains all Genkit-related code, including AI flows and tools.
- **`public/`**: Static assets like images and fonts.
- **`apphosting.yaml`**: Configuration file for Firebase App Hosting.
- **`next.config.ts`**: Configuration for Next.js.

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Creates a production-ready build of the application.
- **`npm run start`**: Starts the production server (requires `npm run build` first).
- **`npm run lint`**: Lints the code for errors and style issues.
- **`npm run deploy`**: Deploys the application to Firebase App Hosting.
