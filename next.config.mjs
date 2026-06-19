import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Local development uses this custom host, so allow it to request Next's
  // dev-only /_next/* assets from the dev server.
  allowedDevOrigins: ["local.dreambig.hu"],
};

export default withBundleAnalyzer(nextConfig);
