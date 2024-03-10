import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "wouter";

function Header() {
  const [location] = useLocation();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/inputPage">
            The Fruit Bros
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={location === "/" ? "nav-link active" : "nav-link"}
                  href="/"
                >
                  Greenhouse ID Input
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location === "/dataFromLast24Hours"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/dataFromLast24Hours"
                >
                  24 Hour Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location === "/realTimeData"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/realTimeData"
                >
                  Realtime Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
