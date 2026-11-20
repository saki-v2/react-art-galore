import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function NavBar (){

    const {cart} = useContext(CartContext)


    return(
        <header className="Nav-bar">
            <HashLink className="logo" to="/#hero">Art Galore</HashLink>

            <nav>
                <ul>
                    <li>
                        <HashLink to="/#about">Our Story</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#artist">The Artists</HashLink>
                    </li>
                    <li>
                        <HashLink to="/shop">Shop</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#reviews">Reviews</HashLink>
                    </li>
                </ul>
            </nav>

            <button type="button" className="cart-btn">
                <i className="bi bi-cart" aria-hidden="true"></i> Cart / {cart.length}
            </button>
            
        </header>
    )
}