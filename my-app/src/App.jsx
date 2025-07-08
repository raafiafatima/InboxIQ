import AppRouter from "./config/router";
import { BrowserRouter, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
