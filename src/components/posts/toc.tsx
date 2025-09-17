"use client";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TOCProps {
    toc: TOCItem[];
}

export default function TOC({ toc }: TOCProps) {
    const [isTocOpen, setIsTocOpen] = useState(false);

    if (toc.length === 0) return null;

    return (
        <div className="fixed bottom-2 right-4 z-10 flex flex-col items-end">
            {/* TOC Container */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-64 text-sm">
                {/* TOC Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faList} className="text-gray-600" />
                        <span className="font-medium text-gray-800">目錄</span>
                    </div>
                    <button
                        onClick={() => setIsTocOpen(!isTocOpen)}
                        className="text-gray-400 hover:text-gray-600 transition-all duration-200 transform hover:scale-110"
                        title={isTocOpen ? "收起目錄" : "展開目錄"}
                    >
                        <FontAwesomeIcon 
                            icon={isTocOpen ? faChevronDown : faChevronUp} 
                            className="transition-transform duration-300"
                        />
                    </button>
                </div>

                {/* TOC Items - 帶動畫的展開收起 */}
                <div className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isTocOpen ? 'max-h-[50vh] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <div className="max-h-[50vh] overflow-y-auto p-2">
                        {toc.map((item) => (
                            <div
                                key={item.id}
                                className={`
                                    cursor-pointer py-2 px-2 rounded hover:bg-blue-50 hover:text-blue-700
                                    transition-colors duration-150 border-l-2 border-transparent
                                    hover:border-blue-300
                                    ${item.level === 1 ? 'font-semibold text-gray-900' : ''}
                                    ${item.level === 2 ? 'font-medium text-gray-800' : ''}
                                    ${item.level >= 3 ? 'text-gray-700' : ''}
                                `}
                                style={{ 
                                    marginLeft: `${Math.max(0, (item.level - 1)) * 12}px`,
                                    fontSize: `${Math.max(0.75, 1 - (item.level - 1) * 0.1)}rem`
                                }}
                                onClick={() => {
                                    const el = document.getElementById(item.id);
                                    if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                }}
                                title={item.text}
                            >
                                <div className="truncate">
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TOC Footer - 帶動畫 */}
                    <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        共 {toc.length} 個標題
                    </div>
                </div>
            </div>
        </div>
    );
}