import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from "../../Redux/cartSlice";
import './Cart.css';

const CartPage = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) return <h2>Your cart is empty!</h2>;

  return (
    <div className="cart-container">
  <div className="cart-items-section">
    <h2 className="cart-title">Shopping Cart</h2>
    {cartItems.map(item => (
      <div key={item.productId} className="cart-item">
        <img src={item.image} alt={item.title} />
        <div className="cart-details">
          <h4>{item.title}</h4>
          <p>₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
        <div className="cart-actions">
          <button onClick={() => dispatch(decreaseQuantity(item.productId))}>-</button>
          <button onClick={() => dispatch(addToCart({
            id: item.productId,
            title: item.title,
            price: item.price,
            image: item.image
          }))}>+</button>
          <button onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
        </div>
      </div>
    ))}
  </div>
  <div className="cart-summary">
    <div className="cart-summary-title">Summary</div>
    <div className="cart-total">Total: ₹{totalAmount}</div>
    <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
  </div>
</div>

  );
};

export default CartPage;
