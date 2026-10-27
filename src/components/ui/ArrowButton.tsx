type Props = {
  href?: string;
  children: string;
  variant?: 'brand' | 'line' | 'plain';
  arrow?: boolean;
  type?: 'button' | 'submit';
  className?: string;
};

const Arrow = () => (
  <span className="arr" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
  </span>
);

/** Pill button with a rolling-text hover and optional arrow. Renders <a> when href is set, otherwise <button>. */
export default function ArrowButton({ href, children, variant = 'brand', arrow = variant === 'brand', type = 'button', className = '' }: Props) {
  const cls = `btn ${variant === 'brand' ? 'btn-brand' : variant === 'line' ? 'btn-line' : ''} magnetic ${className}`.trim();
  const inner = (
    <>
      <span className="t">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && <Arrow />}
    </>
  );
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <button type={type} className={cls}>{inner}</button>
  );
}
