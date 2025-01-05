import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <main>
        <Outlet /> 
      </main>
    </>
  );
}

export default App;
