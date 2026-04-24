"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Phone, ArrowRight, Clock, ShieldCheck, Baby,
  Check, ChevronLeft, ChevronRight, Users, Briefcase, MapPin, Ship
} from "lucide-react";
import "../styles/Services.css";

// Helper to highlight parts of the title
const HighlightTitle = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(" ");
  if (parts.length <= 1) return <span>{text}</span>;
  const highlightCount = parts.length > 5 ? 3 : 2;
  const mainText = parts.slice(0, parts.length - highlightCount).join(" ");
  const highlightedPart = parts.slice(parts.length - highlightCount).join(" ");
  return (
    <>
      {mainText} <span className="heading-highlight">{highlightedPart}</span>
    </>
  );
};

interface SeatOption {
  id: string;
  title: string;
  emoji: string;
  image?: string;
  hoverDetails?: {
    subtitle: string;
    bullets: string[];
  };
}

export type ServiceType = "airport" | "hospital" | "dayTours" | "hotel" | "cruise";

interface ServicesProps {
  serviceType: ServiceType;
}

type PageDataStructure = {
  hero: { badge: string; title: string; desc: string; emoji: string; btnPrimaryText: string; btnPrimaryBg: string | null; titleSize: string; themeClass?: string; image?: string };
  difference: { heading: string; emoji: string; isImageRight: boolean; texts: string[]; list: string[]; btnText: string; image?: string; background?: string; btnSolid?: boolean };
  chooseUs: { heading: string; subheading: string; cards: ChooseUsCard[]; footerText: string };
  babySeats: { heading: string; subheading: string; styleVariant: string; options: SeatOption[] };
};

interface ChooseUsCard {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
}

