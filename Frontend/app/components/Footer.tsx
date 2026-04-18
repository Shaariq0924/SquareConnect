import Link from "next/link";
import { Phone, Mail, Clock, ExternalLink } from "lucide-react";
import "../styles/footer.css";

const servicesLinks = [
  { name: "Airport Transfers", href: "/services/Airport-Transfer" },
  { name: "Day Tours", href: "/services/Day-Tours" },
  { name: "Hotel & Tourist", href: "/services/Hotel-&-Tourist" },
  { name: "Hospital Transfers", href: "/services/Hosiptal-Transfer" },
];

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const serviceAreas = [
  "Sydney",
  "Melbourne",
  "Gold Coast",
  "Brisbane",
  "Perth",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      {/* Reach Us Now Bar */}
      <div className="footer-reach" id="footer-reach">
        <div className="footer-reach-container">
          <h3 className="footer-reach-title">
            Reach Us Now <span className="reach-emoji">👋</span>
          </h3>

          <div className="footer-reach-items">
            <div className="reach-item" id="reach-phone">
              <div className="reach-icon">
                <Phone size={20} />
              </div>
              <div className="reach-details">
                <span className="reach-label">Call Us</span>
                <a href="tel:+619666660834">+61 423699909</a>
              </div>
            </div>

            <div className="reach-item" id="reach-email">
              <div className="reach-icon">
                <Mail size={20} />
              </div>
              <div className="reach-details">
                <span className="reach-label">Email Us</span>
                <a href="mailto:info@squareconnect.com.au">info@squareconnect.com.au</a>
              </div>
            </div>

            <div className="reach-item" id="reach-availability">
              <div className="reach-icon">
                <Clock size={20} />
              </div>
              <div className="reach-details">
                <span className="reach-label">We are available</span>
                <span className="reach-value">24/7 Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="footer-columns" id="footer-columns">
        <div className="footer-columns-container">
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-col-links">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-col-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Service Areas</h4>
            <ul className="footer-col-links">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Embed */}
          <div className="footer-col footer-map-col" id="footer-map">
            <div className="footer-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.10282847364!2d150.65178895!3d-33.847927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sin!4v1711600000000!5m2!1sen!2sin"
                className="footer-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SquareConnect Location"
              ></iframe>
              <a
                href="https://www.google.com/maps/place/Sydney+NSW,+Australia"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-link"
                id="open-in-maps"
              >
                Open in Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom" id="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} SquareConnect . All rights reserved
          </p>
          <div className="footer-policies">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="policy-divider">|</span>
            <Link href="/terms">Terms Of Service</Link>
            <span className="policy-divider">|</span>
            <Link href="/refund-policy">Refund Policy</Link>
            <span className="policy-divider">|</span>
            <Link href="/cancellation-policy">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
