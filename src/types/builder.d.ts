export type ComponentType = "text" | "image";

export type PreviewMode = "desktop" | "mobile";

export interface LayoutComponent {
  id: string;
  type: ComponentType;
  isFullWidth: boolean;
  data: any;
}

export interface TextComponentData {
  content: string;
}

export interface ImageComponentData {
  src: string;
  alt: string;
  inputType: "url" | "upload";
}
