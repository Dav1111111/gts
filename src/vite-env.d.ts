/// <reference types="vite/client" />

declare module "figma:asset/*" {
  const src: string;
  export default src;
}

declare module "@/styles/globals.css" {}
declare module "*.css" {}
