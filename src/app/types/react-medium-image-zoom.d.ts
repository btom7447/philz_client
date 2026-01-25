declare module "react-medium-image-zoom" {
  import * as React from "react";

  export interface ZoomProps {
    children: React.ReactNode;
    isZoomed?: boolean;
    onZoomChange?: (open: boolean) => void;
  }

  const Zoom: React.FC<ZoomProps>;
  export default Zoom;
}