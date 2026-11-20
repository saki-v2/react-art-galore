import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function Cart() {
    const { cart, removeFromCart, cartTotal } = useContext(CartContext)

    return (
        <aside className="cart">
            <h3>Your cart</h3>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} />
                                <div>
                                    <p className="cart-title">{item.title}</p>
                                    <p>{item.currency} {item.price.toLocaleString()}</p>
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="cart-total">
                        <span>Total</span>
                        <strong>KES {cartTotal.toLocaleString()}</strong>
                    </div>
                </>
            )}
        </aside>
    )
}