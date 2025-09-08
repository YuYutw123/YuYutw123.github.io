/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    basePath: '/trytrysee',
    trailingSlash: true,
    images: {
        unoptimized: true
    }
};

module.exports = nextConfig;