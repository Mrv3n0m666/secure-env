const SecureEnv = require('../index');

test('should validate required environment variable', () => {
  process.env.API_KEY = 'abc123';
  const env = new SecureEnv();
  env.define('API_KEY', { required: true });
  expect(env.validate()).toBe(true);
  expect(env.get('API_KEY')).toBe('abc123');
});

test('should throw error in strict mode for missing required variable', () => {
  delete process.env.API_KEY;
  const env = new SecureEnv({ strictMode: true });
  env.define('API_KEY', { required: true });
  expect(() => env.validate()).toThrow();
});

test('should validate number type', () => {
  process.env.PORT = '3000';
  const env = new SecureEnv();
  env.define('PORT', { type: 'number' });
  expect(env.validate()).toBe(true);
  expect(env.get('PORT')).toBe(3000);
});

test('should detect sensitive key', () => {
  process.env.API_KEY = 'supersecretkey1234567890';
  const env = new SecureEnv();
  env.define('API_KEY', { required: true });
  env.validate();
  expect(env.errors).toContain('Security warning: API_KEY contains potentially sensitive data');
});