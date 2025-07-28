<div align="center" id="top">

# DevLink Project

Empowering Seamless Connections for a Brighter Digital Future.

</div>

<div align="center">
**Built with the tools and technologies:**

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json)
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-121012?style=for-the-badge&logo=railway&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Overview

DevLink is a versatile developer tool designed to streamline the creation of personalized link-sharing platforms. It combines a robust backend API with a sleek, component-driven frontend, enabling rapid development of scalable, secure, and visually consistent web applications.

### Why DevLink?

This project empowers developers to build feature-rich, user-centric applications with ease. The core features include:

- **Modular Architecture:** A clean separation of backend and frontend components for maintainability and scalability.
- **Reusable UI Components:** Pre-built elements like buttons, cards, carousels, and accordions ensure a cohesive user experience.
- **Secure Authentication:** JWT-based login, registration, and protected routes safeguard user data.
- **Profile & Link Management:** Seamless user profile customization and link sharing capabilities.
- **Developer Utilities:** Utility functions for styling, API interactions, and theme management streamline development workflows.

## Getting Started

### Prerequisites

This project requires the following dependencies:

* **Programming Language:** TypeScript
* **Package Manager:** Npm

### Installation

Build `devlink-project` from the source and install dependencies:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Brrendenn/devlink-project](https://github.com/Brrendenn/devlink-project)
    ```
2.  Navigate to the project directory:
    ```bash
    cd devlink-project
    ```
3.  Install the dependencies for both the client and the server:
    ```bash
    # Install server dependencies
    cd api 
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

## Usage

To run the project locally for development, you will need to run both the frontend and backend servers in separate terminals.

1.  **Run the Backend Server:**
    * Navigate to the `api` directory (`cd api`).
    * Create a `.env` file and add your `DATABASE_URL` and `JWT_SECRET`.
    * Run the development server:
        ```bash
        npm run dev
        ```
2.  **Run the Frontend Client:**
    * Navigate to the `client` directory (`cd client`).
    * Create a `.env.local` file and add `NEXT_PUBLIC_API_URL=http://localhost:5001`.
    * Run the development server:
        ```bash
        npm run dev
        ```

## Testing

Devlink-project uses the `jest` test framework. Run the test suite with:

Using `npm`:
```bash
npm test
```

<div align="left"><a href="#top">⬆️ Return to Top</a></div>
