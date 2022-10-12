import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<Rendered />);

function Rendered() {
  useEffect(() => {
    console.log("rendered");
  });

  return <App />;
}
