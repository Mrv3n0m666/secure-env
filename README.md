# SecureEnv

**A lightweight JavaScript/TypeScript library for secure environment variable parsing and validation**.

SecureEnv ensures your environment variables are correctly validated, helping to prevent the leakage of sensitive credentials and ensuring valid configurations across applications.

## Features

- **Zero dependencies** for maximum compatibility.
- Validates environment variables by type (string, number, boolean) and regex patterns.
- **Strict mode** to enforce validation rules.
- Detects potentially sensitive data (e.g., API keys, passwords) to prevent exposure.
- Seamless integration with **Node.js**, **Express**, **React**, and more.

## Installation

```bash
npm install secure-env
