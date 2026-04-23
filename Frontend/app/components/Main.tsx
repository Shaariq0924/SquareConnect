"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, ChevronLeft, Users, Briefcase, Check } from "lucide-react";
import "../styles/landing.css";

const servicesFeatures = [
  "Professional & experienced local drivers",
  "Quick online booking available 24/7",
  "Tidy, well-maintained premium vehicles",
  "Upfront fixed fares with GST and tolls included",
];

const whyChooseFeatures = [
  "Airport, cruise & hospital transfers covered",
  "Sedans, SUVs, and spacious maxi cabs up to 11 seats",
  "Drivers experienced in all major Australian routes",
  "Upfront fixed fares with tolls included",
  "Late night or early morning trips available",
  "We care about making every journey comfortable",
];

const serviceTypes = [
  "Airport Transfer",
  "Cruise Transfer",
  "Hospital Transfer",
  "Day Tours",
  "Hotel & Tourist Transfer",
];

const babySeats = [
  {
    id: "booster",
    title: "Booster Seat",
    desc: "children aged 4-7 who need a bit more height and safety",
    emoji: "💺",
    type: "Booster Seat",
  },
  {
    id: "rear",
    title: "Rear Facing",
    desc: "Ideal for newborns and infants under 12 months",
    emoji: "👶",
    type: "Rear Facing",
  },
  {
    id: "forward",
    title: "Forward Facing",
    desc: "Perfect baby seat for toddlers aged 1-4 years old",
    emoji: "🧒",
    type: "Forward Facing",
  },
];

const familyServiceCards = [
  {
    id: "airport-fp",
    title: "Airport Transfers Baby Seat",
    desc: "Easy trips to and from Airport, with help for your luggage and baby seats ready when you need them.",
    icon: "✈️",
    buttonText: "Book Airport Transfers Baby Seat",
  },
  {
    id: "cruise-fp",
    title: "Cruise Terminal Transfers",
    desc: "Safe and comfortable transfers to and from cruise terminals with premium child seats included.",
    icon: "🚢",
    buttonText: "Book Cruise Terminal Taxi",
  },
  {
    id: "hotel-fp",
    title: "Hotel & Holiday Transfers",
    desc: "A premium ride with an infant seat ready for your airport or hotel trip across the city.",
    icon: "🏨",
    buttonText: "Book Baby Seat Taxi Sydney",
  },
];

const fleetVehicles = [
  {
    id: "premium",
    title: "Premium Sedan",
    passengers: "4 Passengers",
    bags: "4 Bags",
    image: "/assets/Sedan.jpg",
    emoji: "🚗",
    features: [
      "Ideal for small families or solo travelers",
      "Professional airport & city transfers",
      "Smooth, quiet ride with climate control",
      "Baby seat & booster options available"
    ]
  },
  {
    id: "suv",
    title: "Premium SUV",
    passengers: "4 Passengers",
    bags: "1-5 Bags",
    image: "/assets/PremiumSUV.jpg",
    emoji: "🚙",
    features: [
      "Extra legroom & premium cabin comfort",
      "Perfect for corporate or luxury family travel",
      "Flexible cargo capacity for multiple bags",
      "High-safety child restraints provided"
    ]
  },
  {
    id: "seater-7",
    title: "7 Seater Maxi",
    passengers: "7 Passengers",
    bags: "8 Bags",
    image: "/assets/SevenSeater.webp",
    emoji: "🚐",
    features: [
      "Fits larger families or groups with kids",
      "Air conditioning & luggage space included",
      "Baby seats available on request",
      "Reliable option for school & daycare runs"
    ]
  },
  {
    id: "seater-11",
    title: "11 Seater Maxi",
    passengers: "11 Passengers",
    bags: "16 Bags",
    image: "/assets/ElevenSeater.jpg",
    emoji: "🚍",
    features: [
      "Best for large group transfers or events",
      "Massive luggage space for up to 16 bags",
      "Spacious seating for 11 adult passengers",
      "Great for airport or day-tour groups"
    ]
  },
];

