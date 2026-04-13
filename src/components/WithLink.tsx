import Link from "next/link";
import React from "react";

type WithLinkAnchorProps = {
  href: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">;

type WithLinkDivProps = {
  href?: undefined;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type WithLinkProps = WithLinkAnchorProps | WithLinkDivProps;

const isLinkProps = (
  props: WithLinkProps,
): props is WithLinkAnchorProps => typeof props.href === "string";

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
  return <div {...divProps}>{children}</div>;
}

export default WithLink;