import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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
