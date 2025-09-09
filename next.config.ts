/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const repo = "trytrysee";
module.exports = {
    output: "export",
    basePath: isProd ? `/${repo}` : "",
    assetPrefix: isProd ? `/${repo}/` : "",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};
