import Navbar from "../src/components/Navbar/Navbar.jsx";
import Shop from "../src/components/Product/Testing/ShopM/Product/ShopM.jsx";

import { Provider } from "react-redux";

// import { store } from "../src/Store/store.js";

function Productpage() {
  return (
    // <Provider store={store}>
    //   <Shop />
    // </Provider>
    <>
    <Navbar/>
    <Shop />
    </>
  );
}

export default Productpage;