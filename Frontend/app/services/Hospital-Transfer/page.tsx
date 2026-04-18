import Services from "../../components/Services";

export const metadata = {
  title: "Hospital Transfers | SquareConnect",
  description: "Safe and comfortable hospital transfers with baby seats across Sydney. We cover all major hospitals including Royal Prince Alfred, Westmead, and more.",
};

export default function HospitalTransferPage() {
  return (
    <main>
      <Services serviceType="hospital" />
    </main>
  );
}
