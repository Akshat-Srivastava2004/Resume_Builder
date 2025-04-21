import { useState } from "react";
import { FileText, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-background z-40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-bold text-xl">
          <FileText className="h-6 w-6" />
          <span>ResumeBuilder</span>
        </a>

        <nav className="hidden md:flex gap-6">
          <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </a>
          <a href="#templates" className="text-sm font-medium hover:underline underline-offset-4">
            Templates
          </a>
          <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </a>
        </nav>

        <div className="hidden md:flex gap-4">
          <a
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Sign up
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 flex flex-col gap-4 bg-background">
          <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </a>
          <a href="#templates" className="text-sm font-medium hover:underline underline-offset-4">
            Templates
          </a>
          <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </a>
          <div className="flex flex-col gap-2 pt-2 border-t">
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}