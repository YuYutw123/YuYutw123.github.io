import type { NextConfig } from "next";

const repo = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
    output: "export",
    basePath: repo ? `/${repo}` : "",
    assetPrefix: repo ? `/${repo}/` : "",
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
