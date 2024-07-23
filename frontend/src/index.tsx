import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { QLDHApp } from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
      <QLDHApp />
);

reportWebVitals();
