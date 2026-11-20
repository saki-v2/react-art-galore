import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import Cart from "../components/Cart"

export default function Shop(){
    const navigate = useNavigate()
    const { cart, addToCart } = useContext(CartContext)

    const [artists, setArtists] = useState([])
    const [artworks, setArtworks] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3001/artists"),
            fetch("http://localhost:3001/artworks"),
        ])
            .then(([artistsRes, artworksRes]) => {
                if (!artistsRes.ok || !artworksRes.ok) {
                    throw new Error("Could not load the products")
                }
                return Promise.all([artistsRes.json(), artworksRes.json()])
            })
            .then(([artistsData, artworksData]) => {
                setArtists(artistsData)
                setArtworks(artworksData)
            })
            .catch((error) => console.error("Failed to load:", error))
    }, [])

    const filteredArtworks = artworks.filter((artwork) =>
        artwork.title.toLowerCase().includes(search.trim().toLowerCase())
    )

    return(
        <section className="shop" id="shop">

            <button type="button" className="back-btn" onClick={() => navigate("/")}>
                <i className="bi bi-arrow-left-short"></i> Back to Home
            </button>

            <h3>SHOP NOW / ORIGINAL PIECES ONLY</h3>
            <h2>Find the piece that suits you</h2>

            <input
                type="text"
                className="search-bar"
                placeholder="Search artwork here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="shop-layout">
                <div className="product-card">
                    {filteredArtworks.map((artwork) => {
                        const artist = artists.find((a) => a.id === artwork.artistId)
                        const inCart = cart.some((item) => item.id === artwork.id)

                        return (
                            <article key={artwork.id}
                            className="card" 
                            onClick={() => navigate(`/artwork/${artwork.id}`)}                              >
                                <img src={artwork.image} className="card-img-top" alt={artwork.title}/>
                                <div className="card-body">
                                    <h4 className="card-title">{artwork.title}</h4>
                                    <p className="card-artist">{artist?.name}</p>
                                    <p className="card-text">
                                        {artwork.currency} {artwork.price.toLocaleString()}
                                    </p>
                                    <button
                                        type="button"
                                        className="add-to-cart"
                                        disabled={!artwork.available || inCart}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            addToCart(artwork)
                                        }}
                                    >
                                        {!artwork.available ? "Sold out" : inCart ? "In cart" : "Add to cart"}
                                    </button>
                                </div>
                            </article>
                        )
                    })}
                </div>

                <Cart />
            </div>

            {filteredArtworks.length === 0 && artworks.length > 0 && (
                <p className="no-match">No result for "{search}"</p>
            )}
        </section>
    )
}