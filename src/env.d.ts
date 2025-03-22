/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  readonly VITE_BACKEND_URL_DEV: string
  readonly VITE_VAPI_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 