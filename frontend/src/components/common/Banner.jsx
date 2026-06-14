function Banner() {
  return (
    <>
      <section className="banner_container">
        <section className="banner_section">
          <div className="banner_poster-box">
            <img src="/iembanner.jpg" alt="banner img" />
            <div className="banner_box-title">
              <h2>
                Hand-Painted, Solid-Resin Builds. Rarely Seen in This Segment.
              </h2>
              <button>SHOP NOW</button>
            </div>
          </div>
          <div className="banner_poster-box">
            <img src="/headphone-banner.jpg" alt="banner img" />
            <div className="banner_box-title">
              <h2>Premium Sound, Now at Just ₹999.</h2>
              <button>SHOP NOW</button>
            </div>
          </div>
          <div className="banner_poster-box">
            <img src="/Dacs-Banner.jpg" alt="banner img" />
            <div className="banner_box-title">
              <h2>Build Your Perfect Audio Setup</h2>
              <button>SHOP NOW</button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
export default Banner;
