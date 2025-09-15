import React from "react";
import ProfileHeader from "@/components/home/ProfileHeader";
import Blog from "./blog/page";

export default function Profile() {
    return (
        <main className="flex flex-1 justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="w-full max-w-4xl space-y-12">
                {/* Header */}
                <ProfileHeader
                    name="YuYutw123"
                    title="宅斃了"
                    avatarUrl="https://cdn.discordapp.com/avatars/338661569384808458/1166446de76e6238b8a105914182105c.webp?size=640"
                />
                <Blog />
            </div>
        </main>
    );
}
