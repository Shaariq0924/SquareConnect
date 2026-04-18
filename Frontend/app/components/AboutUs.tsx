import "../styles/about.css";
import { Shield, Clock, MapPin, Users } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every vehicle is regularly inspected and maintained to the highest safety standards.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    desc: "Punctuality is our promise — we track flights and plan ahead so you never wait.",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    desc: "Operating across Sydney, Melbourne, Brisbane, Gold Coast, Perth, and beyond.",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    desc: "Our experienced, licensed drivers are trained to deliver a premium travel experience.",
  },
];

export default function AboutUs() {
  return (
    <div className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Your Trusted Transport Partner Across Australia
          </h1>
          <p className="about-hero-subtitle">
            At SquareConnect, we put passengers first. Our modern fleet and
            professionally trained drivers make every ride safe, comfortable, and
            stress-free. Whether it&apos;s the airport, cruise terminal, hospital, or
            day tour, we&apos;re here to get you there on time, every time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about-section">
        <div className="about-section-container">
          <div className="about-text">
            <h2 className="about-text-title">About SquareConnect</h2>
            <p className="about-text-para">
              SquareConnect is a Australian transport company committed
              to safe and reliable travel for individuals, families, and corporate
              groups. Through our website and phone booking system, we connect
              travellers with licensed drivers offering airport transfers, day
              tours, hospital transfers, cruise transfers and hotel &amp; tourist transportation across
              major Australian cities.
            </p>
            <p className="about-text-para">
              Founded with the vision of making ground transport seamless and
              affordable, SquareConnect has grown to serve thousands of satisfied
              customers. We understand that every journey matters — from catching
              an early morning flight to exploring the scenic coastline — and we
              take pride in delivering a service that is reliable, comfortable,
              and always on schedule.
            </p>
            <p className="about-text-para">
              Our fleet includes a range of vehicles from luxury sedans to
              spacious SUVs and vans, all equipped with modern amenities. Every
              driver undergoes rigorous background checks and ongoing training to
              ensure the highest level of professionalism and care. With
              transparent pricing, no hidden fees, and 24/7 availability,
              SquareConnect is the smarter way to travel.
            </p>
          </div>
          <div className="about-image" id="about-image">
            <div className="about-image-placeholder">
              <span className="about-image-icon">🚗</span>
              <span className="about-image-label">SquareConnect Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-highlights" id="about-highlights">
        <div className="about-highlights-container">
          <h2 className="about-highlights-title">Why Choose SquareConnect?</h2>
          <div className="about-highlights-grid">
            {highlights.map((item) => (
              <div className="highlight-card" key={item.title} id={`highlight-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="highlight-icon">
                  <item.icon size={28} />
                </div>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
