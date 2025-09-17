import Image from "next/image";
import fs from "fs";
import path from "path";

export default function Gallery() {
    const galleryDir = path.join(process.cwd(), "public/Gallery");
    const files = fs.readdirSync(galleryDir);
    const images = files.map(file => `/Gallery/${file}`);

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">一些圖片</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="w-full hover:scale-105 transition-transform">
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg shadow object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
