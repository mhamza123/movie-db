import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-copyrights-big">
        <div className="footer-container">
            <div className="footer-info-logo">
                <div className="footer-heading-logo">
                    <div className="footer-logo">
                        <img src="/static/images/HH.png" alt="Nope" />
                    </div>
                    <h2>About HahaHollywood</h2>
                </div>
                <p>
                HahaHollywood is your go-to destination for all things movies and laughter!
                We bring you the latest movie reviews, hilarious movie memes, and a fun community
                of movie enthusiasts who love to share their thoughts and jokes about Hollywood
                flicks.
                </p>
            </div>
            <div className="footer-left-container">
                <div className="footer-contact">
                    <h2>Contact Us</h2>
                    <p>
                    For any inquiries, suggestions, or partnership opportunities, you can reach us at:
                    </p>
                    <p>Email: contact@hahahollywood.com</p>
                </div>
                <div className="footer-social">
                    <h2>Connect with Us</h2>
                    <p>Follow us on social media for more movie fun and laughter:</p>
                    <div className="social-icons">
                    <a href="https://www.facebook.com/HahaHollywood" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                    <a href="https://www.twitter.com/HahaHollywood" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitterSquare} />
                    </a>
                    <a href="https://www.instagram.com/hahahollywood" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagramSquare} />
                    </a>
                    <a href="https://www.linkedin.com/company/hahahollywood" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} HahaHollywood. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;