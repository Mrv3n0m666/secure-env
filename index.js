// File: index.js
// Main entry point for SecureEnv library

class SecureEnv {
  constructor(options = {}) {
    this.strictMode = options.strictMode || false;
    this.env = process.env || {};
    this.validated = {};
    this.errors = [];
  }

  // Define expected environment variables with validation rules
  define(key, options = {}) {
    const value = this.env[key];
    const { required = false, type = 'string', pattern = null, defaultValue = undefined } = options;

    if (value === undefined || value === '') {
      if (required) {
        this.errors.push(`Missing required environment variable: ${key}`);
      }
      this.validated[key] = defaultValue;
      return this;
    }

    // Type validation
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        this.errors.push(`Invalid type for ${key}: expected number, got ${value}`);
      }
    } else if (type === 'boolean') {
      parsedValue = value.toLowerCase() === 'true' || value === '1';
    }

    // Regex pattern validation
    if (pattern && !pattern.test(value)) {
      this.errors.push(`Invalid format for ${key}: does not match pattern`);
    }

    // Security check for sensitive data exposure
    if (this.isSensitiveKey(key) && !this.isSafeValue(value)) {
      this.errors.push(`Security warning: ${key} contains potentially sensitive data`);
    }

    this.validated[key] = parsedValue;
    return this;
  }

  // Check if all validations passed
  validate() {
    if (this.errors.length > 0) {
      if (this.strictMode) {
        throw new Error(`Environment validation failed:\n${this.errors.join('\n')}`);
      }
      return false;
    }
    return true;
  }

  // Get validated environment variables
  get(key) {
    return this.validated[key];
  }

  // Get all validated environment variables
  getAll() {
    return { ...this.validated };
  }

  // Check if key is potentially sensitive (e.g., API_KEY, PASSWORD)
  isSensitiveKey(key) {
    const sensitivePatterns = [/key/i, /pass/i, /secret/i, /token/i, /cred/i];
    return sensitivePatterns.some(pattern => pattern.test(key));
  }

  // Check if value is safe (e.g., not a hardcoded credential)
  isSafeValue(value) {
    // Avoid exposing long, complex strings that look like credentials
    const credentialPattern = /^[A-Za-z0-9+/=]{20,}$/;
    return !credentialPattern.test(value);
  }
}

module.exports = SecureEnv;