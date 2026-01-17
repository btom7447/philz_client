export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h2 className="text-lg font-semibold">My Account</h2>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-blue-50 p-4 text-center">
        Customer Portal © Philz Properties
      </footer>
    </div>
  );
}