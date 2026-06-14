import { useNavigate } from "react-router-dom";
function Ourproduct() {
  const navigate = useNavigate();
  return (
    <>
      <section className="ourproduct">
        <div className="ourproduct__container">
          <div className="ourproduct__card">
            <img
              src="IEms.jpg"
              alt="img"
              onClick={() => navigate("/products/IEMs")}
            />
            <h2>IEMs</h2>
          </div>
          <div className="ourproduct__card">
            <img
              src="Headphones.jpg"
              alt="img"
              onClick={() => navigate("/products/Headphones")}
            />
            <h2>Headphones</h2>
          </div>
          <div className="ourproduct__card">
            <img
              src="DAc-Amp.jpg"
              alt="img"
              onClick={() => navigate("/products/DACsAndAmps")}
            />
            <h2>DACs & Amps</h2>
          </div>
        </div>
      </section>
    </>
  );
}
export default Ourproduct;
