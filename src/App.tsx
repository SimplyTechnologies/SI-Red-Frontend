// filepath: c:\Users\sonas\SI-Red-Frontend\src\App.tsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnalyticsComponent from "./components/custom/analyticsComponent";
import Signin from "./components/custom/signin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/analytics" element={<AnalyticsComponent />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
