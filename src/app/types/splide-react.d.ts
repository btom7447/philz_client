declare module "@splidejs/react-splide" {
  import type { ComponentType, ReactNode } from "react";
  import type { SplideOptions } from "@splidejs/splide";

  export interface SplideProps {
    options?: SplideOptions;
    children?: ReactNode;
    className?: string;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
