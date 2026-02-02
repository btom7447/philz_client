import PaymentDashboard from "./PaymentDashboard";

export const metadata = {
  title: "Payment | Admin | Philz Properties",
  description:
    "Manage and track all payment transactions, settlements, and customer payment data securely through Philz Properties admin dashboard integrated with Paystack.",
};

export default function PaymentPage() {
  return (
    <>
      <PaymentDashboard />
    </>
  );
}
