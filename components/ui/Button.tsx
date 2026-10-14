import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  hoverChildren?: ReactNode;
  hoverStartSlot?: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-surface-action text-content active:opacity-85',
  secondary: 'bg-surface-alt text-content border border-edge active:opacity-90',
  outline: 'bg-surface-base text-content border border-edge active:bg-surface-strong',
  ghost: 'bg-transparent text-content-secondary hover:text-content active:bg-surface-strong',
  dark: 'bg-content text-content-invert active:opacity-85',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-sm font-semibold rounded-md',
  md: 'h-12 px-6 text-sm font-semibold rounded-md',
  lg: 'h-14 px-8 text-base font-semibold rounded-md',
};

function ButtonContent({
  children,
  hoverChildren,
  hoverStartSlot,
}: {
  children: ReactNode;
  hoverChildren?: ReactNode;
  hoverStartSlot?: ReactNode;
}) {
  return (
    <>
      <span className="inline-grid items-center justify-items-center">
        <span
          className={cn(
            'relative z-10 [grid-area:1/1] inline-flex items-center gap-2 transition-all duration-normal ease-smooth',
            hoverChildren && 'group-hover:opacity-0 group-hover:-translate-y-0.5',
          )}
        >
          {children}
        </span>
        {hoverChildren && (
          <span
            className="relative z-20 [grid-area:1/1] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-normal ease-smooth translate-y-1 group-hover:translate-y-0"
            aria-hidden="true"
          >
            {hoverStartSlot}
            <span dir="ltr">{hoverChildren}</span>
          </span>
        )}
      </span>
      <span
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/5"
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.25)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
        aria-hidden="true"
      />
    </>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  hoverChildren,
  hoverStartSlot,
  ...props
}: ButtonProps) {
  const classes = cn(
    'group relative inline-flex items-center justify-center whitespace-nowrap select-none cursor-pointer overflow-hidden',
    'transition-all duration-normal ease-smooth',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-edge-focus',
    '[-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          <ButtonContent hoverChildren={hoverChildren} hoverStartSlot={hoverStartSlot}>
            {children}
          </ButtonContent>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        <ButtonContent hoverChildren={hoverChildren} hoverStartSlot={hoverStartSlot}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonAsButton)}>
      <ButtonContent hoverChildren={hoverChildren} hoverStartSlot={hoverStartSlot}>
        {children}
      </ButtonContent>
    </button>
  );
}
