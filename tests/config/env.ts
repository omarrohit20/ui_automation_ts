export type TestEnvironment = 'dev' | 'qa' | 'prod';

interface EnvConfig {
  name: TestEnvironment;
  baseUrl: string;
}

const ENV_VAR = (process.env.TEST_ENV as TestEnvironment | undefined) ?? 'dev';

const CONFIGS: Record<TestEnvironment, EnvConfig> = {
  dev: {
    name: 'dev',
    baseUrl: 'https://preview.owasp-juice.shop/',
  },
  qa: {
    name: 'qa',
    baseUrl: 'https://preview.owasp-juice.shop/',
  },
  prod: {
    name: 'prod',
    baseUrl: 'https://preview.owasp-juice.shop/',
  },
};

export const envConfig: EnvConfig = CONFIGS[ENV_VAR];

