import Link from "next/link";
import React from "react";

type WithLinkProps = {
  href?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

const WithLink = ({
  href,
  children,
  ...props
}: WithLinkProps) => {
  if (!href) return <>{children}</>;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default WithLink;