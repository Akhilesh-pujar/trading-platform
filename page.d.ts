import { NextPage } from "@/page";
import { ComponentType, ReactElement, ReactNode } from "react";

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
};
