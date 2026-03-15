import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Integrations" },
  { href: "#", label: "Changelog" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Careers" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
];

const docsLinks = [
  { href: "#", label: "Documentation" },
  { href: "#", label: "API" },
  { href: "#", label: "Status" },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Github, label: "GitHub" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-semibold text-foreground transition-colors hover:text-primary"
            >
              What to read AI?
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Personalized book recommendations in no time.
            </p>
            <ul className="mt-4 flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <LinkColumn title="Product" links={productLinks} />
          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn title="Legal" links={legalLinks} />
          <LinkColumn title="Docs" links={docsLinks} />
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {year} What to read AI?. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
