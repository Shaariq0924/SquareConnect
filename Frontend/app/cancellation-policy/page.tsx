import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | SquareConnect",
  description: "Cancellation limits and rules for SquareConnect transport rides.",
};

export default function CancellationPolicyPage() {
  return (
    <main style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "var(--foreground)" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--primary)", marginBottom: "32px" }}>
          Cancellation Policy
        </h1>
        <div style={{ backgroundColor: "var(--card-bg)", padding: "40px", borderRadius: "12px", boxShadow: "var(--card-shadow)", border: "1px solid var(--card-border)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            We understand that plans can change. This policy details how and when you can cancel your SquareConnect booking without incurring penalties.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>1. Standard Cancellation Window</h2>
          <p style={{ marginBottom: "20px" }}>
            Bookings must be cancelled at least 24 hours prior to the scheduled pickup time for a full refund or to avoid cancellation fees. Notifications must be made via official email or contact channels.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>2. Late Cancellations</h2>
          <p style={{ marginBottom: "20px" }}>
            Any cancellation made less than 24 hours before the scheduled pickup time may be subject to a 50% cancellation fee, depending on the service type booked.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "var(--gray-500)" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
