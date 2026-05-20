"use client";

type CompanyEmailLinkProps = {
    className?: string;
};

const emailCodes = [105, 110, 102, 111, 64, 100, 114, 101, 97, 109, 98, 105, 103, 46, 104, 117];

export function CompanyEmailLink({ className }: CompanyEmailLinkProps) {
    const email = String.fromCharCode(...emailCodes);

    return (
        <a href={`mailto:${email}`} className={className}>
            {email}
        </a>
    );
}
