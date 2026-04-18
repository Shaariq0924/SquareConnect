import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | SquareConnect",
  description: "Refund policy for SquareConnect transport services.",
};

export default function RefundPolicyPage() {
  return (
    <main style={{ backgroundColor: "#fdf2f8", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "#1f2937" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#7c3aed", marginBottom: "32px" }}>
          Refund Policy
        </h1>
        <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            At SquareConnect, we strive to ensure 100% satisfaction. If our service did not meet your expectations or was critically delayed due to operations within our control, you may be eligible for a refund.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>1. Eligibility for Refunds</h2>
          <p style={{ marginBottom: "20px" }}>
            Refunds will be provided if the booking was cancelled by SquareConnect, if the driver failed to show up without prior communication, or if severe service disruptions occurred.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>2. Non-Refundable Situations</h2>
          <p style={{ marginBottom: "20px" }}>
            We do not offer refunds if the passenger fails to show up at the designated time ("No Show"), or if the passenger cancels the ride outside the allowed cancellation window.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "#6b7280" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
