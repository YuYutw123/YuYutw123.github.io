import React from "react";
import ProfileHeader from "@/components/home/ProfileHeader";
import Blog from "./blog/page";

export default function Profile() {
    return (
        <main className="min-h-screen flex flex-1 justify-center pt-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-12">
                {/* Header */}
                <ProfileHeader
                    name="YuYutw123"
                    titles={[
                        "普通和理所當然是什麼呢",
                        "我也不知道",
                        "為什麼要演奏春日影",
                    ]}
                    avatarUrl="/yuyu.png"
                />
                <Blog />
            </div>
        </main>
    );
}
