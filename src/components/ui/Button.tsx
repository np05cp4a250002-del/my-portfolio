import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export default function Button({
    href,
    onClick,
    children,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 ease-out";

    const variantStyles = {
        primary:
            "bg-charcoal text-offwhite hover:bg-gold hover:text-charcoal border border-charcoal hover:border-gold",
        secondary:
            "bg-gold/10 text-charcoal hover:bg-gold hover:text-offwhite border border-gold/30 hover:border-gold",
        outline:
            "bg-transparent text-charcoal hover:bg-charcoal hover:text-offwhite border border-charcoal/30 hover:border-charcoal",
    };

    const sizeStyles = {
        sm: "text-xs px-5 py-2.5",
        md: "text-xs px-7 py-3.5",
        lg: "text-sm px-9 py-4",
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`;

    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedStyles}
        >
            {children}
        </button>
    );
}
