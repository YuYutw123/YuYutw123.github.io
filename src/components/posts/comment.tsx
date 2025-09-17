"use client";

import Giscus from "@giscus/react";

const Comments = () => {

    return (
        <div id="inject-comments" className="w-full">
            <Giscus
                id="inject-comments"
                repo="YuYutw123/YuYutw123.github.io"
                repoId="R_kgDONUsJVg"
                category="Announcements"
                categoryId="DIC_kwDONUsJVs4CkrUq"
                mapping="title"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                lang="en"
                loading="lazy"
                theme={"light"}
            />
        </div>
    );
};

export default Comments;
