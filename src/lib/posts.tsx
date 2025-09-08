import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData } from "@/types/posts";

const postsDirectory = path.join(process.cwd(), "src/posts");

/**
 * 取得排序好的文章列表
 */
export function getSortedPostsData(): PostData[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData: PostData[] = fileNames
        .filter(fileName => fileName.endsWith(".md"))
        .map(fileName => {
            const fullPath = path.join(postsDirectory, fileName);

            // 檢查是否為檔案
            if (!fs.statSync(fullPath).isFile()) return null;

            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);

            return {
                id: fileName.replace(/\.md$/, ""),
                title: matterResult.data.title ?? "Untitled",
                date: matterResult.data.date ?? "",
                tags: matterResult.data.tags ?? [],
                category: matterResult.data.category ?? "",
                contentMarkdown: matterResult.content,
            };
        })
        .filter(Boolean) as PostData[];

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 取得所有文章 ID，用於 generateStaticParams
 */
export function getAllPostIds(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter(fileName => fileName.endsWith(".md"))
        .filter(fileName => {
            const fullPath = path.join(postsDirectory, fileName);
            return fs.statSync(fullPath).isFile();
        })
        .map(fileName => fileName.replace(/\.md$/, ""));
}

/**
 * 取得所有文章的路徑參數，用於舊版動態路由（Pages Router）
 * @deprecated 使用 App Router 時請改用 getAllPostIds()
 */
export function getAllPostPaths() {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter(fileName => fileName.endsWith(".md"))
        .map(fileName => ({
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        }));
}

/**
 * 取得單篇文章資料
 */
export async function getPostData(id: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    // 確認檔案存在
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
        throw new Error(`Post not found: ${id}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
        id,
        title: matterResult.data.title ?? "Untitled",
        date: matterResult.data.date ?? "",
        tags: matterResult.data.tags ?? [],
        category: matterResult.data.category ?? "",
        contentMarkdown: matterResult.content,
    };
}