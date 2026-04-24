"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, ChevronLeft, Users, Briefcase, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    image: "/assets/Airport_Service.png",
    buttonText: "Book Airport Transfers Baby Seat",
  },
  {
    id: "cruise-fp",
    title: "Cruise Terminal Transfers",
    desc: "Safe and comfortable transfers to and from cruise terminals with premium child seats included.",
    icon: "🚢",
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=1000",
    buttonText: "Book Cruise Terminal Taxi",
  },
  {
    id: "hotel-fp",
    title: "Hotel & Holiday Transfers",
    desc: "A premium ride with an infant seat ready for your airport or hotel trip across the city.",
    icon: "🏨",
    image: "/assets/Tours_Transfer.png",
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
  "We provide age appropriate seats for your child&apos;s trip.",
  "Reliable family focused transport across Australia.",
  "Our local drivers are experienced in family transport.",
  "Comfortable vehicles for airport, cruise, and family trips.",
];

// --- Framer Motion Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.75, rotate: -3 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, delay, type: "spring", stiffness: 100, damping: 14 },
  }),
};

const flipIn = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (delay: number) => ({
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Floating particle component
const FloatingParticle = ({ delay, x, y, size, duration }: { delay: number; x: string; y: string; size: number; duration: number }) => (
  <motion.div
    style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(124, 58, 237, 0.12)',
      pointerEvents: 'none', zIndex: 0,
    }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -10, 5, 0],
      scale: [1, 1.3, 0.9, 1.1, 1],
      opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Main() {
  const [fleetIndex, setFleetIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const nextFleet = () => {
    const visible = getVisibleCards();
    setFleetIndex((prev) => (prev + 1 >= fleetVehicles.length - visible + 1 ? 0 : prev + 1));
  };

  const prevFleet = () => {
    const visible = getVisibleCards();
    setFleetIndex((prev) => (prev - 1 < 0 ? fleetVehicles.length - visible : prev - 1));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero-section" ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating particles */}
        <FloatingParticle delay={0} x="10%" y="20%" size={12} duration={7} />
        <FloatingParticle delay={1.5} x="80%" y="15%" size={18} duration={9} />
        <FloatingParticle delay={0.8} x="65%" y="70%" size={10} duration={6} />
        <FloatingParticle delay={2} x="25%" y="80%" size={14} duration={8} />
        <FloatingParticle delay={0.3} x="90%" y="50%" size={8} duration={10} />
        <FloatingParticle delay={1} x="5%" y="55%" size={16} duration={7.5} />

        <motion.div className="hero-container" style={{ y: heroParallaxY, opacity: heroOpacity }}>
          {/* Left: Text Content */}
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              id="hero-badge"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <motion.span
                className="hero-badge-dot"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Premium Transport Solutions
            </motion.div>

            <motion.h1
              className="hero-title"
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Your Trusted{" "}
              <span className="hero-title-highlight">Transport Partner</span>{" "}
              in Australia
            </motion.h1>

            <motion.p
              className="hero-description"
              id="hero-description"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              SquareConnect delivers premium transport solutions — Airport
              Transfers, Day Tours, Cruise Transfers, and Hospital Transport.
              Every trip comes with professional drivers, tidy vehicles, and
              upfront fixed fares.
            </motion.p>

            <motion.div
              className="hero-cta"
              id="hero-cta"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/book" className="hero-cta-primary" id="hero-book-now">
                  Book Your Ride
                </Link>
              </motion.div>
              <motion.a
                href="tel:+61423699909"
                className="hero-cta-secondary"
                id="hero-call"
                whileHover={{ scale: 1.03 }}
              >
                <Phone size={18} />
                +61 423 699 909
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Image Card */}
          <motion.div
            className="hero-visual"
            id="hero-visual"
            initial={{ opacity: 0, x: 100, scale: 0.85, rotate: 5 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 60, damping: 18 }}
          >
            <motion.div
              className="hero-card"
              id="hero-card"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, rotate: -1 }}
            >
              <Image
                src="/assets/Main_Image.png"
                alt="Main Transport Image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SERVICES INTRO SECTION */}
      <section className="services-intro" id="services-intro">
        <div className="services-intro-container">
          <motion.div
            className="services-intro-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <h2>
              Need a <span className="heading-highlight">Reliable Transport</span> in Australia?
            </h2>
            <p>
              From airport pickups to scenic day tours, we make every journey safe, comfortable, and stress-free.
            </p>
          </motion.div>

          <div className="services-intro-body">
            <motion.div
              className="services-intro-image"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.15}
            >
              <div className="services-intro-card">
                <div className="services-intro-card-badge">
                  <span className="services-intro-card-badge-dot"></span>
                  Trusted Service
                </div>
                <Image
                  src="/assets/Family.png"
                  alt="Trusted Family Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </motion.div>

            <div className="services-intro-text">
              <motion.h3
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.2}
              >
                Travelling across Australia shouldn&apos;t be stressful
              </motion.h3>
              <motion.p
                className="services-intro-text-paragraph"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.3}
              >
                Whether you&apos;re heading to the airport, catching a cruise, or visiting a loved one at the hospital — SquareConnect takes the hassle out of transport. We&apos;re one of the most trusted transport services across Sydney, Melbourne, and Gold Coast.
              </motion.p>
              <motion.p
                className="services-intro-text-paragraph"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.4}
              >
                That&apos;s where SquareConnect makes life easier. We provide professional drivers, premium vehicles, and a seamless booking experience.
              </motion.p>

              <motion.ul
                className="services-intro-features"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {servicesFeatures.map((feature) => (
                  <motion.li key={feature} className="services-intro-feature" variants={staggerItem}>
                    <span className="feature-icon">
                      <ChevronRight size={16} />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="services-intro-cta"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.6}
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/book" className="services-intro-cta-primary">
                    Book Your Ride Now
                  </Link>
                </motion.div>
                <a href="tel:+61423699909" className="services-intro-cta-secondary">
                  <Phone size={18} />
                  +61 423 699 909
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE + BOOKING FORM SECTION */}
      <section className="why-choose" id="why-choose">
        <div className="why-choose-container">
          <motion.div
            className="booking-form-wrapper"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0.1}
          >
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

                <motion.button
                  className="form-submit"
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(124, 58, 237, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                  <ChevronRight size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="why-choose-content"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0.2}
          >
            <h2>
              Why Travellers Choose <span className="heading-highlight">SquareConnect</span>
            </h2>
            <p className="why-choose-intro">
              We know reliability matters most when it comes to transport.
            </p>

            <motion.ul
              className="why-choose-features"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {whyChooseFeatures.map((feature) => (
                <motion.li key={feature} className="why-choose-feature" variants={staggerItem}>
                  <span className="why-choose-feature-icon">
                    <ChevronRight size={15} />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="why-choose-image-card"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={0.2}
            >
              <img
                src="/assets/ElevenSeater.jpg"
                alt="SquareConnect Eleven Seater"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            <motion.p
              className="why-choose-bottom-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={0.1}
            >
              When you book with SquareConnect, you can travel with peace of mind.
            </motion.p>

            <motion.div
              className="why-choose-cta"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={0.2}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/book" className="why-choose-cta-primary">
                  Book Online
                </Link>
              </motion.div>
              <a href="tel:+61423699909" className="why-choose-cta-secondary">
                <Phone size={18} />
                +61 423 699 909
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. BABY SEAT OPTIONS SECTION */}
      <section className="baby-seats" id="baby-seats">
        <div className="baby-seats-container">
          <motion.div
            className="baby-seats-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <h2>
              Baby Seat Options <span className="heading-highlight">We Provide</span>
            </h2>
          </motion.div>

          <div className="baby-seats-body">
            <motion.div
              className="baby-seats-content"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.1}
            >
              <p className="baby-seats-intro">
                Every child is different, which is why we offer a range of seat types for different ages. During booking, tell us your child&apos;s age and we&apos;ll provide an age appropriate seat for your trip.
              </p>

              <motion.ul
                className="baby-seats-list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {babySeats.map((seat) => (
                  <motion.li key={seat.id} className="baby-seat-item" variants={staggerItem}>
                    <div className="baby-seat-item-icon">
                      <ChevronRight size={16} />
                    </div>
                    <div className="baby-seat-item-text">
                      <h4>{seat.title}</h4>
                      <p>{seat.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p
                className="baby-seats-footer"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={0.3}
              >
                Our seats meet Australian standards and are kept in clean, ready to use condition. You can also bring your own seat if you prefer, and our drivers will assist with fitting it for your trip.
              </motion.p>
            </motion.div>

            <motion.div
              className="baby-seats-visual"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.2}
            >
              <div className="baby-seats-grid">
                <div className="baby-seat-stack">
                  <motion.div
                    className="baby-seat-card rear-facing-card"
                    variants={flipIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                    whileHover={{ y: -12, scale: 1.06, rotateZ: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ perspective: 800 }}
                  >
                    <motion.div
                      className="baby-seat-card-emoji"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >👶</motion.div>
                    <span className="baby-seat-card-label">Rear Facing</span>
                  </motion.div>
                  <motion.div
                    className="baby-seat-card forward-facing-card"
                    variants={flipIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.25}
                    whileHover={{ y: -12, scale: 1.06, rotateZ: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ perspective: 800 }}
                  >
                    <motion.div
                      className="baby-seat-card-emoji"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >🧒</motion.div>
                    <span className="baby-seat-card-label">Forward Facing</span>
                  </motion.div>
                </div>
                <motion.div
                  className="baby-seat-card booster-card"
                  variants={flipIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.4}
                  whileHover={{ y: -12, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAMILY FRIENDLY SERVICES SECTION */}
      <section className="family-services" id="family-services">
        <motion.div
          className="family-services-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
        >
          <div className="family-services-heading">
            <h2>
              Our <span className="heading-highlight">Family Friendly</span> Services
            </h2>
          </div>
          <p className="family-services-intro">
            SquareConnect provides a range of family transport options across Australia, ensuring safety and comfort for passengers of all ages.
          </p>

          <motion.div
            className="family-services-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {familyServiceCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="family-service-card"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={index * 0.15}
                whileHover={{
                  y: -14,
                  boxShadow: "0 30px 70px rgba(124, 58, 237, 0.15)",
                  borderColor: "rgba(124, 58, 237, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <motion.div
                  className="family-service-card-visual"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {card.image ? (
                    <img src={card.image} alt={card.title} className="family-service-card-img" />
                  ) : (
                    <span>{card.icon}</span>
                  )}
                </motion.div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/book" className="family-service-card-btn">
                    {card.buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 6. OUR FLEET SECTION */}
      <section className="fleet" id="fleet">
        <motion.div
          className="fleet-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
        >
          <div className="fleet-heading">
            <h2>Our <span className="heading-highlight">Fleet</span></h2>
          </div>

          <div className="fleet-slider-wrapper">
            <motion.button
              className="fleet-nav-btn prev"
              onClick={prevFleet}
              aria-label="Previous Vehicle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="fleet-slider-content">
              <motion.div
                className="fleet-grid"
                animate={{ x: `-${fleetIndex * (100 / fleetVehicles.length)}%` }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120, damping: 20 }}
              >
                {fleetVehicles.map((vehicle, idx) => (
                  <div key={vehicle.id} className={`fleet-card ${idx === fleetIndex ? "active" : ""}`} style={{ flex: '1', minWidth: '0' }}>
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
              </motion.div>
            </div>

            <motion.button
              className="fleet-nav-btn next"
              onClick={nextFleet}
              aria-label="Next Vehicle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          <div className="fleet-dots">
            {fleetVehicles.map((_, idx) => (
              <button
                key={idx}
                className={`fleet-dot ${idx === fleetIndex ? "active" : ""}`}
                onClick={() => setFleetIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. WHY DIFFERENT SECTION */}
      <section className="difference" id="difference">
        <div className="difference-container">
          <motion.div
            className="difference-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <h2>Why <span className="heading-highlight">SquareConnect</span> Is Different</h2>
          </motion.div>

          <div className="difference-body">
            <motion.div
              className="difference-visual"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.15}
            >
              <motion.div
                className="difference-image-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04, rotate: -1 }}
              >
                <Image
                  src="/assets/Family.png"
                  alt="Family Safe Travel"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-[40px]"
                />
                <motion.div
                  className="difference-badge"
                  animate={{ boxShadow: ["0 10px 25px rgba(0,0,0,0.06)", "0 10px 35px rgba(124, 58, 237, 0.2)", "0 10px 25px rgba(0,0,0,0.06)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="difference-badge-dot"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Safety First
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="difference-content">
              <motion.p
                className="difference-intro"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.2}
              >
                Many transport providers don&apos;t provide child seats, but SquareConnect specialises in them. We think about your family&apos;s safety as much as you do.
              </motion.p>

              <motion.ul
                className="difference-list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {differenceFeatures.map((feature) => (
                  <motion.li key={feature} className="difference-item" variants={staggerItem}>
                    <ChevronRight size={18} className="difference-icon" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="difference-cta"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={0.3}
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/book" className="difference-cta-primary">
                    Reserve Baby Taxi Online
                  </Link>
                </motion.div>
                <a href="tel:+61423699909" className="difference-cta-secondary">
                  <Phone size={18} />
                  +61 423 699 909
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
