export type TestEnvironment = 'dev' | 'qa' | 'prod';

interface EnvConfig {
  name: TestEnvironment;
  baseUrl: string;
}

const ENV_VAR = (process.env.TEST_ENV as TestEnvironment | undefined) ?? 'dev';

const CONFIGS: Record<TestEnvironment, EnvConfig> = {
  dev: {
    name: 'dev',
    baseUrl: 'https://demo.owasp-juice.shop',
  },
  qa: {
    name: 'qa',
    baseUrl: 'https://demo.owasp-juice.shop',
  },
  prod: {
    name: 'prod',
    baseUrl: 'https://demo.owasp-juice.shop',
  },
};

export const envConfig: EnvConfig = CONFIGS[ENV_VAR];