const differenceFeatures = [
  "We provide age appropriate seats for your child's trip.",
  "Reliable family focused transport across Australia.",
  "Our local drivers are experienced in family transport.",
  "Comfortable vehicles for airport, cruise, and family trips.",
];

export default function Main() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("animate-on-scroll")) {
              entry.target.classList.add("in-view");
            }
            if (entry.target.classList.contains("wc-animate")) {
              entry.target.classList.add("wc-visible");
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = containerRef.current?.querySelectorAll(".animate-on-scroll, .wc-animate");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero-section">
        <div className="hero-container">
          {/* Left: Text Content */}
          <div className="hero-content">
            <div className="hero-badge" id="hero-badge">
              <span className="hero-badge-dot"></span>
              Premium Transport Solutions
            </div>

            <h1 className="hero-title" id="hero-title">
              Your Trusted{" "}
              <span className="hero-title-highlight">Transport Partner</span>{" "}
              in Australia
            </h1>

            <p className="hero-description" id="hero-description">
              SquareConnect delivers premium transport solutions — Airport
              Transfers, Day Tours, Cruise Transfers, and Hospital Transport.
              Every trip comes with professional drivers, tidy vehicles, and
              upfront fixed fares.
            </p>

            <div className="hero-cta" id="hero-cta">
              <Link href="/book" className="hero-cta-primary" id="hero-book-now">
                Book Your Ride
              </Link>
              <a href="tel:+61423699909" className="hero-cta-secondary" id="hero-call">
                <Phone size={18} />
                +61 423 699 909
              </a>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="hero-visual" id="hero-visual">
            <div className="hero-card" id="hero-card">
              <Image 
                src="/assets/Main_Image.png" 
                alt="Main Transport Image" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES INTRO SECTION */}
      <section className="services-intro" id="services-intro">
        <div className="services-intro-container">
          <div className="services-intro-heading animate-on-scroll">
            <h2>
              Need a <span className="heading-highlight">Reliable Transport</span> in Australia?
            </h2>
            <p>
              From airport pickups to scenic day tours, we make every journey safe, comfortable, and stress-free.
            </p>
          </div>

          <div className="services-intro-body">
            <div className="services-intro-image animate-on-scroll animate-left delay-2">
              <div className="services-intro-card">
                <div className="services-intro-card-badge">
                  <span className="services-intro-card-badge-dot"></span>
                  Trusted Service
                </div>
                <span className="services-intro-card-emoji">👨‍👩‍👧‍👦</span>
              </div>
            </div>

            <div className="services-intro-text">
              <h3 className="animate-on-scroll animate-right delay-2">
                Travelling across Australia shouldn&apos;t be stressful
              </h3>
              <p className="services-intro-text-paragraph animate-on-scroll animate-right delay-3">
                Whether you&apos;re heading to the airport, catching a cruise, or visiting a loved one at the hospital — SquareConnect takes the hassle out of transport. We&apos;re one of the most trusted transport services across Sydney, Melbourne, and Gold Coast.
              </p>
              <p className="services-intro-text-paragraph animate-on-scroll animate-right delay-4">
                That&apos;s where SquareConnect makes life easier. We provide professional drivers, premium vehicles, and a seamless booking experience.
              </p>

              <ul className="services-intro-features">
                {servicesFeatures.map((feature, index) => (
                  <li key={feature} className={`services-intro-feature animate-on-scroll animate-right delay-${index + 5}`}>
                    <span className="feature-icon">
                      <ChevronRight size={16} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="services-intro-cta animate-on-scroll animate-right delay-8">
                <Link href="/book" className="services-intro-cta-primary">
                  Book Your Ride Now
                </Link>
                <a href="tel:+61423699909" className="services-intro-cta-secondary">
                  <Phone size={18} />
                  +61 423 699 909
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE + BOOKING FORM SECTION */}
      <section className="why-choose" id="why-choose">
        <div className="why-choose-container">
          <div className="booking-form-wrapper wc-animate wc-left wc-delay-1">
            <div className="booking-form-card" id="booking-form-card">
              <h3 className="booking-form-title">
                Book Your Ride <span className="form-title-highlight">in Seconds</span>
              </h3>
              <p className="booking-form-subtitle">Fill in the details and we&apos;ll handle the rest.</p>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="form-label">Service Type <span className="required">*</span></label>
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>Select Service Type</option>
                    {serviceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pick up Address <span className="required">*</span></label>
                  <input className="form-input" type="text" placeholder="Pickup Address Eg. 202 Elizabeth Street" />
                </div>

                <div className="form-group">
                  <label className="form-label">Drop off Address <span className="required">*</span></label>
                  <input className="form-input" type="text" placeholder="Destination Address Eg. 100 John Street" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pickup Date <span className="required">*</span></label>
                    <input className="form-input" type="date" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pickup Time <span className="required">*</span></label>
                    <input className="form-input" type="time" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Passengers <span className="required">*</span></label>
                    <select className="form-select" defaultValue="">
                      <option value="" disabled>Select Passengers</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">No of Bags <span className="required">*</span></label>
                    <select className="form-select" defaultValue="">
                      <option value="" disabled>Select No of Bags</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Bag" : "Bags"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="form-submit" type="submit">
                  Next
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="why-choose-content">
            <h2 className="wc-animate wc-right wc-delay-2">
              Why Travellers Choose <span className="heading-highlight">SquareConnect</span>
            </h2>
            <p className="why-choose-intro wc-animate wc-right wc-delay-3">
              We know reliability matters most when it comes to transport.
            </p>

            <ul className="why-choose-features">
              {whyChooseFeatures.map((feature, index) => (
                <li key={feature} className={`why-choose-feature wc-animate wc-right wc-delay-${index + 4}`}>
                  <span className="why-choose-feature-icon">
                    <ChevronRight size={15} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="why-choose-image-card wc-animate wc-right wc-delay-10">
              <img 
                src="/assets/ElevenSeater.jpg" 
                alt="SquareConnect Eleven Seater" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <p className="why-choose-bottom-text wc-animate wc-right wc-delay-11">
              When you book with SquareConnect, you can travel with peace of mind.
            </p>

            <div className="why-choose-cta wc-animate wc-right wc-delay-12">
              <Link href="/book" className="why-choose-cta-primary">
                Book Online
              </Link>
              <a href="tel:+61423699909" className="why-choose-cta-secondary">
                <Phone size={18} />
                +61 423 699 909
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BABY SEAT OPTIONS SECTION */}
      <section className="baby-seats" id="baby-seats">
        <div className="baby-seats-container">
          <div className="baby-seats-heading animate-on-scroll">
            <h2>
              Baby Seat Options <span className="heading-highlight">We Provide</span>
            </h2>
          </div>

          <div className="baby-seats-body">
            <div className="baby-seats-content animate-on-scroll animate-left">
              <p className="baby-seats-intro">
                Every child is different, which is why we offer a range of seat types for different ages. During booking, tell us your child&apos;s age and we&apos;ll provide an age appropriate seat for your trip.
              </p>

              <ul className="baby-seats-list">
                {babySeats.map((seat, index) => (
                  <li key={seat.id} className={`baby-seat-item animate-on-scroll animate-left delay-${index + 2}`}>
                    <div className="baby-seat-item-icon">
                      <ChevronRight size={16} />
                    </div>
                    <div className="baby-seat-item-text">
                      <h4>{seat.title}</h4>
                      <p>{seat.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="baby-seats-footer animate-on-scroll animate-left delay-5">
                Our seats meet Australian standards and are kept in clean, ready to use condition. You can also bring your own seat if you prefer, and our drivers will assist with fitting it for your trip.
              </p>
            </div>

            <div className="baby-seats-visual animate-on-scroll animate-right">
              <div className="baby-seats-grid">
                <div className="baby-seat-stack">
                  <div className="baby-seat-card rear-facing-card">
                    <div className="baby-seat-card-emoji">👶</div>
                    <span className="baby-seat-card-label">Rear Facing</span>
                  </div>
                  <div className="baby-seat-card forward-facing-card">
                    <div className="baby-seat-card-emoji">🧒</div>
                    <span className="baby-seat-card-label">Forward Facing</span>
                  </div>
                </div>
                <div className="baby-seat-card booster-card">
                  <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: '160px', marginBottom: '16px' }}>
                    <Image 
                      src="/assets/BoosterSeat.png" 
                      alt="Booster Seat" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'contain' }} 
                    />
                  </div>
                  <span className="baby-seat-card-label">Booster Seat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAMILY FRIENDLY SERVICES SECTION */}
      <section className="family-services" id="family-services">
        <div className="family-services-container animate-on-scroll">
          <div className="family-services-heading">
            <h2>
              Our <span className="heading-highlight">Family Friendly</span> Services
            </h2>
          </div>
          <p className="family-services-intro">
            SquareConnect provides a range of family transport options across Australia, ensuring safety and comfort for passengers of all ages.
          </p>

          <div className="family-services-grid">
            {familyServiceCards.map((card, index) => (
              <div key={card.id} className={`family-service-card animate-on-scroll delay-${(index * 2) + 2}`}>
                <div className="family-service-card-icon">
                  <span>{card.icon}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link href="/book" className="family-service-card-btn">
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR FLEET SECTION */}
      <section className="fleet" id="fleet">
        <div className="fleet-container animate-on-scroll">
          <div className="fleet-heading">
            <h2>Our <span className="heading-highlight">Fleet</span></h2>
          </div>

          <div className="fleet-grid">
            {fleetVehicles.map((vehicle) => (
              <div key={vehicle.id} className="fleet-card active">
                <span className="fleet-card-title">{vehicle.title}</span>
                <div className="fleet-card-image">
                  {vehicle.image ? (
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  ) : (
                    <span className="fleet-emoji">{vehicle.emoji}</span>
                  )}
                  {vehicle.features && (
                    <div className="fleet-card-overlay">
                      <ul className="fleet-features-list">
                        {vehicle.features.map((feature, i) => (
                          <li key={i} className="fleet-feature-item">
                            <Check size={14} className="feature-check-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="fleet-card-specs">
                  <div className="fleet-spec">
                    <Users size={16} />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="fleet-spec">
                    <Briefcase size={16} />
                    <span>{vehicle.bags}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY DIFFERENT SECTION */}
      <section className="difference" id="difference">
        <div className="difference-container">
          <div className="difference-heading animate-on-scroll">
            <h2>Why <span className="heading-highlight">SquareConnect</span> Is Different</h2>
          </div>

          <div className="difference-body">
            <div className="difference-visual animate-on-scroll animate-left">
              <div className="difference-image-card">
                <span className="difference-emoji">🛡️</span>
                <div className="difference-badge">
                  <span className="difference-badge-dot"></span>
                  Safety First
                </div>
              </div>
            </div>

            <div className="difference-content animate-on-scroll animate-right">
              <p className="difference-intro">
                Many transport providers don&apos;t provide child seats, but SquareConnect specialises in them. We think about your family&apos;s safety as much as you do.
              </p>

              <ul className="difference-list">
                {differenceFeatures.map((feature, index) => (
                  <li key={feature} className={`difference-item animate-on-scroll animate-right delay-${index + 2}`}>
                    <ChevronRight size={18} className="difference-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="difference-cta animate-on-scroll animate-right delay-6">
                <Link href="/book" className="difference-cta-primary">
                  Reserve Baby Taxi Online
                </Link>
                <a href="tel:+61423699909" className="difference-cta-secondary">
                  <Phone size={18} />
                  +61 423 699 909
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
