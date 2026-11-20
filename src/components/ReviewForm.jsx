import { useState, useEffect } from "react"

export default function ReviewForm({ artworkId }) {
    const [reviews, setReviews] = useState([])
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        fetch("http://localhost:3001/reviews")
            .then((response) => response.json())
            .then((data) => {
                if (artworkId) {
                    setReviews(data.filter((review) => String(review.artworkId) === String(artworkId)))
                } else {
                    setReviews(data)
                }
            })
            .catch((error) => console.error("Failed to load reviews:", error))
    }, [artworkId])

    function handleSubmit(e) {
        e.preventDefault()

        const newReview = {
            customerName: name,
            artworkId: artworkId ? Number(artworkId) : null,
            comment: comment,
        }

        fetch("http://localhost:3001/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not save the review")
                }
                return response.json()
            })
            .then((savedReview) => {
                setReviews([...reviews, savedReview])
                setName("")
                setComment("")
                setStatus("Thank you! Your review has been submitted.")
            })
            .catch((error) => {
                console.error(error)
                setStatus("Could not save your review. Is the server running?")
            })
    }

    return (
        <section className="review-form-section" id="reviews">
            <h3>Customer Reviews</h3>

            <form onSubmit={handleSubmit} className="review-form">
                <div className="mb-3">
                    <label htmlFor="reviewName" className="form-label">Name</label>
                    <input
                        type="text"
                        id="reviewName"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="reviewComment" className="form-label">Comment</label>
                    <textarea
                        id="reviewComment"
                        className="form-control"
                        rows="3"
                        placeholder="Share your thoughts about this artwork"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-dark">Submit Review</button>

                {status && <p className="review-status mt-2">{status}</p>}
            </form>

            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p className="review-name"><strong>{review.customerName}</strong></p>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}