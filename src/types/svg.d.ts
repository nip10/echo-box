declare module "*.svg" {
  import { ComponentType, JSX } from "preact";
  const SVGComponent: ComponentType<JSX.SVGAttributes<SVGElement>>;
  export default SVGComponent;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}
