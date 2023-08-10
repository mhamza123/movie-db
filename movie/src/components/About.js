// About.js
import React from "react";
import "../styles/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to HahaHollywood Movie Reviewer website! We are a passionate team of movie enthusiasts who love to watch and review the latest movies from Hollywood and beyond.
        </p>
        <p>
          Our mission is to provide honest and insightful reviews that help moviegoers make informed decisions about what to watch. Whether you're into action, drama, comedy, or any other genre, you'll find something to suit your taste on our website.
        </p>
        <p>
          Our team of expert reviewers carefully watches each movie and analyzes its plot, performances, direction, and overall entertainment value. We believe in the power of cinema to inspire, entertain, and provoke thought, and we strive to reflect that in our reviews.
        </p>
        <p>
          Connect with us on social media to stay updated with the latest movie releases, news, and special events. Follow us on Twitter, Facebook, and Instagram to join our community of movie lovers and share your thoughts on the latest blockbusters.
        </p>
        <div className="social-icons">
            <a href="https://www.facebook.com/HahaHollywood" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} />
            </a> <span>Facebook</span>
            <a href="https://www.twitter.com/HahaHollywood" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitterSquare} />
            </a><span>Twitter</span>
            <a href="https://www.instagram.com/hahahollywood" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagramSquare} />
            </a><span>Instagram</span>
            <a href="https://www.linkedin.com/company/hahahollywood" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
            </a><span>Linkedn</span>
        </div>
      </div>
    </div>
  );
};

export default About;