// ==========================================
// CORE PAGE DATA MAP
// ==========================================
const pageData: Record<string, PageDataStructure> = {
  airport: {
    hero: {
      badge: "Baby Taxi Service in Sydney",
      title: "Airport Transfers with Baby Seat",
      desc: "Traveling with little ones? SquareConnect makes Sydney airport transfers safe, comfy, and stress free with baby seats, friendly drivers, and door to door service.",
      emoji: "✈️",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: "var(--primary)",
      titleSize: "56px",
      image: "/assets/Airport_Service.png"
    },
    difference: {
      heading: "Why SquareConnect Is Different",
      emoji: "👨‍👩‍👧‍👦",
      isImageRight: false,
      texts: [
        "Many taxis don't provide car seats, but SquareConnect specialises in them. We make airport rides easy, safe, and comfortable for your whole family."
      ],
      list: [
        "We provide age appropriate seats for your child's trip.",
        "Reliable family focused transport across Sydney.",
        "Our local drivers are experienced in family transport.",
        "Comfortable vehicles for airport, cruise, and family trips."
      ],
      btnText: "Reserve Baby Taxi Online"
    },
    chooseUs: {
      heading: "Why Sydney Parents Choose SquareConnect",
      subheading: "Families pick SquareConnect because we focus on safety, comfort, and reliability. Here's why:",
      cards: [
        { icon: Clock, title: "24/7 Service", desc: "We're available 24/7 across Sydney for families needing a taxi with baby seat. Late night or early morning, we're ready when you are." },
        { icon: Baby, title: "Child Seat Taxis", desc: "All vehicles include approved baby seats. Our drivers are experienced in fitting rear, forward, and booster seats for your trip." },
        { icon: ShieldCheck, title: "Professional Drivers", desc: "Our friendly local drivers are experienced in fitting child seats. They also assist with strollers and bags to make family trips easier." }
      ],
      footerText: "We provide approved child seats as part of every family ride."
    },
    babySeats: {
      heading: "Our Baby Seat Options",
      subheading: "We have the right seat for every child, keeping your little one safe and comfortable:",
      styleVariant: "standard",
      options: [
        { id: "infant", title: "Infant Carrier", emoji: "👶" },
        { id: "convertible", title: "Convertible Seat", emoji: "🧒" },
        { id: "forward", title: "Forward Facing Seat", emoji: "💺" },
      ]
    }
  },
  hospital: {
    hero: {
      badge: "#1 Taxi Service in Sydney",
      title: "Medical or Hospital Transfers (Family or Child Appointments)",
      desc: "Need to get to the hospital with your baby and want a safe, comfortable ride?",
      emoji: "🏥🚗",
      image: "/assets/Hospital_Transfer.png",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: null,
      titleSize: "48px"
    },
    difference: {
      heading: "Taxi With Baby Seat To Hospital",
      emoji: "👨‍👩‍👧‍👦🚙",
      isImageRight: true,
      texts: [
        "At SquareConnect, we make hospital transfers with baby seats in Sydney easy, stress free, and reliable. Whether you're heading to a maternity ward, a children's hospital, or a follow up appointment, we'll get you there on time with the right seat for your little one.",
        "Every SquareConnect vehicle is equipped with clean, certified child restraints that meet Australian safety standards. Our family taxi with baby seat service supports rear facing capsules, forward facing seats, and booster seats for older children.",
        "Our drivers are trained to install seats properly so your child is secure from start to finish during all hospital transfers."
      ],
      list: [],
      btnText: "Book Your Ride"
    },
    chooseUs: {
      heading: "Why Sydney Parents Choose SquareConnect",
      subheading: "SquareConnect is designed for families and carers who need child seat taxis in Sydney. Here's what makes us different:",
      cards: [
        { icon: Clock, title: "24/7 Service", desc: "We're available 24/7 across Sydney for families needing a taxi with baby seat. Late night or early morning, we're ready when you are." },
        { icon: Baby, title: "Child Seat Taxis", desc: "All vehicles include approved baby seats. Our drivers are experienced in fitting rear, forward, and booster seats for your trip." },
        { icon: ShieldCheck, title: "Professional Drivers", desc: "Our friendly local drivers are experienced in fitting child seats. They also assist with strollers and bags to make family trips easier." }
      ],
      footerText: "We provide approved child seats as part of every family ride."
    },
    babySeats: {
      heading: "Baby Seat Options We Provide",
      subheading: "Every child is different, which is why we offer a range of seat types for different ages. During booking, tell us your child's age and we'll provide an age appropriate seat for your trip.",
      styleVariant: "pinkLabels",
      options: [
        { id: "forward", title: "Forward Facing Seat", emoji: "🧒" },
        { id: "booster", title: "Booster Seat", emoji: "💺" },
        { id: "infant", title: "Infant Carrier", emoji: "👶" },
      ]
    }
  },
  dayTours: {
    hero: {
      badge: "#1 Taxi Service in Sydney",
      title: "Daycare & School Runs\nBaby Seat Taxi",
      desc: "Safe, reliable school and daycare transport for your little ones all across Sydney NSW",
      emoji: "🎒",
      image: "/assets/Day-Tours.png",
      themeClass: "theme-day-tours",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: null,
      titleSize: "56px"
    },
    difference: {
      heading: "Daycare Taxi with Baby Seat",
      emoji: "🚕",
      image: "/assets/DayCare.png",
      isImageRight: false,
      background: "var(--background)",
      btnSolid: true,
      texts: [
        "Whether it's sports practice, music lessons, or tutoring, our after school activity taxi Sydney keeps kids moving between commitments safely.",
        "We have Sydney baby capsule taxi for children and toddler seat taxi Sydney options to suit every age group. Just tell us your child's age and we'll have the right seat ready."
      ],
      list: [
        "Proper baby baby seats, capsules, booster seat",
        "Rear facing, forward facing, and booster options available",
        "Fixed fares with no hidden charges"
      ],
      btnText: "Book Your Ride"
    },
    chooseUs: {
      heading: "Trusted By Parents",
      subheading: "We make standard daycare trips safe and easy.",
      cards: [],
      footerText: ""
    },
    babySeats: {
      heading: "Baby Seat Options We Provide",
      subheading: "Every child is different, which is why we offer a range of seat types for different ages. During booking, tell us your child's age and we'll provide an age appropriate seat for your trip.",
      styleVariant: "pinkLabels",
      options: [
        { 
          id: "1", title: "Infant Carrier", emoji: "👶", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000",
          hoverDetails: {
            subtitle: "Newborn - 6 Months up to 13kg",
            bullets: ["Rear-facing setup", "Extra head support", "Fully certified", "Easy to install"]
          }
        },
        { 
          id: "2", title: "Convertible Seat", emoji: "🧒", image: "https://images.unsplash.com/photo-1544061807-68b20dbb6be6?auto=format&fit=crop&q=80&w=1000",
          hoverDetails: {
            subtitle: "Weight 6 Months - 2 Years Up to 18kg",
            bullets: ["Forward & rear facing", "Growing room", "Long use", "Comfortable padding"]
          }
        },
        { 
          id: "3", title: "Forward Facing Seat", emoji: "👦", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000",
          hoverDetails: {
            subtitle: "2 - 5 Years up to 14-27kg",
            bullets: ["Forward facing", "Internal harness", "Maximum safety", "Comfortable headrest"]
          }
        },
        { 
          id: "4", title: "Booster Seat", emoji: "💺", image: "https://images.unsplash.com/photo-1596766453915-f55ced653c07?auto=format&fit=crop&q=80&w=1000",
          hoverDetails: {
            subtitle: "5+ Years Over 22kg",
            bullets: ["Lightweight design", "Portable", "Comfortable fit", "Easy storage"]
          }
        }
      ]
    }
  },
  hotel: {
    hero: {
      badge: "#1 Taxi Service in Sydney",
      title: "Hotel & Tourist Taxi\nwith Baby Seat",
      desc: "Safe and comfortable hotel and tourist transfers with baby seats, giving your little one the care they deserve while you travel stress free",
      emoji: "🏨",
      image: "/assets/Tours_Transfer.png",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: null,
      titleSize: "56px",
      themeClass: "theme-hotel"
    },
    difference: {
      heading: "Reliable Tourist & Hotel Transfers",
      emoji: "🚕",
      isImageRight: true,
      texts: [
        "Discovering Sydney with kids is wonderful, but getting around with luggage and strollers can be challenging. Whether you're transferring between hotels, heading to a major tourist attraction, or need a reliable ride from the airport to your accommodation, we provide comfortable taxis equipped with the right baby seats."
      ],
      list: [
        "Direct hotel-to-hotel or hotel-to-attraction transfers",
        "No waiting in taxi queues with luggage and children",
        "Fixed pricing with no hidden fees"
      ],
      btnText: "Reserve Your Taxi"
    },
    chooseUs: {
      heading: "Why Tourists Choose SquareConnect",
      subheading: "Enjoy a stress-free holiday in Sydney with transport you can rely on.",
      cards: [
        { icon: Clock, title: "Flexible Scheduling", desc: "Your holiday schedule might change. We offer flexible booking times to suit your itinerary." },
        { icon: Baby, title: "Age-Appropriate Seats", desc: "No need to travel with heavy car seats. We provide exactly what your child needs, from infant carriers to booster seats." },
        { icon: MapPin, title: "Local Knowledge", desc: "Our experienced drivers know Sydney inside out and can provide a smooth, direct route to all major hotels and attractions." }
      ],
      footerText: "We take the stress out of family holidays in Sydney."
    },
    babySeats: {
      heading: "Car Seats for Every Child",
      subheading: "From newborns to growing kids, we provide the right safety seats so you don't have to carry your own on holiday.",
      styleVariant: "standard",
      options: [
        { id: "infant", title: "Infant Carrier", emoji: "👶" },
        { id: "convertible", title: "Convertible Seat", emoji: "🧒" },
        { id: "booster", title: "Booster Seat", emoji: "💺" },
      ]
    }
  },
  cruise: {
    hero: {
      badge: "Baby Taxi Service in Sydney",
      title: "Cruise Transfers Baby Seat",
      desc: "From your door to the cruise terminal, SquareConnect provides baby seats that are properly fitted for your little ones.",
      emoji: "🚢",
      image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=1000",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: null,
      titleSize: "56px",
      themeClass: "theme-cruise"
    },
    difference: {
      heading: "Family Friendly Cruise Terminal Transfers Made Easy",
      emoji: "⚓",
      image: "https://images.unsplash.com/photo-1544061807-68b20dbb6be6?auto=format&fit=crop&q=80&w=1500",
      isImageRight: true,
      texts: [
        "Heading to the Sydney cruise terminals with kids can be tricky from handling luggage to organising the right child seat. At SquareConnect, we make cruise transfers easier with baby seats included. Whether you're boarding at the Overseas Passenger Terminal or White Bay, our drivers provide a comfortable, reliable trip for your family."
      ],
      list: [],
      btnText: ""
    },
    chooseUs: {
      heading: "Smooth Sailing From Start to Finish",
      subheading: "Why families trust us for their cruise transfers:",
      cards: [
        { icon: Clock, title: "Punctual Service", desc: "Cruise ships don't wait. We guarantee on-time pickups so you can board your ship with plenty of time to spare." },
        { icon: Baby, title: "Fitted Car Seats", desc: "Your driver arrives with the exact car seats you requested already professionally installed, saving you time." },
        { icon: Briefcase, title: "Luggage Assistance", desc: "Cruise vacations mean a lot of luggage. Our drivers are happy to assist with your bags and strollers." }
      ],
      footerText: "We make getting to the ship the easiest part of your holiday."
    },
    babySeats: {
      heading: "Car Seats for Every Age",
      subheading: "We provide the right seat to keep your little sailor safe. Just let us know their age when booking.",
      styleVariant: "standard",
      options: [
        { id: "infant", title: "Infant Carrier", emoji: "👶" },
        { id: "convertible", title: "Convertible Seat", emoji: "🧒" },
        { id: "booster", title: "Booster Seat", emoji: "💺" },
      ]
    }
  }
};

