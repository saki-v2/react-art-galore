import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <section className="ErrorPage">
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </section>
  )
}