import ProfileHeader from "@/components/home/ProfileHeader";

export default function Gallery() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <ProfileHeader
                name="YuYu Chen"
                titles={[
                    "Full-Stack Developer",
                    "Community Contributor"
                ]}
                avatarUrl="/yuyu.png"
            />
            
        </div>
    );
}
