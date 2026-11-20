import { useNavigate } from "react-router-dom"
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"
import hero4 from "../assets/hero4.jpg"
import hero5 from "../assets/hero5.jpg"

export default function Hero() {

  const Navigate = useNavigate()

  return (
    <section className="hero" id="hero">



      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img
                src={hero1}
                className="d-block w-100"
                alt="Painting"
                />
            </div>

            <div className="carousel-item">
                <img
                src={hero2}
                className="d-block w-100"
                alt="Painting"
                />
            </div>

            <div className="carousel-item">
                <img
                src={hero3}
                className="d-block w-100"
                alt="Painting"
                />
            </div>

            <div className="carousel-item">
                <img
                src={hero4}
                className="d-block w-100"
                alt="Painting"
                />
            </div>

            <div className="carousel-item">
                <img
                src={hero5}
                className="d-block w-100"
                alt="Painting"
                />
            </div>
        </div>

        <div className="hero-text">
            <h1>Welcome to Art Galore</h1>
            <p>Discover, collect and enjoy pieces made right here in Nairobi</p>
            <button type="button" 
            className="shop-now" 
            onClick={() => Navigate("/shop")}>Shop now</button>
        </div>


        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  )
}