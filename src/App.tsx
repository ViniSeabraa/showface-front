import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header  from "./components/header/header"
import Footer  from "./components/footer/footer"
import "./App.css"


function App() {

  const withHeader = location.pathname !== "/logins" && location.pathname !== "/cadastro";


  return (
    <div>
      <Toaster/>
      {withHeader && <Header />}
      <div className={withHeader ? "padding-top" : ""}>
        <Outlet />
      </div>
      {withHeader && <Footer/>}
    </div>
  );

}

export default App;
