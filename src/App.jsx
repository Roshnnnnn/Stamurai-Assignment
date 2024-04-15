import { Link, Outlet } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <button>
        <Link to={"/cities"}>Click</Link>
      </button> */}
    </>
  );
};

export default App;
