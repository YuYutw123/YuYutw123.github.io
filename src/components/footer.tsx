export default function Navbar() {
    return (
        <footer className="text-gray-700 text-xs py-2 border-t border-blue-200 shadow shadow-blue-200">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} YuYutw123&apos;s Blog. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}
