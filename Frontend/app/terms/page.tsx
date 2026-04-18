import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SquareConnect",
  description: "Terms and conditions for SquareConnect transport services.",
};

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: "#fdf2f8", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "#1f2937" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#7c3aed", marginBottom: "32px" }}>
          Terms of Service
        </h1>
        <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            Welcome to SquareConnect. By booking our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making a reservation.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>1. Booking and Reservations</h2>
          <p style={{ marginBottom: "20px" }}>
            All bookings must be made in advance through our official website, via phone, or WhatsApp. A booking is only confirmed once you receive a formal confirmation notification from SquareConnect.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>2. Passenger Conduct</h2>
          <p style={{ marginBottom: "20px" }}>
            Passengers are expected to behave in a respectful manner. Any behavior that compromises the safety of the driver or other passengers may result in immediate termination of the service without a refund.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>3. Liability</h2>
          <p style={{ marginBottom: "20px" }}>
            SquareConnect is not liable for indirect losses, unexpected delays due to extreme traffic, or flight changes outside of our control.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "#6b7280" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
