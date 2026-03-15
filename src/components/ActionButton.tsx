export interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  target?: string;
}

export function ActionButton({
  href,
  icon,
  text,
  target = "_blank",
}: ActionButtonProps) {
  return (
    <a className="action-button" href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
      {icon}
      <span className="action-button-text">{text}</span>
    </a>
  );
}
