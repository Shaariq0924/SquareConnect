import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SquareConnect",
  description: "Terms and conditions for SquareConnect transport services.",
};

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "var(--foreground)" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--primary)", marginBottom: "32px" }}>
          Terms of Service
        </h1>
        <div style={{ backgroundColor: "var(--card-bg)", padding: "40px", borderRadius: "12px", boxShadow: "var(--card-shadow)", border: "1px solid var(--card-border)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            Welcome to SquareConnect. By booking our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making a reservation.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>1. Booking and Reservations</h2>
          <p style={{ marginBottom: "20px" }}>
            All bookings must be made in advance through our official website, via phone, or WhatsApp. A booking is only confirmed once you receive a formal confirmation notification from SquareConnect.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>2. Passenger Conduct</h2>
          <p style={{ marginBottom: "20px" }}>
            Passengers are expected to behave in a respectful manner. Any behavior that compromises the safety of the driver or other passengers may result in immediate termination of the service without a refund.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>3. Liability</h2>
          <p style={{ marginBottom: "20px" }}>
            SquareConnect is not liable for indirect losses, unexpected delays due to extreme traffic, or flight changes outside of our control.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "var(--gray-500)" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
