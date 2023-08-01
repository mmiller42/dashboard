import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const ROTATE = (window as any).APP_ROTATE as number;

if (ROTATE) {
  const rooter = document.getElementById("rooter")!;
  rooter.style.transform = `rotate(${ROTATE}deg)`;
  rooter.style.transformOrigin = "top left";

  if (ROTATE === 270) {
    rooter.style.marginTop = "480px";
  } else if (ROTATE === 90) {
    rooter.style.marginLeft = "800px";
  } else if (ROTATE === 180) {
    rooter.style.marginTop = "800px";
    rooter.style.marginLeft = "480px";
  }
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
