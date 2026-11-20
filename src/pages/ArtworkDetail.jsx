import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ArtworkDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [artworks, setArtworks] = useState([])
    const [artists, setArtists] = useState([])

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3001/artworks"),
            fetch("http://localhost:3001/artists"),
        ])
            .then(([artworksRes, artistsRes]) =>
                Promise.all([artworksRes.json(), artistsRes.json()])
            )
            .then(([artworksData, artistsData]) => {
                setArtworks(artworksData)
                setArtists(artistsData)
            })
            .catch((error) => console.error("Failed to load:", error))
    }, [])

    const artwork = artworks.find((a) => String(a.id) === id)
    const artist = artists.find((a) => a.id === artwork?.artistId)

    if (artworks.length === 0) return <p>Loading...</p>
    if (!artwork) return <p>Artwork not found</p>

    return (
        <section className="artwork-details">
            <button type="button" className="back-btn" onClick={() => navigate("/shop")}>
                <i className="bi bi-arrow-left-short"></i> Back to Shop
            </button>

            <div className="details-layout">
                <img src={artwork.image} alt={artwork.title} className="details-img" />

                <div className="details-info">
                    <h2>{artwork.title}</h2>
                    <p className="card-artist">By {artist?.name}</p>
                    <p className="card-text">
                        {artwork.currency} {artwork.price?.toLocaleString()}
                    </p>
                    <p className="card-description">{artwork.description}</p>
                </div>
            </div>
        </section>
    )
}