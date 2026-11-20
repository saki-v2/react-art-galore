import { useEffect, useState } from "react";

export default function ArtistCard() {

    const [artists, setArtists] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/artists")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load the artists")
                }
                return response.json()
            })
            .then((data) => setArtists(data))
            .catch((error) => console.error("Failed to load:", error))
    }, [])

    return (
        <section className="artist" id="artist">
            <h3>THE TEAM BEHIND THE MAGIC</h3>
            <h2>MEET YOUR NEXT FAVOURITE ARTIST</h2>
            <div className="artist-card" id="artist-card">
                {artists.map((artist) => (
                    <div key={artist.id} className="card card-row" style={{ maxWidth: "540px" }}>
                        <img src={artist.profileImage} className="card-img-start" alt={artist.name} />

                        <div className="card-body">
                            <h4 className="card-title">{artist.name}</h4>
                            <p className="card-text">{artist.bio}</p>
                            <p className="card-text">{artist.location}</p>
                            <p className="card-text">{artist.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}