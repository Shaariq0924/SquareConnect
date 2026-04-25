"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, ArrowRight, Check } from "lucide-react";
import "../styles/fleet.css";

const vehicleRoster = [
  { 
    id: "sedan", 
    title: "Standard Sedan", 
    passengers: "4 Passengers", 
    bags: "2 Bags", 
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
    passengers: "4-6 Passengers", 
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
    id: "maxi-7", 
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
    id: "maxi-11", 
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

export default function FleetPage() {
  return (
    <main className="fleet-page w-full">
      {/* HERO SECTION */}
      <section className="fleet-hero">
        <div className="fleet-hero-container animate-fade-in">
          <h1 className="fleet-title">Premium Vehicles<br/>for <span className="heading-highlight">Family Ride</span></h1>
          <p className="fleet-description">
            At SquareConnect, we know each journey is unique, so our fleet is designed to suit families of different sizes. From school runs to airport transfers, our vehicles include baby seat options for comfortable family travel.
          </p>
        </div>
      </section>

      {/* VEHICLES GRID */}
      <section className="fleet-grid-section">
        <div className="fleet-grid-container reveal reveal-up">
          <div className="fleet-grid-header">
            <h2>Choose Your <span className="heading-highlight">Perfect Vehicle</span></h2>
            <p>Choose from our range of vehicles, maintained for comfort and equipped with baby seat options suited to your family&apos;s needs.</p>
          </div>

          <div className="fleet-grid">
            {vehicleRoster.map((vehicle, i) => (
              <div 
                key={vehicle.id} 
                className={`fleet-vehicle-card reveal reveal-scale delay-${(i + 1) * 100}`} 
              >
                <div className="fleet-vehicle-title">{vehicle.title}</div>
                <div className="fleet-vehicle-image">
                  {vehicle.image ? (
                    <Image src={vehicle.image} alt={vehicle.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="fleet-vehicle-emoji">{vehicle.emoji}</span>
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
                <div className="fleet-vehicle-specs">
                  <span className="fleet-v-spec"><Users size={18}/> {vehicle.passengers}</span>
                  <span className="fleet-v-spec"><Briefcase size={18}/> {vehicle.bags}</span>
                </div>
                <Link href="/book" className="fleet-book-btn">
                  Book This Vehicle <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

