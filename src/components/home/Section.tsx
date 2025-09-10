"use client";

import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type SectionProps = {
    title: string;
    icon: IconDefinition;
    children: ReactNode;
};

export default function Section({ title, icon, children }: SectionProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900">
                <FontAwesomeIcon icon={icon} className="text-blue-600" />
                {title}
            </h2>
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                {children}
            </div>
        </section>
    );
}
