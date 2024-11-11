declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_USERNAME: string;
      readonly DB_PASSWORD: string;
    }
  }
}

export {};
