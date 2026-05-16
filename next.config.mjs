import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

if (process.env.NODE_ENV === "production") {
    const requiredEnv = [
        "NEXT_PUBLIC_SEGMENT_WRITE_KEY",
        "NEXT_PUBLIC_COOKIEBOT_ID",
    ];
    for (const key of requiredEnv) {
        if (!process.env[key]) {
            throw new Error(`${key} is required for production builds.`);
        }
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages can host static files, but not a running Next server.
    // output: "export" tells Next to generate static HTML/CSS/JS that GitHub Pages can serve.
    output: "export",
    typescript: {
        // ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
};

export default withBundleAnalyzer(nextConfig);
