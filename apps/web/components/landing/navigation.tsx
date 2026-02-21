"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, useHits } from "react-instantsearch-hooks-web";

const InstantSearchComponent = InstantSearch as any;
const SearchBoxComponent = SearchBox as any;

/* ================= NAV DATA ================= */

const navLinks = [
  {
    name: "Platform",
    href: "#features",
    dropdown: {
      title: "Platform",
      description: "Everything you need to build and scale.",
      items: [
        { name: "Overview", desc: "High-level summary", href: "#overview" },
        { name: "Features", desc: "Powerful capabilities", href: "#features" },
        { name: "Integrations", desc: "Connect your tools", href: "#integrations" },
        { name: "Automation", desc: "Streamline workflows", href: "#automation" },
      ],
    },
  },
  {
    name: "Technology",
    href: "#how-it-works",
    dropdown: {
      title: "Technology",
      description: "Built with modern architecture.",
      items: [
        { name: "Architecture", desc: "Scalable infrastructure", href: "#architecture" },
        { name: "Security", desc: "Enterprise-grade protection", href: "#security" },
        { name: "Performance", desc: "Optimized for speed", href: "#performance" },
        { name: "AI Engine", desc: "Next-gen intelligence", href: "#ai" },
      ],
    },
  },
  { name: "Metrics", href: "#metrics" },
  { name: "Developers", href: "#developers" },
];

/* ================= SEARCH ================= */

const searchClient = algoliasearch(
  "NL4UPSFTO6",
  "df6398f08493df58e21ebddb6316bcd6"
);

function Hit({ hit }: { hit: any }) {
  return (
    <a
      href={hit.url}
      className="block px-4 py-3 hover:bg-muted/60 transition-all duration-200 rounded-lg text-sm text-foreground border-b border-border last:border-b-0 hover:translate-x-1"
    >
      <div className="font-medium">{hit.title}</div>
      {hit.description && (
        <div className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
          {hit.description}
        </div>
      )}
    </a>
  );
}

function SearchDropdown() {
  const { hits } = useHits();
  if (!hits || hits.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background/70 border border-white/20 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-2">
        {hits.map((hit: any) => (
          <Hit key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
              <Image
                src="/arduino.png"
                alt="Arduino Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Arduino
            </span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground group-hover:bg-muted/50 transition-all duration-200 rounded-lg"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                  )}
                </a>

                {link.dropdown && (
                  <div className="absolute left-0 top-full mt-2 w-[560px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-background/70 border border-white/20 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-foreground">
                          {link.dropdown.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {link.dropdown.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {link.dropdown.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group/item p-4 rounded-xl hover:bg-muted/80 transition-all duration-200 hover:shadow-sm"
                          >
                            <div className="text-sm font-medium text-foreground group-hover/item:translate-x-0.5 transition-transform duration-200">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1.5">
                              {item.desc}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP SEARCH + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div ref={searchRef} className="relative w-80">
              <InstantSearchComponent searchClient={searchClient} indexName="arduino">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                  </div>
                  <SearchBoxComponent
                    placeholder="Search documentation..."
                    classNames={{
                      input:
                        "pl-10 pr-4 py-2.5 w-full bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/80 focus:bg-white/15 backdrop-blur-sm text-sm transition-all duration-200",
                      submit: "hidden",
                      reset: "hidden",
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  {isSearchOpen && <SearchDropdown />}
                </div>
              </InstantSearchComponent>
            </div>

            <Button variant="ghost" size="sm" className="rounded-lg">
              Sign in
            </Button>
            <Button size="sm" className="rounded-lg">
              Get Started
            </Button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 active:scale-95"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
