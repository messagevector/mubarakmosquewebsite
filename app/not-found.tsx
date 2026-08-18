import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-36 text-center">
        <h1 className="font-display text-5xl text-white">Page not found</h1>
        <p className="mt-4 text-muted">
          This page does not exist. Return to the mosque homepage to find prayer times and
          upcoming activities.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
