"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Phone, ArrowRight, Clock, ShieldCheck, Baby,
  Check, ChevronLeft, ChevronRight, Users, Briefcase, MapPin, Ship
} from "lucide-react";
import "../styles/Services.css";

export type ServiceType = "airport" | "hospital" | "dayTours" | "hotel" | "cruise";

interface ServicesProps {
  serviceType: ServiceType;
}

// Add generic type definition for pageData to accept any ServiceType string
type PageDataStructure = {
  hero: { badge: string; title: string; desc: string; emoji: string; btnPrimaryText: string; btnPrimaryBg: string; titleSize: string; themeClass?: string; image?: string };
  difference: { heading: string; emoji: string; isImageRight: boolean; texts: string[]; list: string[]; btnText: string; image?: string; background?: string; btnSolid?: boolean };
  chooseUs: { heading: string; subheading: string; cards: { icon: any; title: string; desc: string }[]; footerText: string };
  babySeats: { heading: string; subheading: string; styleVariant: string; options: { id: string; title: string; emoji: string; image?: string; hoverDetails?: { subtitle: string; bullets: string[] } }[] };
};

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
      titleSize: "56px"
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
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: "var(--primary-light)",
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
      themeClass: "theme-day-tours",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: "", // Inherit from CSS theme
      titleSize: "56px"
    },
    difference: {
      heading: "Daycare Taxi with Baby Seat",
      emoji: "🚕",
      image: "https://images.unsplash.com/photo-1544061807-68b20dbb6be6?auto=format&fit=crop&q=80&w=1500",
      isImageRight: false,
      background: "#fff0f9",
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
      image: "https://images.unsplash.com/photo-1544061807-68b20dbb6be6?auto=format&fit=crop&q=80&w=1000",
      btnPrimaryText: "Book Your Ride",
      btnPrimaryBg: "linear-gradient(135deg, #df75cb, #c1adff)",
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
      btnPrimaryBg: "linear-gradient(135deg, #df75cb, #c1adff)",
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

// ==========================================
// AIRPORT SPECIFIC DATA ARRAYS
// ==========================================
const checklistItems = [
  "Phone us on +61 423 699 909 or email book@squareconnect.com.au",
  "Let us know how many seats you need and the ages of your children",
  "Your driver will bring the requested seats prepared for your trip",
  "Convenient transfers to and from Sydney Airport",
];

const commonRequests = [
  "Airport transfer with infant car seat",
  "Maxi taxi baby seat Sydney airport",
  "Sydney airport transfers with baby seat",
  "Baby capsule taxi Sydney to airport",
  "Sydney baby seat taxi airport transfer",
  "Sydney airport transfer with booster seat",
  "Airport taxi with car seat Sydney",
  "Fixed fare baby seat taxi Sydney",
  "Sydney airport taxi infant capsule"
];

const vehicleOptions = [
  { id: "seater-7", title: "7 Seater", passengers: "7 Passengers", bags: "8 Bags", emoji: "🚐", image: "https://www.pngmart.com/files/22/Kia-Carnival-PNG-Photo.png" },
  { id: "suv", title: "SUV", passengers: "4 Passengers", bags: "1-5 Bags", emoji: "🚙", image: "https://www.pngmart.com/files/22/Toyota-RAV4-PNG.png" },
  { id: "seater-11", title: "11 Seater", passengers: "11 Passengers", bags: "16 Bags", emoji: "🚍", image: "https://www.pngmart.com/files/22/Mercedes-Benz-Sprinter-PNG.png" },
];

// ==========================================
// HOSPITAL SPECIFIC DATA ARRAYS
// ==========================================
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

// ==========================================
// CRUISE SPECIFIC DATA ARRAYS
// ==========================================
const cruiseTerminals = [
  {
    title: "Overseas Passenger",
    subtitle: "Terminal (Circular Quay)",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1500",
    tag: "ideal for large international ships"
  },
  {
    title: "White Bay Cruise Terminal",
    subtitle: "(Balmain)",
    image: "https://plus.unsplash.com/premium_photo-1697730225139-2a9121a5eb2e?auto=format&fit=crop&q=80&w=1500",
    tag: "commonly used for domestic & smaller cruises"
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
  }, [serviceType]); // re-run observer if page context changes

  const nextVehicle = () => {
    setCurrentVehicle((prev) => (prev + 1) % vehicleOptions.length);
  };
  const prevVehicle = () => {
    setCurrentVehicle((prev) => (prev - 1 + vehicleOptions.length) % vehicleOptions.length);
  };

  // --- Reusable Renders ---
  const renderDifferenceContent = () => (
    <div className={`service-difference-content ${data.difference.isImageRight ? "pr-10" : "pl-10"}`}>
      <h2 className="service-difference-heading" style={{ textAlign: 'left', marginBottom: '30px' }}>
        {data.difference.heading}
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
          <Link href="/book" className={`service-cta-primary difference-btn ${data.difference.isImageRight ? "py-3" : ""}`} style={data.difference.btnSolid ? { background: 'linear-gradient(135deg, #df75cb, #c1adff)', color: 'white', border: 'none', padding: '14px 32px', boxShadow: '0 4px 15px rgba(223, 117, 203, 0.3)' } : { background: data.hero.btnPrimaryBg }}>
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
      {/* 1. HERO SECTION */}
      <section className={`service-hero ${data.hero.themeClass || ""}`}>
        <div className="service-hero-container animate-on-scroll">
          <div className="service-content">
            <div className="service-badge">
              {data.hero.badge}
            </div>
            <h1 className="service-title" style={{ fontSize: data.hero.titleSize, whiteSpace: 'pre-line' }}>
              {data.hero.title}
            </h1>
            <p className="service-description">
              {data.hero.desc}
            </p>
            <div className="service-cta">
              <Link href="/book" className="service-cta-primary" style={data.hero.btnPrimaryBg ? { background: data.hero.btnPrimaryBg } : undefined}>
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
      </section>

      {/* 2. WHY DIFFERENT SECTION */}
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

      {/* 3. WHY PARENTS CHOOSE US */}
      {data.chooseUs.cards && data.chooseUs.cards.length > 0 && (
        <section className="choose-us-section" style={serviceType === 'hospital' ? { background: '#fdfbff', paddingTop: '80px', paddingBottom: '80px' } : {}}>
          <div className="choose-us-container animate-on-scroll">
            <div className="choose-us-header" style={serviceType === 'hospital' ? { marginBottom: '40px' } : {}}>
              <h2 style={serviceType === 'hospital' ? { fontSize: '32px' } : {}}>{data.chooseUs.heading}</h2>
              <p className={serviceType === 'hospital' ? "max-w-3xl mx-auto" : ""}>{data.chooseUs.subheading}</p>
            </div>

            <div className="choose-us-grid">
              {data.chooseUs.cards.map((card: any, i: number) => {
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

      {/* 4. OUR BABY SEAT OPTIONS */}
      {data.babySeats.options && data.babySeats.options.length > 0 && (
        <section className="seat-options-section" style={serviceType === 'hospital' ? { paddingTop: '100px' } : {}}>
          <div className="seat-options-container animate-on-scroll">
            <div className="seat-options-header">
              <h2>{data.babySeats.heading}</h2>
              <p className={serviceType === 'hospital' ? "max-w-3xl mx-auto" : ""}>{data.babySeats.subheading}</p>
            </div>

            <div className="seat-options-carousel-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              {data.babySeats.styleVariant === 'pinkLabels' && (
                <button className="carousel-arrow" onClick={() => scrollCarousel('left')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c1adff', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.8, flexShrink: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}><ChevronLeft size={24} /></button>
              )}

              <div className="seat-options-grid" ref={carouselRef} style={{ flex: 1, margin: 0 }}>
                {data.babySeats.options.map((seat: any) => (
                  <div key={seat.id} className="seat-card">
                    {data.babySeats.styleVariant === 'pinkLabels' ? (
                      <div className="seat-card-inner group" style={{ transition: 'all 0.4s ease', cursor: 'pointer', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', backgroundColor: '#fcecf6' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; const img = e.currentTarget.querySelector('.card-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1.08)'; const imgBox = e.currentTarget.querySelector('.seat-image-box') as HTMLElement; if(imgBox) imgBox.style.height = '145px'; const content = e.currentTarget.querySelector('.seat-hover-content') as HTMLElement; if(content) { content.style.maxHeight = '300px'; content.style.opacity = '1'; content.style.marginTop = '16px'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; const img = e.currentTarget.querySelector('.card-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1)'; const imgBox = e.currentTarget.querySelector('.seat-image-box') as HTMLElement; if(imgBox) imgBox.style.height = '260px'; const content = e.currentTarget.querySelector('.seat-hover-content') as HTMLElement; if(content) { content.style.maxHeight = '0px'; content.style.opacity = '0'; content.style.marginTop = '0px'; } }}>
                        <div className="seat-image-box" style={{ width: '100%', aspectRatio: 'auto', padding: seat.image ? '0' : '40px', height: '260px', overflow: 'hidden', marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: 'none', background: '#f8f4ff', transition: 'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                          {seat.image ? (
                            <div className="card-bg-img" style={{ width: '100%', height: '100%', backgroundImage: `url(${seat.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}></div>
                          ) : (
                            <span className="seat-emoji" style={{ fontSize: '130px' }}>{seat.emoji}</span>
                          )}
                        </div>
                        <div style={{ background: '#fcecf6', padding: '20px 24px', textAlign: 'left' }}>
                          <h3 className="seat-title" style={{ fontSize: '18px', textAlign: 'left', color: 'var(--primary)', marginBottom: 0, fontWeight: 700 }}>{seat.title}</h3>
                          
                          {seat.hoverDetails && (
                            <div className="seat-hover-content" style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                              <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '16px', fontWeight: 500 }}>{seat.hoverDetails.subtitle}</p>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {seat.hoverDetails.bullets.map((bullet: string, idx: number) => (
                                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)', fontSize: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: '#ff99cc', color: 'white', flexShrink: 0 }}>
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
                <button className="carousel-arrow" onClick={() => scrollCarousel('right')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c1adff', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.8, flexShrink: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}><ChevronRight size={24} /></button>
              )}
            </div>

            {data.babySeats.styleVariant === 'pinkLabels' && (
              <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', marginBottom: '30px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#333' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc' }}></span>
              </div>
            )}

            <p className={`seat-options-footer ${serviceType === 'hospital' ? 'mt-10' : ''}`}>
              Our seats meet Australian standards and are kept in clean, ready to use condition. You can also bring your own seat if you prefer, and our drivers will assist with fitting it for your trip.
            </p>
          </div>
        </section>
      )}

      {/* 5. VEHICLES SLIDER SECTION */}
      <section className="vehicles-slider-section" style={{ background: '#fdfbff', padding: '100px 0' }}>
        <div className="vehicles-slider-container animate-on-scroll" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '60px' }}>
          <div className="vehicles-controls" style={{ flex: '0.8' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#a371c6', lineHeight: 1.2, marginBottom: '30px' }}>Our Vehicles<br/>With Car Seats</h2>
            <div className="slider-arrows" style={{ display: 'flex', gap: '16px' }}>
              <button onClick={prevVehicle} className="slider-btn" style={{ background: '#eabced', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', transition: 'all 0.3s ease' }}><ChevronLeft size={24} /></button>
              <button onClick={nextVehicle} className="slider-btn" style={{ background: '#eabced', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', transition: 'all 0.3s ease' }}><ChevronRight size={24} /></button>
            </div>
          </div>

          <div className="vehicles-cards-container" style={{ flex: '2', overflow: 'hidden' }}>
            <div 
              className="vehicles-track" 
              style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentVehicle * (100 / vehicleOptions.length)}%)` }}
            >
              {vehicleOptions.map((v) => (
                <div key={v.id} className="vehicle-card-wrapper" style={{ minWidth: '50%', padding: '10px', boxSizing: 'border-box' }}>
                  <div className="vehicle-card" style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="vehicle-type-label" style={{ fontSize: '20px', fontWeight: 700, color: '#a371c6', alignSelf: 'flex-start', marginBottom: '20px' }}>{v.title}</span>
                    <div className="vehicle-image-box" style={{ width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', padding: '10px' }}>
                      {v.image ? (
                        <img src={v.image} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span className="vehicle-emoji" style={{ fontSize: '80px' }}>{v.emoji}</span>
                      )}
                    </div>
                    <div className="vehicle-specs" style={{ display: 'flex', gap: '30px', color: '#8853a8', fontWeight: 600, fontSize: '14px', marginBottom: '30px', width: '100%', justifyContent: 'center' }}>
                      <span className="v-spec" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} color="#cd5ec1" /> {v.passengers}</span>
                      <span className="v-spec" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} color="#cd5ec1" /> {v.bags}</span>
                    </div>
                    <Link href="/book" className="vehicle-book-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '14px', background: 'white', color: '#974ab6', border: '1px solid #d4a9ea', borderRadius: '12px', fontWeight: 700, fontSize: '15px' }}>
                      Book Service Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
          {vehicleOptions.map((_, i) => (
            <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentVehicle === i ? '#333' : '#ccc', transition: 'background 0.3s' }}></span>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CONDITIONAL SECTIONS (Below Baby Seats)
          - Airport renders: Checklist, Requests
          - Hospital renders: Hospital List
          ========================================================================= */}

      {serviceType === 'hospital' && (
        <section className="airport-checklist-section" style={{ background: '#fdfbff', paddingBottom: '120px', marginTop: '60px' }}>
          <div className="airport-checklist-container animate-on-scroll">
            <div className="text-center mb-16">
              <h2 className="checklist-main-title mb-6" style={{ marginBottom: '16px' }}>We Cover All Major Sydney Hospitals</h2>
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
          {/* 5. SYDNEY AIRPORT TRANSFERS CHECKLIST */}
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

          {/* 6. AVAILABILITY & COMMON REQUESTS */}
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
                  We're also available for baby capsule airport pickups in Sydney, rear facing child car seat taxis, forward facing car seat trips at Sydney Airport, and child restraint taxis across Sydney suburbs.
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
        <section className="cruise-terminals-section" style={{ background: '#fdfbff', padding: '100px 0' }}>
          <div className="cruise-terminals-container animate-on-scroll" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#c1adff', textAlign: 'center', marginBottom: '60px' }}>Serving Both Sydney Cruise Terminals</h2>
            
            <div className="terminals-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px' }}>
              {cruiseTerminals.map((term, i) => (
                <div key={i} className="terminal-card group" style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 15px 50px rgba(0,0,0,0.04)', border: '1px solid rgba(124, 58, 237, 0.08)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="terminal-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ marginTop: '4px' }}>
                      <Ship size={32} color="black" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#df75cb', lineHeight: 1.2 }}>{term.title}</h3>
                      <p style={{ color: 'var(--gray-600)', fontSize: '15px', marginTop: '6px', fontWeight: 500 }}>{term.subtitle}</p>
                    </div>
                  </div>
                  <div className="terminal-image-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '1.4 / 1', borderRadius: '16px', overflow: 'hidden', background: '#f8f4ff' }}>
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${term.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} className="terminal-bg-pic"></div>
                    <div className="terminal-badge" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#ecdcf9', padding: '10px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', color: '#6d44a6', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 10px 20px rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)' }}>
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
