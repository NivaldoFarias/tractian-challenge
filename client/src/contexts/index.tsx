import type { PropsWithChildren } from "react";
import DataProvider from "./Data.context";

export default function BundleProviders({ children }: PropsWithChildren) {
  return <DataProvider>{children}</DataProvider>;
}