const vehicleOptions = [
  { id: "premium", title: "Premium Sedan", passengers: "4 Passengers", bags: "4 Bags", emoji: "🚗", image: "/assets/Sedan.jpg" },
  { id: "seater-7", title: "7 Seater", passengers: "7 Passengers", bags: "8 Bags", emoji: "🚐", image: "/assets/SevenSeater.webp" },
  { id: "suv", title: "SUV", passengers: "4 Passengers", bags: "1-5 Bags", emoji: "🚙", image: "/assets/PremiumSUV.jpg" },
  { id: "seater-11", title: "11 Seater", passengers: "11 Passengers", bags: "16 Bags", emoji: "🚍", image: "/assets/ElevenSeater.jpg" },
];

const hospitalList = [
  "Royal Prince Alfred Hospital",
  "St Vincent's Hospital",
  "Prince of Wales Hospital",
  "Westmead Hospital",
  "Liverpool Hospital",
  "Blacktown Hospital",
  "North Shore Private & Royal North Shore Hospital",
  "Sydney Children's Hospital",
  "Concord Hospital"
];

const checklistItems = [
  "Choose your service and fill in the booking form.",
  "Specify your child's age for the right baby seat.",
  "Select your preferred vehicle for your family.",
  "Receive a confirmation and enjoy your safe ride."
];

