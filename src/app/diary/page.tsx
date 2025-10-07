import Link from "next/link";
import { getDiaryPostsData } from "@/lib/posts";
import Date from "@/components/date";

export default async function Blog() {
    const allPostsData = await getDiaryPostsData();

    return (
        <div className="max-w-3xl mx-auto px-6 pt-6 pb-12">
            {/* 頁面標題 */}
            <h1 className="text-2xl font-bold mb-6 text-gray-800">最新文章</h1>

            <section className="divide-y divide-gray-200">
                {allPostsData.map(({ id, date, title }) => (
                    <Link
                        key={id}
                        href={`/posts/${id}`}
                        target="_self"
                        className="block py-4 px-2 hover:bg-gray-100 transition-colors"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            {title}
                        </h2>
                        <div className="text-sm text-gray-500">
                            <Date dateString={date} />
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}
