"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, ArrowRight } from "lucide-react";
import "../styles/fleet.css";

const vehicleRoster = [
  { id: "sedan", title: "Standard Sedan", passengers: "4 Passengers", bags: "2 Bags", image: "/assets/Sedan.jpg", emoji: "🚗" },
  { id: "suv", title: "Premium SUV", passengers: "4-6 Passengers", bags: "1-5 Bags", image: "/assets/PremiumSUV.jpg", emoji: "🚙" },
  { id: "maxi-7", title: "7 Seater Maxi", passengers: "7 Passengers", bags: "8 Bags", image: "/assets/SevenSeater.webp", emoji: "🚐" },
  { id: "maxi-11", title: "11 Seater Maxi", passengers: "11 Passengers", bags: "16 Bags", image: "/assets/ElevenSeater.jpg", emoji: "🚍" },
  { id: "luxury", title: "Luxury European", passengers: "4 Passengers", bags: "2 Bags", image: "/assets/Sedan.jpg", emoji: "🏎️" },
  { id: "baby", title: "Baby Capsule Taxi", passengers: "4 Passengers", bags: "4 Bags", image: "/assets/PremiumSUV.jpg", emoji: "🚕" },
];

export default function FleetPage() {
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
  }, []);

  return (
    <main className="fleet-page w-full">
      {/* HERO SECTION */}
      <section className="fleet-hero">
        <div className="fleet-hero-container animate-on-scroll">
          <h1 className="fleet-title">Premium Vehicles<br/>for Family Ride</h1>
          <p className="fleet-description">
            At SquareConnect, we know each journey is unique, so our fleet is designed to suit families of different sizes. From school runs to airport transfers, our vehicles include baby seat options for comfortable family travel.
          </p>
        </div>
      </section>

      {/* VEHICLES GRID */}
      <section className="fleet-grid-section">
        <div className="fleet-grid-container animate-on-scroll">
          <div className="fleet-grid-header">
            <h2>Choose Your Perfect Vehicle</h2>
            <p>Choose from our range of vehicles, maintained for comfort and equipped with baby seat options suited to your family's needs.</p>
          </div>

          <div className="fleet-grid">
            {vehicleRoster.map((vehicle, i) => (
              <div 
                key={vehicle.id} 
                className="fleet-vehicle-card animate-on-scroll" 
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="fleet-vehicle-title">{vehicle.title}</div>
                <div className="fleet-vehicle-image">
                  {vehicle.image ? (
                    <Image src={vehicle.image} alt={vehicle.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="fleet-vehicle-emoji">{vehicle.emoji}</span>
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
