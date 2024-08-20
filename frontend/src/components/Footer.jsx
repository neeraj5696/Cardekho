import React from 'react';
import '../components/Footer.css'
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <div className="row">
          <div className="column">
            <div className="title">About CarDekho</div>
            <div className="footer-links">
              <div>About</div>
              <div>Careers With Us</div>
              <div>Terms &amp; Conditions</div>
              <div>Privacy Policy</div>
              <div>Corporate Policies</div>
              <div>Investors</div>
              <div>FAQs</div>
            </div>
          </div>
          <div className="column">
            <div className="title">Connect With Us</div>
            <div className="footer-links">
              <div>Feedback</div>
              <div>Contact Us</div>
              <div>Advertise with Us</div>
              <div>Become Partner Dealer</div>
            </div>
          </div>
          <div className="column">
            <div className="title">OTHERS</div>
            <div className="footer-links">
              <div>TrucksDekho</div>
              <div>TyreDekho</div>
              <div>TractorsDekho</div>
              <div>Girnar Vision Fund</div>
              <div>Emergency Response</div>
              <div>Car Sales Trends</div>
            </div>
          </div>
          <div className="column">
            <div className="title">EXPERIENCE CARDEKHO APP</div>
            <div className="app-holder">
              <div className="app-column">
                <img src="https://stimg.cardekho.com/pwa/img/appstore.png" alt="Download iOS App" />
              </div>
              <div className="app-column">
                <img src="https://stimg.cardekho.com/pwa/img/playstore.png" alt="Download Android App" />
              </div>
              
            </div>
            <div>
            <div className="column ventures">
            <div className="title">CarDekho Group Ventures</div>
            <div className="footer-links">
              <div className='display'>
              <div>
                <img src="https://stimg.cardekho.com/pwa/img/footer-BdLogo.svg" alt="BikeDekho" />
              </div>
              <div>
                <img src="https://stimg.cardekho.com/pwa/img/footer-rupyyLogo.svg" alt="Rupyy" />
              </div>
              </div>
             <div className='display' >
             <div>
                <img src="https://stimg.cardekho.com/pwa/img/footer-zwLogo.svg" alt="ZigWheels" />
              </div>
              <div>
                <img src="https://stimg.cardekho.com/pwa/img/footer-IdLogo.svg" alt="Car Insurance" />
              </div>
             </div>
              <div>
                <img src="https://stimg.cardekho.com/pwa/img/Revv_Logo.svg" alt="Revv" />
              </div>
            </div>
          </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
