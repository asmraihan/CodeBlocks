import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const navigation = [

  {
    name: "GitHub",
    href: "https://github.com/asmraihan",
    icon: GitHubLogoIcon,
  },
];

export default function Footer() {
  return (
    <footer className="supports-backdrop-blur:bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-2 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Built by{" "}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline text-foreground"
              href="https://www.x.com/abdo_eth"
            >
              Asm Raihan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}