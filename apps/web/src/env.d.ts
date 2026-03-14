/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_OSS_BASE_URL: string;
  readonly VITE_SITE_NAME: string;
  readonly VITE_SITE_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
