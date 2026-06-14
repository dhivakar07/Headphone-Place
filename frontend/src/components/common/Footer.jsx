import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <section className="footer">
        <div className="footer__one">
          <div className="footer__one__s1">
            <span>ABOUT</span>
            <p>About Us</p>
            <p>Meet the Team</p>
            <p>Careers</p>
            <p>Artists</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="footer__one__s2">
            <span>SHOP</span>
            <p onClick={() => navigate("/products/IEMs")}>In-Ears</p>
            <p onClick={() => navigate("/products/Headphones")}>Headphones</p>
            <p onClick={() => navigate("/products/DACsAndAmps")}>DACs & Amps</p>
          </div>
          <div className="footer__one__s3">
            <span>HELP</span>
            <p>Help Center</p>
            <p>Track Your Order</p>
            <p>Shipping & Delivery</p>
            <p>Returns & Exchanges</p>
            <p>Warranty & Service</p>
          </div>
          <div className="footer__one__s4">
            <span>COMMUNITY</span>
            <p>Headphone Connect</p>
            <p>Visit the Experience Studio</p>
            <p>Beginner's Guides</p>
            <p>The Audiophile Manifesto</p>
          </div>
        </div>
        <div className="footer__two">
          <div className="footer__two__s1__head">
            <small>© 2026 Headphone Place</small>
            <small>Owned, Operated & Funded by Proud Indians.</small>
            <small>
              Everything on this website has been made with a lot of love and
              hard work. If you copy anything we will hunt you down. We mean it.
            </small>
          </div>
          <div className="footer__two__s2__icons">
            <img
              src="/whatsapp.png"
              alt="icon"
              onClick={() => window.open("https://web.whatsapp.com/")}
            />
            <img
              src="/instagram.png"
              alt="icon"
              onClick={() => window.open("https://www.instagram.com/")}
            />
            <img
              src="/facebook.png"
              alt="icon"
              onClick={() => window.open("https://www.facebook.com/")}
            />
            <img
              src="/twitter.png"
              alt="icon"
              onClick={() => window.open("https://x.com/")}
            />
            <img
              src="/youtube.png"
              alt="icon"
              onClick={() => window.open("https://www.youtube.com/")}
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Footer;
