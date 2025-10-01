import { getPostData, getAllPostIds } from "@/lib/posts";
import { PostData } from "@/types/posts";
import markdownStyles from "@/styles/markdown.module.css";
import admonitionStyles from "@/styles/admonition.module.css";
import PostTitle from "@/components/posts/postTitle";
import MarkdownRenderer from "@/components/posts/markdown";
import TOCClient from "@/components/posts/tocClient";
import Comment from "@/components/posts/comment";

import type { Metadata } from "next";


type PostPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    { params }: PostPageProps
): Promise<Metadata> {
    const { id } = await params;
    const postData: PostData = await getPostData(id);
    return {
        title: postData.title + " - YuYutw123's Blog",
        icons: {
            icon: "/yuyu.png",
        },
    };
}

export async function generateStaticParams() {
    const postIds = await getAllPostIds();
    return postIds.map((id: string) => ({
        id: id,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;
    const postData: PostData = await getPostData(id);

    return (
        <div className="mx-auto px-4 py-8 mb-24">
            <PostTitle postData={postData} />
            <div className={`prose px-1 ${markdownStyles.markdown} ${admonitionStyles.admonitionWrapper}`}>
                <MarkdownRenderer content={postData.contentMarkdown} />
                {/* <TOCClient content={postData.contentMarkdown} /> */}
                <TOCClient postId={id} />
            </div>
            <div className="mt-40">
                <Comment />
            </div>
        </div>
    );
}