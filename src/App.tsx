import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header  from "./components/header/header"
import Footer  from "./components/footer/footer"


function App() {

  const withHeader = location.pathname !== "/login" && location.pathname !== "/cadastro";


  return (
    <div>
      <Toaster/>
      {withHeader && <Header />}
      <div className={withHeader ? "pt-20" : ""}>
        <Outlet />
      </div>
      {withHeader && <Footer/>}
    </div>
  );

}

export default App;
