import React from "react";
import "./landing-page.scss";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="landing-page"
      style={{ backgroundColor: "hsl(210, 14%, 83.1%)" }}
    >
      <header className="landing-page__header" style={{ height: "100vh" }}>
        <div className="landing-page__header-logo">LetsChat</div>
        <nav className="landing-page__header-nav">
          <ul>
            <li>About</li>
            <li>Login</li>
            <li>Signup</li>
          </ul>
        </nav>
        <div className="landing-page__header-content">
          <div className="landing-page__header-text">
            <p>Get started</p>
            <button style={{ backgroundColor: "hsl(187.4, 80.2%, 41.6%)" }}>
              Click here
            </button>
          </div>
          <div className="landing-page__header-image"></div>
        </div>
      </header>
      <section className="landing-page__about">
        <div className="landing-page__about-text">
          <p>About text goes here</p>
        </div>
        <div className="landing-page__about-image"></div>
      </section>
      <footer className="landing-page__footer">
        <p>LetsChat &copy; {currentYear} Tibz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
