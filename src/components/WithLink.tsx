import Link from "next/link";
import React from "react";

interface WithLinkProps {
    href?: string;
    children: React.ReactNode;
    [key: string]: any;
}

const WithLink: React.FC<WithLinkProps> = ({ href, children, ...props }) => {
    if (href) {
        return <Link href={href} {...props}>{children}</Link>;
    }
    return <div {...props}>{children}</div>
}

export default WithLink;