import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SquareConnect",
  description: "Privacy policy representing how SquareConnect handles user data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      <div style={{ padding: "160px 24px 80px", maxWidth: "800px", margin: "0 auto", color: "var(--foreground)" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--primary)", marginBottom: "32px" }}>
          Privacy Policy
        </h1>
        <div style={{ backgroundColor: "var(--card-bg)", padding: "40px", borderRadius: "12px", boxShadow: "var(--card-shadow)", border: "1px solid var(--card-border)", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            At SquareConnect, we are committed to protecting your personal information and your right to privacy. This privacy policy explains what information we collect when you use our services.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "20px" }}>
            We collect personal information that you voluntarily provide to us when registering for services, expressing an interest in obtaining information about us, or making a booking. This includes your name, phone number, email address, and pickup/drop-off locations.
          </p>
          <h2 style={{ fontSize: "20px", color: "var(--foreground)", marginTop: "32px", marginBottom: "16px" }}>2. How We Use Your Data</h2>
          <p style={{ marginBottom: "20px" }}>
            We use personal information collected to execute the transport service requested, to contact you regarding your booking, and for internal administrative purposes. We do not sell your data to third parties.
          </p>
          <p style={{ fontStyle: "italic", marginTop: "40px", color: "var(--gray-500)" }}>
            Last updated: April 2026. This is a placeholder document and should be updated by the administration.
          </p>
        </div>
      </div>
    </main>
  );
}
