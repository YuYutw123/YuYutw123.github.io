// app/page.tsx
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Date from "@/components/date";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* 頁面標題 */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800">最新文章</h1>

            <section className="divide-y divide-gray-200">
                {allPostsData.map(({ id, date, title }) => (
                    <Link
                        key={id}
                        href={`${BASE_PATH}/posts/${id}`}
                        className="block py-4 hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
                        <div className="text-sm text-gray-500">
                            <Date dateString={date} />
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}