const commonRequests = [
  "Early morning or late-night airport pickups",
  "Multiple child seats for larger families",
  "Assistance with heavy strollers and luggage",
  "Transfers to regional NSW and outer suburbs"
];

const cruiseTerminals = [
  {
    title: "Overseas Passenger Terminal",
    subtitle: "Circular Quay, The Rocks",
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=1000",
    tag: "Circular Quay"
  },
  {
    title: "White Bay Cruise Terminal",
    subtitle: "James Craig Rd, Rozelle",
    image: "https://images.unsplash.com/photo-1544061807-68b20dbb6be6?auto=format&fit=crop&q=80&w=1500",
    tag: "Rozelle"
  }
];

// ==========================================
// COMPONENT
// ==========================================
export default function Services({ serviceType }: ServicesProps) {
  const [currentVehicle, setCurrentVehicle] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 350; // Approximates card width + gap to snap perfectly
      carouselRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Fallback to airport if type is missing or undefined yet
  const data = pageData[serviceType] || pageData.airport;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [serviceType]);

  const nextVehicle = () => {
    setCurrentVehicle((prev) => (prev + 1) % vehicleOptions.length);
  };
  const prevVehicle = () => {
    setCurrentVehicle((prev) => (prev - 1 + vehicleOptions.length) % vehicleOptions.length);
  };

  const renderDifferenceContent = () => (
    <div className={`service-difference-content ${data.difference.isImageRight ? "pr-10" : "pl-10"}`}>
      <h2 className="service-difference-heading" style={{ textAlign: 'left', marginBottom: '30px' }}>
        <HighlightTitle text={data.difference.heading} />
      </h2>
      
      {data.difference.texts.map((text: string, i: number) => (
        <p key={i} className="service-difference-text" style={{ textAlign: 'left', ...(data.difference.texts.length > 1 ? { marginBottom: '20px' } : {}) }}>
          {text}
        </p>
      ))}

      {data.difference.list.length > 0 && (
        <ul className="service-difference-list" style={{ alignItems: 'flex-start' }}>
          {data.difference.list.map((item: string, i: number) => (
            <li key={i} style={{ textAlign: 'left' }}>
              <ArrowRight size={18} className="service-difference-icon" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {data.difference.btnText !== "" && (
        <div className={`service-cta ${data.difference.isImageRight ? "mt-6" : "mt-8"}`} style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Link href="/book" className={`service-cta-primary difference-btn ${data.difference.isImageRight ? "py-3" : ""}`} style={data.difference.btnSolid ? { background: 'linear-gradient(135deg, #df75cb, #c1adff)', color: 'white', border: 'none', padding: '14px 32px', boxShadow: '0 4px 15px rgba(223, 117, 203, 0.3)' } : { background: data.hero.btnPrimaryBg || 'var(--primary)' }}>
            {data.difference.btnText}
            <ArrowRight size={18} className="ml-2" />
          </Link>
          {!data.difference.isImageRight && !data.difference.btnSolid && (
            <a href="tel:+61423699909" className="service-cta-secondary difference-btn-sec">
              +61 423 699 909
            </a>
          )}
        </div>
      )}
    </div>
  );

  const renderDifferenceVisual = () => (
    <div className="service-difference-visual">
      {data.difference.image ? (
        <div 
          className="service-difference-image" 
          style={data.difference.isImageRight ? { aspectRatio: '1.2 / 1', borderRadius: '16px', backgroundImage: `url(${data.difference.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : { backgroundImage: `url(${data.difference.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        ></div>
      ) : (
        <div className="service-difference-image" style={data.difference.isImageRight ? { aspectRatio: '1.2 / 1', borderRadius: '16px' } : {}}>
          <span className="service-emoji-placeholder" style={data.difference.isImageRight ? { fontSize: '150px' } : {}}>{data.difference.emoji}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="services-page">
      <section className={`service-hero ${data.hero.themeClass || ""}`}>
        <div className="service-hero-container animate-on-scroll">
          <div className="service-content">
            <div className="service-badge">
              <span className="hero-badge-dot"></span>
              {data.hero.badge}
            </div>
            <h1 className="service-title" style={{ fontSize: data.hero.titleSize, whiteSpace: 'pre-line' }}>
              <HighlightTitle text={data.hero.title} />
            </h1>
            <p className="service-description">
              {data.hero.desc}
            </p>
            <div className="service-cta">
              <Link href="/book" className="service-cta-primary">
                {data.hero.btnPrimaryText}
                <ArrowRight size={18} />
              </Link>
              <a href="tel:+61423699909" className="service-cta-secondary">
                +61 423 699 909
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="service-visual">
            <div className="service-image-container">
              <div className="service-image-inner">
                {data.hero.image ? (
                  <div 
                    className="hero-zoom-image"
                    style={{ backgroundImage: `url(${data.hero.image})` }}
                  />
                ) : (
                  <span className="service-emoji-placeholder">{data.hero.emoji}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-difference" style={data.difference.background ? { background: data.difference.background } : {}}>
        <div className="service-difference-container animate-on-scroll">
          {!data.difference.isImageRight && (
            <h2 className="service-difference-heading">
              {data.difference.heading}
            </h2>
          )}
          
          <div className="service-difference-body">
            {data.difference.isImageRight ? (
               <>
                 {renderDifferenceContent()}
                 {renderDifferenceVisual()}
               </>
            ) : (
               <>
                 {renderDifferenceVisual()}
                 {renderDifferenceContent()}
               </>
            )}
          </div>
        </div>
      </section>

      {data.chooseUs.cards && data.chooseUs.cards.length > 0 && (
        <section className="choose-us-section" style={serviceType === 'hospital' ? { background: 'var(--background)', paddingTop: '80px', paddingBottom: '80px' } : {}}>
          <div className="choose-us-container animate-on-scroll">
            <div className="services-choose-header animate-on-scroll">
              <h2><HighlightTitle text={data.chooseUs.heading} /></h2>
              <p>{data.chooseUs.subheading}</p>
            </div>

            <div className="choose-us-grid">
              {data.chooseUs.cards.map((card: ChooseUsCard, i: number) => {
                const Icon = card.icon;
                const isAirportActive = serviceType === 'airport' && i === 1;
                return (
                  <div key={i} className={`choose-card ${isAirportActive ? "active-card" : ""}`} style={serviceType === 'hospital' ? { borderColor: 'rgba(124, 58, 237, 0.1)' } : {}}>
                    <div className="choose-icon-wrapper">
                      <Icon size={28} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <p className={`choose-us-footer ${serviceType === 'hospital' ? 'mt-6' : ''}`}>{data.chooseUs.footerText}</p>
          </div>
        </section>
      )}

      {data.babySeats.options && data.babySeats.options.length > 0 && (
        <section className="seat-options-section" style={serviceType === 'hospital' ? { paddingTop: '100px' } : {}}>
          <div className="seat-options-container animate-on-scroll">
            <div className="seat-options-header animate-on-scroll">
              <h2><HighlightTitle text={data.babySeats.heading} /></h2>
              <p>{data.babySeats.subheading}</p>
            </div>

            <div className="seat-options-carousel-wrapper">
              {data.babySeats.styleVariant === 'pinkLabels' && (
                <button className="carousel-arrow" onClick={() => scrollCarousel('left')}><ChevronLeft size={24} /></button>
              )}

              <div className="seat-options-grid" ref={carouselRef}>
                {data.babySeats.options.map((seat: SeatOption) => (
                  <div key={seat.id} className="seat-card">
                    {data.babySeats.styleVariant === 'pinkLabels' ? (
                      <div className="seat-card-inner-pink group" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; const img = e.currentTarget.querySelector('.card-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1.08)'; const imgBox = e.currentTarget.querySelector('.seat-image-box-pink') as HTMLElement; if(imgBox) imgBox.style.height = '145px'; const content = e.currentTarget.querySelector('.seat-hover-content') as HTMLElement; if(content) { content.style.maxHeight = '300px'; content.style.opacity = '1'; content.style.marginTop = '16px'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; const img = e.currentTarget.querySelector('.card-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1)'; const imgBox = e.currentTarget.querySelector('.seat-image-box-pink') as HTMLElement; if(imgBox) imgBox.style.height = '260px'; const content = e.currentTarget.querySelector('.seat-hover-content') as HTMLElement; if(content) { content.style.maxHeight = '0px'; content.style.opacity = '0'; content.style.marginTop = '0px'; } }}>
                        <div className="seat-image-box-pink" style={{ padding: seat.image ? '0' : '40px', height: '260px', aspectRatio: 'auto', marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: 'none' }}>
                          {seat.image ? (
                            <div className="card-bg-img" style={{ width: '100%', height: '100%', backgroundImage: `url(${seat.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}></div>
                          ) : (
                            <span className="seat-emoji" style={{ fontSize: '130px' }}>{seat.emoji}</span>
                          )}
                        </div>
                        <div className="seat-card-content-pink">
                          <h3 className="seat-title" style={{ fontSize: '18px', textAlign: 'left', color: 'var(--primary)', marginBottom: 0, fontWeight: 700 }}>{seat.title}</h3>
                          
                          {seat.hoverDetails && (
                            <div className="seat-hover-content" style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                              <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '16px', fontWeight: 500 }}>{seat.hoverDetails.subtitle}</p>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {seat.hoverDetails.bullets.map((bullet: string, idx: number) => (
                                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)', fontSize: '14px' }}>
                                    <div className="seat-check-icon-pink">
                                      <Check size={12} strokeWidth={4} />
                                    </div>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="seat-image-box">
                          <span className="seat-emoji">{seat.emoji}</span>
                        </div>
                        <h3 className="seat-title">{seat.title}</h3>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {data.babySeats.styleVariant === 'pinkLabels' && (
                <button className="carousel-arrow" onClick={() => scrollCarousel('right')}><ChevronRight size={24} /></button>
              )}
            </div>

            {data.babySeats.styleVariant === 'pinkLabels' && (
              <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', marginBottom: '30px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-300)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-300)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-300)' }}></span>
              </div>
            )}

            <p className={`seat-options-footer ${serviceType === 'hospital' ? 'mt-10' : ''}`}>
              Our seats meet Australian standards and are kept in clean, ready to use condition. You can also bring your own seat if you prefer, and our drivers will assist with fitting it for your trip.
            </p>
          </div>
        </section>
      )}

      <section className="vehicles-slider-section">
        <div className="vehicles-slider-container animate-on-scroll">
          <div className="vehicles-header animate-on-scroll">
            <h2>Our Vehicles<br/><span className="heading-highlight">With Car Seats</span></h2>
          </div>

          <div className="vehicles-slider-wrapper">
            <button onClick={prevVehicle} className="slider-btn prev" aria-label="Previous Vehicle"><ChevronLeft size={24} /></button>
            <div className="vehicles-cards-container">
              <div 
                className="vehicles-track" 
                style={{ transform: `translateX(-${currentVehicle * 100}%)` }}
              >
              {vehicleOptions.map((v) => (
                <div key={v.id} className="vehicle-card-wrapper">
                  <div className="vehicle-card">
                    <span className="vehicle-type-label">{v.title}</span>
                    <div className="vehicle-image-box">
                      {v.image ? (
                        <img src={v.image} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span className="vehicle-emoji">{v.emoji}</span>
                      )}
                    </div>
                    <div className="vehicle-specs">
                      <span className="v-spec"><Users size={18} color="var(--primary)" /> {v.passengers}</span>
                      <span className="v-spec"><Briefcase size={18} color="var(--primary)" /> {v.bags}</span>
                    </div>
                    <Link href="/book" className="vehicle-book-btn">
                      Book Service Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={nextVehicle} className="slider-btn next" aria-label="Next Vehicle"><ChevronRight size={24} /></button>
        </div>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
          {vehicleOptions.map((_, i) => (
            <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentVehicle === i ? 'var(--primary)' : 'var(--gray-300)', transition: 'background 0.3s' }}></span>
          ))}
        </div>
      </section>

      {serviceType === 'hospital' && (
        <section className="airport-checklist-section" style={{ background: 'var(--background)', paddingBottom: '120px', marginTop: '60px' }}>
          <div className="airport-checklist-container animate-on-scroll">
            <div className="text-center mb-16">
              <h2 className="checklist-main-title mb-6" style={{ marginBottom: '16px' }}>
                <HighlightTitle text="We Cover All Major Sydney Hospitals" />
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">Wherever your appointment or admission is, SquareConnect provides reliable Sydney hospital transfers with child seat across Sydney.</p>
            </div>
            
            <div className="checklist-body gap-16">
              <div className="checklist-content pt-4">
                <ul className="checklist-items" style={{ gap: '22px' }}>
                  {hospitalList.map((hospital, index) => (
                    <li key={index} style={{ fontSize: '17px', fontWeight: 500, color: 'var(--gray-800)' }}>
                      <MapPin className="checklist-icon" size={24} style={{ color: 'var(--primary-light)' }} />
                      <span>{hospital}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="checklist-visual">
                <div className="checklist-image-container" style={{ aspectRatio: '1.4 / 1', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
                  <span className="checklist-emoji" style={{ fontSize: '180px' }}>🏥</span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-700 font-medium mt-20 text-lg">
              Plus, we serve surrounding suburbs like Parramatta, Chatswood, Surry Hills, Bondi, Bankstown, Penrith, Hornsby, and Campbelltown.
            </p>
          </div>
        </section>
      )}

      {serviceType === 'airport' && (
        <>
          <section className="airport-checklist-section">
            <div className="airport-checklist-container animate-on-scroll">
              <h2 className="checklist-main-title">Sydney Airport Transfers with Baby Seat</h2>
              
              <div className="checklist-body">
                <div className="checklist-visual">
                  <div className="checklist-image-container">
                    <span className="checklist-emoji">👶🚗</span>
                  </div>
                </div>

                <div className="checklist-content">
                  <h3>Booking with SquareConnect is simple:</h3>
                  <ul className="checklist-items">
                    {checklistItems.map((item, index) => (
                      <li key={index}>
                        <ChevronRight className="checklist-icon" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/book" className="service-cta-primary mt-4">
                    Book Your Ride <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="requests-section">
            <div className="requests-container animate-on-scroll">
              <div className="availability-header">
                <div className="availability-icon">
                  <Clock size={36} />
                </div>
                <div className="availability-text">
                  <h2>24/7 Availability Even for Early Flights</h2>
                  <p>Flights can be early or late. SquareConnect is available 24/7 so you never have to worry about missing a flight or waiting for a ride.</p>
                </div>
              </div>

              <div className="common-requests-wrapper">
                <h2>Common Requests We Handle</h2>
                <p className="requests-subtitle">We cater for:</p>

                <div className="requests-grid">
                  {commonRequests.map((req, i) => (
                    <div key={i} className="request-item">
                      <span className="request-dot"></span>
                      {req}
                    </div>
                  ))}
                </div>

                <p className="requests-after-text">
                  We&apos;re also available for baby capsule airport pickups in Sydney, rear facing child car seat taxis, forward facing car seat trips at Sydney Airport, and child restraint taxis across Sydney suburbs.
                </p>
              </div>

              <div className="info-cards-grid">
                <div className="info-card">
                  <h3>Large Groups and Multiple Baby Seats</h3>
                  <p>Traveling with more than one child? Our 7 seater vans and SUVs can fit multiple car seats comfortably, so the whole family can travel together safely.</p>
                </div>
                <div className="info-card">
                  <h3>Regional Airport Transfers</h3>
                  <p>Flying in or out from a regional area? We provide transfers for:</p>
                  <div className="regional-grid">
                    <span><span className="request-dot"></span> Sydney to Wollongong</span>
                    <span><span className="request-dot"></span> Sydney to Central Coast</span>
                    <span><span className="request-dot"></span> Sydney to Newcastle</span>
                    <span><span className="request-dot"></span> Sydney to Blue Mountains</span>
                  </div>
                  <p className="mt-4 text-sm">Baby and child seat options are available for all trips.</p>
                </div>
              </div>
            </div>
          </section>

        </>
      )}

      {serviceType === 'cruise' && (
        <section className="cruise-terminals-section">
          <div className="cruise-terminals-container animate-on-scroll" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
            <h2 className="terminals-heading">Serving Both Sydney Cruise Terminals</h2>
            
            <div className="terminals-grid">
              {cruiseTerminals.map((term, i) => (
                <div key={i} className="terminal-card-dynamic group">
                  <div className="terminal-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ marginTop: '4px' }}>
                      <Ship size={32} color="black" />
                    </div>
                    <div>
                      <h3 className="terminal-title">{term.title}</h3>
                      <p style={{ color: 'var(--gray-600)', fontSize: '15px', marginTop: '6px', fontWeight: 500 }}>{term.subtitle}</p>
                    </div>
                  </div>
                  <div className="terminal-image-wrapper-dynamic">
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${term.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} className="terminal-bg-pic"></div>
                    <div className="terminal-badge-dynamic">
                      <MapPin size={16} />
                      {term.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', color: 'var(--gray-700)', fontSize: '16px', marginTop: '50px', fontWeight: 500 }}>
              We pick up and drop across Sydney suburbs, including Parramatta, Bondi, Manly, Chatswood, Blacktown, and more.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
