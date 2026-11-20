import { useState, useEffect } from "react"

const API_URL = "http://localhost:3001/reviews"

export default function ReviewForm({ artworkId }) {
    const [reviews, setReviews] = useState([])
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState("")

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) =>
                setReviews(
                    data.filter(
                        (r) => !artworkId || String(r.artworkId) === String(artworkId)
                    )
                )
            )
            .catch((error) => console.error("Failed to load reviews:", error))
    }, [artworkId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim() || !comment.trim()) {
            setStatus("Please enter both your name and a comment.")
            return
        }

        setSubmitting(true)
        setStatus("")

        const newReview = {
            customerName: name.trim(),
            artworkId: artworkId ? Number(artworkId) : null,
            comment: comment.trim(),
            reviewDate: new Date().toISOString().split("T")[0],
        }

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            })

            if (!res.ok) throw new Error(`Server responded with ${res.status}`)

            const saved = await res.json()


            setReviews((prev) => [...prev, saved])
            setName("")
            setComment("")
            setStatus("Thank you! Your review has been submitted.")
        } catch (error) {
            console.error("Failed to save review:", error)
            setStatus("Could not save your review. Is the server running?")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="review-form-section">
            <h3>Customer Reviews</h3>

            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p className="review-name">
                                <strong>{review.customerName}</strong>
                            </p>
                            <p className="review-comment">{review.comment}</p>
                            {review.reviewDate && (
                                <small className="review-date">{review.reviewDate}</small>
                            )}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="review-form">
                <div className="mb-3">
                    <label htmlFor="reviewName" className="form-label">
                        Name
                    </label>
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
                    <label htmlFor="reviewComment" className="form-label">
                        Comment
                    </label>
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

                <button type="submit" className="btn btn-dark" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>

                {status && <p className="review-status mt-2">{status}</p>}
            </form>
        </section>
    )
}
