"use client";

import React from "react";
import ProfileHeader from "@/components/home/ProfileHeader";
import Section from "@/components/home/Section";
import ChipList from "@/components/home/ChipList";
import ActionButton from "@/components/home/ActionButton";

import {
    faSchool,
    faBriefcase,
    faFileAlt,
    faCode,
    faHeart,
    faLink,
    faEnvelope,
    faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
    return (
        <main className="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="w-full max-w-4xl space-y-12">
                {/* Header */}
                <ProfileHeader
                    name="YuYutw123"
                    title="Computer Science Student"
                    location="Taipei, Taiwan"
                    avatarUrl="https://yuyutw123.github.io/favicon/favicon.png"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Education */}
                        <Section title="Education" icon={faSchool}>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">
                                        National Taiwan Ocean University
                                    </p>
                                    <p className="text-gray-600">
                                        Department of Computer Science and
                                        Engineering
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        2022 - Present
                                    </p>
                                </div>
                            </div>
                        </Section>

                        {/* Work */}
                        <Section title="Work Experience" icon={faBriefcase}>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">
                                        Software Intern{" "}
                                        <span className="text-base font-normal text-gray-500">
                                            @ uniXecure
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Participated in multiple large-scale
                                        projects focusing on backend system
                                        design and maintenance.
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        2022 - Present
                                    </p>
                                </div>
                            </div>
                        </Section>

                        {/* About */}
                        <Section title="About Me" icon={faFileAlt}>
                            <p className="text-gray-700 leading-relaxed">
                                Beyond coding, I enjoy reading, photography, and
                                traveling. I love exploring new technologies and
                                applying them to real-world problems. Continuous
                                learning and growth drive me every day.
                            </p>
                        </Section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Skills */}
                        <Section title="Skills" icon={faCode}>
                            <ChipList
                                items={["C++", "RESTful API", "Git"]}
                                variant="blue"
                            />
                        </Section>

                        {/* Interests */}
                        <Section title="Interests" icon={faHeart}>
                            <ChipList
                                items={[
                                    "Manga",
                                    "Photography",
                                    "Travel",
                                    "Exploring New Tech",
                                ]}
                                variant="gray"
                            />
                        </Section>

                        {/* Links */}
                        <Section title="Links" icon={faLink}>
                            <div className="flex flex-col gap-4">
                                <ActionButton
                                    label="Contact Me"
                                    icon={faEnvelope}
                                    variant="primary"
                                />
                                <ActionButton
                                    label="My Projects"
                                    icon={faFolderOpen}
                                    variant="secondary"
                                />
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </main>
    );
}
