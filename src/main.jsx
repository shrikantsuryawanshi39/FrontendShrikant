import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext.jsx"
import { ClusterProvider } from "./context/ClusterContext.jsx";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ClusterProvider>
          <App />
        </ClusterProvider>

      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
