import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import ReviewForm from "../components/ReviewForm"

export default function ArtworkDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cart, addToCart } = useContext(CartContext)

    const [artwork, setArtwork] = useState(null)
    const [artist, setArtist] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3001/artworks/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Artwork not found")
                }
                return response.json()
            })
            .then((artworkData) => {
                setArtwork(artworkData)
                return fetch(`http://localhost:3001/artists/${artworkData.artistId}`)
            })
            .then((response) => response.json())
            .then((artistData) => setArtist(artistData))
            .catch((error) => setError(error.message))
    }, [id])

    if (error) return <p className="detail-message">{error}</p>
    if (!artwork) return <p className="detail-message">Loading...</p>

    const inCart = cart.some((item) => item.id === artwork.id)

    return (
        <section className="artwork-details">
            <button type="button" className="back-btn" onClick={() => navigate("/shop")}>
                <i className="bi bi-arrow-left-short"></i> Back to Shop
            </button>

            <div className="details-layout">
                <img src={artwork.image} alt={artwork.title} className="details-img" />

                <div className="details-info">
                    <p className="details-category">{artwork.category}</p>
                    <h2>{artwork.title}</h2>
                    <p className="details-artist">By {artist?.name}</p>
                    <p className="details-price">
                        {artwork.currency} {artwork.price.toLocaleString()}
                    </p>
                    <p className="details-description">{artwork.description}</p>
                    <p className="details-size">Size: {artwork.dimensions}</p>

                    <button
                        type="button"
                        className="add-to-cart"
                        disabled={!artwork.available || inCart}
                        onClick={() => addToCart(artwork)}
                    >
                        {!artwork.available ? "Sold out" : inCart ? "In cart" : "Add to cart"}
                    </button>
                </div>
            </div>

            <ReviewForm artworkId={id} />
        </section>
    )
}