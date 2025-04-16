import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            💸 Finance Visualizer
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full p-4">{children}</main>

      <footer className="bg-white text-center p-4 shadow-inner text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ashish Raghuvanshi. All rights
        reserved.
      </footer>
    </div>
  );
}
