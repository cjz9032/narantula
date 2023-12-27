/// <reference types="vite/client" />
declare module "*.csv" {
  const content: object[];
  export default content;
}
