export default function Footer(){


    return(
        <footer className="footer">
            <div className="footer-top">
                <div className="f1">
                    <h1>Art Galore</h1>
                    <p>Art for your space.A connection for keeps.</p>
                </div>

                <div className="contact" id="footer">
                    <ul className="contact-list">
                        <li>
                            <span><i className="bi bi-envelope-at-fill"></i> hello@artgalore.studio</span>
                        </li>
                        <li>
                            <span><i className="bi bi-telephone-fill"></i> +254 712 345 678 | +254 798 765 432</span>
                        </li>
                        <li>
                            <span><i className="bi bi-clock-fill"></i> 08.30Hrs - 16.45Hrs</span>
                        </li>

                        <li className="media-icons">
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-twitter"></i>
                            <i className="bi bi-linkedin"></i>
                            <i className="bi bi-youtube"></i>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="f2">
                <p>Copyright &copy;2026 Art Galore Kenya.All Rights Reserved </p>
                <p>General Disclaimer: The information, images and descriptions displayed on this website are provided for general informational and promotional purposes. While we make every effort to ensure that artwork descriptions, images, dimensions, prices and other product details are accurate, slight variations in colour, texture, finish and appearance may occur due to lighting, photography and screen settings. Customers are encouraged to review all artwork details carefully before making a purchase. By placing an order, you acknowledge that you have considered the product information provided and agree to the applicable terms and conditions of sale. We reserve the right to update product information, pricing and availability without prior notice.</p>
            </div>
        </footer>
    )
}