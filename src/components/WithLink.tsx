import Link from "next/link";
import React from "react";

const isLinkProps = (
  props: WithLinkProps,
): props is WithLinkAnchorProps => typeof props.href === "string";

type WithLinkAnchorProps = {
  href: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">;

type WithLinkDivProps = {
  href?: undefined;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type WithLinkProps = WithLinkAnchorProps | WithLinkDivProps;

const WithLink = (props: WithLinkProps) => {
  if (isLinkProps(props)) {
    const { href, children, ...linkProps } = props;
    return (
      <Link href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { children, ...divProps } = props;
  return <>{children}</>;
}

export default WithLink;