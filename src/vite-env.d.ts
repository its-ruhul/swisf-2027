/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site URL without trailing slash, e.g. https://swisf2027.in */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
