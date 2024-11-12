declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly APP_PORT: string;

      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_USERNAME: string;
      readonly DB_PASSWORD: string;

      readonly ADMIN_USERNAME: string;
      readonly ADMIN_EMAIL: string;
      readonly ADMIN_PASSWORD: string;

      readonly ACCESS_TOKEN_SECRET: string;
      readonly REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {};
