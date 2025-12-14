// app/admin/page.tsx
import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for CleanCut AI",
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <AdminClient />
    </main>
  );
}
