import About from "./common/About";
import Banner from "./common/Banner";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import OurConnect from "./common/OurConnect";
import OurCuration from "./common/OurCuration";
import Ourproduct from "./common/Ourproducts";
import Review from "./common/Review";
import Service from "./common/Service";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Ourproduct />
      <OurCuration />
      <About />
      <Review />
      <OurConnect />
      <Service />
      <Footer />
    </>
  );
}
export default Home;
