import { PostData } from "@/types/posts"
import Date from "@/components/date";

export default function PostTitle({ postData }: { postData: PostData }) {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
            <div className="text-sm text-gray-600 mb-6 space-y-3">
                {/* 日期 */}
                <div className="flex items-center gap-2">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        <Date dateString={postData.date} />
                    </span>
                </div>
                {/* 分類 */}
                { postData.category && (
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-500">分類:</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium">
                            {postData.category}
                        </span>
                    </div>
                )}
                {/* 標籤 */}
                { Array.isArray(postData.tags) && postData.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-500">標籤:</span>
                        <div className="flex gap-2 flex-wrap">
                            {postData.tags.map((tag: string, i: number) => (
                                <span
                                    key={i}
                                    className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}