import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <a href="/admin">Dashboard</a>
          <a href="/admin/users">Users</a>
          <a href="/admin/properties">Properties</a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-200 p-4">
          <h1 className="font-bold">Admin</h1>
        </header>

        <main className="flex-1 p-6">{children}</main>

        <footer className="bg-gray-200 p-4 text-center">
          Admin Console © Philz Properties
        </footer>
      </div>
    </div>
  );
}