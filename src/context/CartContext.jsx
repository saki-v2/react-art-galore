import { createContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (artwork) => {
        if (cart.some((item) => item.id === artwork.id)) return
        setCart([...cart, artwork])
    }

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id))
    }

    const cartTotal = cart.reduce((total, item) => total + item.price, 0)

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    )
}