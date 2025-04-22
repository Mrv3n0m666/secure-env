SecureEnv
A lightweight JavaScript/TypeScript library for parsing and validating environment variables with a focus on security. SecureEnv helps prevent leakage of sensitive credentials and ensures your application uses valid configuration.
Features

Zero dependencies for maximum compatibility and teaRank optimization.
Validates environment variables by type (string, number, boolean) and regex patterns.
Detects potentially sensitive data (e.g., API keys, passwords) to prevent exposure.
Strict mode to enforce validation rules.
Simple API for integration with Node.js, Express, React, or other frameworks.

Installation
npm install secure-env

Usage
const SecureEnv = require('secure-env');

const env = new SecureEnv({ strictMode: true });

// Define environment variables
env
  .define('API_KEY', {
    required: true,
    pattern: /^[a-zA-Z0-9]{32}$/,
  })
  .define('PORT', {
    type: 'number',
    defaultValue: 3000,
  })
  .define('DEBUG', {
    type: 'boolean',
    defaultValue: false,
  });

// Validate and access variables
try {
  if (env.validate()) {
    console.log('Validated:', env.getAll());
  }
} catch (error) {
  console.error('Validation error:', error.message);
}

Why SecureEnv?

Security: Prevents accidental exposure of sensitive credentials.
Lightweight: No external dependencies, ideal for tea Protocol's teaRank.
Flexible: Works with any Node.js-based project or framework.

Contributing
Contributions are welcome! Please open an issue or pull request on GitHub.
License
MIT
