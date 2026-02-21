"use client";

import { useEffect, useState } from "react";
import { Github, Twitter, Terminal } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#how-it-works" },
    { name: "Metrics", href: "#metrics" },
    { name: "Changelog", href: "#" },
  ],
  Developers: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "SDK", href: "#developers" },
    { name: "Status", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
};

function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [displayStars, setDisplayStars] = useState<number>(0);

  useEffect(() => {
    const CACHE_KEY = "github-stars";
    const CACHE_TIME_KEY = "github-stars-time";
    const ONE_HOUR = 1000 * 60 * 60;

    const cachedStars = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedStars && cachedTime && Date.now() - parseInt(cachedTime) < ONE_HOUR) {
      setStars(parseInt(cachedStars));
    } else {
      fetch("https://api.github.com/repos/amirebog/Arduino")
        .then((res) => res.json())
        .then((data) => {
          const count = data.stargazers_count ?? 0;
          setStars(count);
          localStorage.setItem(CACHE_KEY, count.toString());
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        })
        .catch(() => setStars(0));
    }
  }, []);

  // Animate counting
  useEffect(() => {
    if (stars === null) return;
    let start = 0;
    const end = stars;
    const duration = 800; // 0.8s
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayStars(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [stars]);

  return (
    <a
      href="https://github.com/amirebog/Arduino"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-foreground transition-colors"
    >
      ⭐ {displayStars} Stars
    </a>
  );
}

export function FooterSection() {
  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold text-lg tracking-tight">
                  Arduino
                </span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Open-source platform built for developers and hardware enthusiasts.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://x.com/amirebog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/amirebog/Arduino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Arduino. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <GitHubStars />

            <span>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
