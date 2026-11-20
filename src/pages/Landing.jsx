import About from '../components/About.jsx'
import ArtistCard from '../components/ArtistCard.jsx'
import Hero from '../components/Hero.jsx'
import ReviewForm from '../components/ReviewForm.jsx'

export default function Landing(){


    return(
        <section className="Landing">
            <Hero />
            <About />
            <ArtistCard />
            <ReviewForm />
            
        </section>
    )
}