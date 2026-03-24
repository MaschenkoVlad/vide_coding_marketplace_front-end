/**
 * Environment variable validation utilities
 * Throws descriptive errors for missing required variables
 */

interface EnvVarConfig {
  name: string;
  required: boolean;
  description: string;
  example?: string;
}

const ENV_VARS: EnvVarConfig[] = [
  {
    name: 'NEXT_PUBLIC_API_URL',
    required: true,
    description: 'Base URL for API requests',
    example: 'http://localhost:4000',
  },
  {
    name: 'NEXT_PUBLIC_APP_NAME',
    required: false,
    description: 'Application name',
    example: 'VIDE Marketplace',
  },
];

export function validateEnvironment() {
  const errors: string[] = [];
  const warnings: string[] = [];

  ENV_VARS.forEach(({ name, required, description, example }) => {
    const value = process.env[name];
    
    if (required && !value) {
      errors.push(
        `❌ Missing required environment variable: ${name}\n` +
        `   Description: ${description}\n` +
        `   Example: ${name}=${example}\n` +
        `   Add it to your .env.local file`
      );
    } else if (!value) {
      warnings.push(
        `⚠️ Optional environment variable not set: ${name}\n` +
        `   Description: ${description}\n` +
        `   Example: ${name}=${example}`
      );
    }
  });

  if (errors.length > 0) {
    const errorMessage = 
      'Environment Configuration Error:\n\n' +
      errors.join('\n\n') +
      '\n\nPlease fix these errors and restart the development server.';
    
    throw new Error(errorMessage);
  }

  if (warnings.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn(
      'Environment Warnings:\n\n' +
      warnings.join('\n\n') +
      '\n\nThese are optional but recommended for better functionality.'
    );
  }

  return true;
}

export function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Required environment variable ${name} is not set. ` +
      `Please add it to your .env.local file.`
    );
  }
  return value;
}

export function getOptionalEnvVar(name: string, defaultValue?: string): string | undefined {
  return process.env[name] || defaultValue;
}
