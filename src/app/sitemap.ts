import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const domain = "https://yuyutw123.github.io";

    const postsDir = path.join(process.cwd(), "src/posts");
    const postFiles = fs.readdirSync(postsDir);

    const posts = postFiles.map((file) => {
        const slug = file.replace(/\.mdx?$/, "");
        return {
            url: `${domain}/posts/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        };
    });

    return [
        {
            url: domain,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...posts,
    ];
}
