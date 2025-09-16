import { getPostData, getAllPostIds } from "@/lib/posts";
import { PostData } from "@/types/posts";
import markdownStyles from '@/styles/markdown.module.css';
import admonitionStyles from '@/styles/admonition.module.css';
import MarkdownRenderer from "@/components/posts/markdown";
import PostTitle from "@/components/posts/postTitle";
import type { Metadata } from "next";

type PostPageProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const postData: PostData = await getPostData(params.id);
    return {
        title: postData.title + " - YuYutw123's Blog",
    };
}

export async function generateStaticParams() {
    const postIds = await getAllPostIds();
    return postIds.map((id: string) => ({
        id: id,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const postData: PostData = await getPostData(params.id);

    return (
        <div className="mx-auto px-4 py-8 mb-24">
            <PostTitle postData={postData} />
            <div className={`prose px-1 ${markdownStyles.markdown} ${admonitionStyles.admonitionWrapper}`}>
                <MarkdownRenderer content={postData.contentMarkdown} />
            </div>
        </div>
    );
}
