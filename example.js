// File: example.js
// Example usage of SecureEnv

const SecureEnv = require('./index');

const env = new SecureEnv({ strictMode: true });

// Define environment variables with validation
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
  })
  .define('DB_PASSWORD', {
    required: true,
  });

// Validate environment variables
try {
  if (env.validate()) {
    console.log('Environment variables validated successfully!');
    console.log('API_KEY:', env.get('API_KEY'));
    console.log('PORT:', env.get('PORT'));
    console.log('DEBUG:', env.get('DEBUG'));
    console.log('DB_PASSWORD:', env.get('DB_PASSWORD'));
    console.log('All validated envs:', env.getAll());
  }
} catch (error) {
  console.error('Validation error:', error.message);
}