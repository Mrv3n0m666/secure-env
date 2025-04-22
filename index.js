import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

console.log("Starting SecureEnv script...");

class SecureEnv {
  constructor(options = {}) {
    this.strictMode = options.strictMode || false;
    this.env = process.env || {};
    this.validated = {};
    this.errors = [];
  }

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

    let parsedValue = value;
    if (type === 'number') {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        this.errors.push(`Invalid type for ${key}: expected number, got ${value}`);
      }
    } else if (type === 'boolean') {
      parsedValue = value.toLowerCase() === 'true' || value === '1';
    }

    if (pattern && !pattern.test(value)) {
      this.errors.push(`Invalid format for ${key}: does not match pattern`);
    }

    if (this.isSensitiveKey(key) && !this.isSafeValue(value)) {
      this.errors.push(`Security warning: ${key} contains potentially sensitive data`);
    }

    this.validated[key] = parsedValue;
    return this;
  }

  validate() {
    this.printLogo();

    if (this.errors.length > 0) {
      if (this.strictMode) {
        throw new Error(`Environment validation failed:\n${this.errors.join('\n')}`);
      }
      return false;
    }
    return true;
  }

  get(key) {
    return this.validated[key];
  }

  getAll() {
    return { ...this.validated };
  }

  isSensitiveKey(key) {
    const sensitivePatterns = [/key/i, /pass/i, /secret/i, /token/i, /cred/i];
    return sensitivePatterns.some(pattern => pattern.test(key));
  }

  isSafeValue(value) {
    const credentialPattern = /^[A-Za-z0-9+/=]{20,}$/;
    return !credentialPattern.test(value);
  }

  printLogo() {
    const ascii = figlet.textSync('tea-contribute', {
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });
    console.log(gradient.pastel.multiline(ascii));
    console.log(chalk.gray('         Open Source. Real Value.\n'));
  }
}

console.log("Creating SecureEnv instance...");

const secureEnv = new SecureEnv();
secureEnv.validate();

console.log("Script completed!");
