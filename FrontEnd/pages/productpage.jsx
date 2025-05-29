import React from "react";
import styled from "styled-components";

// import SortDropdown from "../src/components/Product/Testing/SortDropdown/SortDropdown.jsx";

import Shop from "../src/components/Product/Testing/ShopM/Product/ShopM.jsx";
// import { ProductProvider } from "../src/components/Product/Testing/ShopM/Context/ProductContext.jsx";
// import { AuthProvider } from "../src/components/Product/Testing/ShopM/Context/AuthContext.jsx";

function Productpage() {
  return (
    <div>
      {/* <AuthProvider>
        <ProductProvider> */}
          <Shop />
          {/* <SortDropdown /> */}
        {/* </ProductProvider>
      </AuthProvider> */}
    </div>
  );
}

export default Productpage;