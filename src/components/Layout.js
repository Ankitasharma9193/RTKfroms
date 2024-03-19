import { Outlet } from "react-router-dom";
import Header from "./Header";
// outlet represent all the children, if the Header or footer has to  be included, 
//header/footer will be consistent(visible) for all of the children pages
const Layout = () => {
  return (
    <>
        <Header />
        <main className="App"> 
            <Outlet /> 
        </main>
    </>
  )
}

export default Layout;
