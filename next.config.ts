import type { NextConfig } from 'next';

const repo = process.env.BASE_PATH; // 確保這個名稱與你的 GitHub repository 名稱一致

const nextConfig: NextConfig = {
    output: 'export',
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // 確保輸出目錄是 out
    distDir: 'out',
    // 禁用一些在靜態導出中不支援的功能
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
};

export default nextConfig;