import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SquareConnect",
  description: "Privacy policy representing how SquareConnect handles user data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ backgroundColor: "#fdf2f8", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "#1f2937" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#7c3aed", marginBottom: "32px" }}>
          Privacy Policy
        </h1>
        <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            At SquareConnect, we are committed to protecting your personal information and your right to privacy. This privacy policy explains what information we collect when you use our services.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "20px" }}>
            We collect personal information that you voluntarily provide to us when registering for services, expressing an interest in obtaining information about us, or making a booking. This includes your name, phone number, email address, and pickup/drop-off locations.
          </p>
          <h2 style={{ fontSize: "20px", color: "#111", marginTop: "32px", marginBottom: "16px" }}>2. How We Use Your Data</h2>
          <p style={{ marginBottom: "20px" }}>
            We use personal information collected to execute the transport service requested, to contact you regarding your booking, and for internal administrative purposes. We do not sell your data to third parties.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "#6b7280" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
