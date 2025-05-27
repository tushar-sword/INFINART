import Shop from "../src/components/Product/Testing/ShopM/Product/ShopM.jsx";
import { ProductProvider } from "../src/components/Product/Testing/ShopM/Context/ProductContext.jsx";
import { AuthProvider } from "../src/components/Product/Testing/ShopM/Context/AuthContext.jsx";

function Productpage() {
  return (
    <div>
      <AuthProvider>
        <ProductProvider>
          <Shop />
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default Productpage;
