import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-sec1">
        <div>
          <h5>Abstract</h5>
          <p>Branches</p>
        </div>

        <div>
          <h5>Resources</h5>
          <p>Blog</p>
          <p>Help Center</p>
          <p>Release Notes</p>
          <p>Status</p>
        </div>

        <div>
          <h5>Community</h5>
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Facebook</p>
          <p>Dribble</p>
          <p>Podcast</p>
        </div>

        <div>
          <h5>Company</h5>
          <p>About Us</p>
          <p>Careers</p>
          <p>Legal</p>

          <div className="footer-sec2">
            <div>
              <h6>Contact Us</h6>
              <p>info@abstract.com</p>
            </div>

            <div>
              <p>&copy; Copyright 2022</p>
              <p>Abstract Studio Design, Inc.</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer
