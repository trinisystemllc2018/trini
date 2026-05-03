"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "success" | "danger";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const variants: Record<Variant, string> = {
  primary:   "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-brand border border-blue-700/20",
  secondary: "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200",
  outline:   "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-blue-300",
  ghost:     "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent",
  success:   "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md border border-emerald-600/20",
  danger:    "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-xl",
  md: "px-6 py-3 text-base gap-2 rounded-2xl",
  lg: "px-8 py-4 text-lg gap-2.5 rounded-2xl font-semibold",
  xl: "px-10 py-5 text-xl gap-3 rounded-3xl font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className,
  children,
  disabled,
  as: Tag = "button",
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "active:scale-[0.97] cursor-pointer select-none touch-target",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}

/* ── Sticky CTA Bar ── */
export function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 no-print"
    >
      <div className="bg-white border-t border-gray-100 shadow-soft-xl px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm md:text-base font-medium text-gray-700">
            Technicians available now — average response under 5 min
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" size="sm" href="tel:+13479531531">
            📞 Call Now
          </Button>
          <Button variant="primary" size="sm" href="/contact">
            Get Help →
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
