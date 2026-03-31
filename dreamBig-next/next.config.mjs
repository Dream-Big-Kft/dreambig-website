/** @type {import('next').NextConfig} */

const basePath = process.env.SITE_BASE_PATH || "";

const nextConfig = {
    // GitHub Pages can host static files, but not a running Next server.
    // output: "export" tells Next to generate static HTML/CSS/JS that GitHub Pages can serve.
    output: "export",
    basePath: basePath, // basePath helps Next route the app under /repo-name
    assetPrefix: basePath || undefined, // assetPrefix helps Next serve static files from the correct path
    typescript: {
        // ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
