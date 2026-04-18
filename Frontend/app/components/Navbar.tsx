"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone, Search } from "lucide-react";
import "../styles/navbar.css";

const navLinks = [
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Airport Transfer", href: "/services/Airport-Transfer" },
      { name: "Day Tours", href: "/services/Day-Tours" },
      { name: "Hotel & Tourist", href: "/services/Hotel-&-Tourist" },
      { name: "Hospital Transfer", href: "/services/Hospital-Transfer" },
      { name: "Cruise Transfer", href: "/services/Cruise-Transfer" },
    ],
  },
  { name: "Fleet", href: "/fleet" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} id="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo" id="navbar-logo">
            <span className="logo-icon">SC</span>
            <span className="logo-text">
              Square<span className="logo-highlight">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav Links — Centered */}
          <ul className="navbar-links" id="navbar-links">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li
                  key={link.name}
                  className="nav-item has-dropdown"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="nav-link dropdown-toggle" id={`nav-${link.name.toLowerCase().replace(/\s/g, "-")}`}>
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`chevron-icon ${servicesOpen ? "chevron-rotated" : ""}`}
                    />
                  </button>
                  <ul className={`dropdown-menu ${servicesOpen ? "dropdown-open" : ""}`}>
                    {link.dropdown.map((subLink) => (
                      <li key={subLink.name}>
                        <Link href={subLink.href} className="dropdown-link" id={`nav-${subLink.name.toLowerCase().replace(/\s/g, "-")}`}>
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.name} className="nav-item">
                  <Link href={link.href} className="nav-link" id={`nav-${link.name.toLowerCase().replace(/\s/g, "-")}`}>
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right Section — Search + CTA */}
          <div className="navbar-cta" id="navbar-cta">
            <button className="nav-icon-btn" id="nav-search-btn" aria-label="Search">
              <Search size={20} />
            </button>
            <a href="tel:+61423699909" className="nav-icon-btn cta-phone-icon" id="cta-phone">
              <Phone size={20} />
            </a>
            <Link href="/book" className="cta-primary" id="cta-book-now">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu MUST REMAIN COMPLETELY OUTSIDE .navbar SO IT IS NOT CLIPPED BY BACKDROP-FILTER/TRANSFORM BUGS ON IOS */}
      <div className={`mobile-menu ${mobileMenuOpen ? "mobile-menu-open" : ""}`} id="mobile-menu">
        <ul className="mobile-nav-links">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.name} className="mobile-nav-item">
                <button
                  className="mobile-nav-link mobile-dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    setServicesOpen(!servicesOpen);
                  }}
                >
                  {link.name}
                  <ChevronDown
                    size={16}
                    className={`chevron-icon ${servicesOpen ? "chevron-rotated" : ""}`}
                  />
                </button>
                {servicesOpen && (
                  <ul className="mobile-dropdown mobile-dropdown-open" style={{ maxHeight: "none", opacity: 1, visibility: "visible" }}>
                    {link.dropdown.map((subLink) => (
                      <li key={subLink.name}>
                        <Link
                          href={subLink.href}
                          className="mobile-dropdown-link"
                          onClick={() => {
                            setServicesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.name} className="mobile-nav-item">
                <Link
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
        </ul>
        <div className="mobile-cta">
          <Link href="/book" className="cta-primary mobile-cta-btn" onClick={() => setMobileMenuOpen(false)}>
            Book Now
          </Link>
          <a href="tel:+61423699909" className="cta-phone mobile-cta-btn">
            <Phone size={16} />
            +61 423 699 909
          </a>
        </div>
      </div>
    </header>
  );
}
