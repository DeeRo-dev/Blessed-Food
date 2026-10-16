/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NUM_TELEPHONE: string
  readonly SHEET_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
