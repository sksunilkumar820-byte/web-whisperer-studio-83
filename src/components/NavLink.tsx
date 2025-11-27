import { Link, LinkProps, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps extends Omit<LinkProps, 'to'> {
  activeClassName?: string;
  to: string;
}

export const NavLink = ({ className, activeClassName, to, ...props }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        className,
        isActive && activeClassName
      )}
      {...props}
    />
  );
};
