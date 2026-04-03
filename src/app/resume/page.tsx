import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
    title: "Resume",
    description: "Pramesh Bhandari's professional resume — education, experience, certifications, and skills in a structured timeline format.",
};

export const dynamic = "force-dynamic";

export default async function ResumePage() {
    const education = await prisma.education.findMany({ orderBy: { order: "asc" } });
    const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

    const settingsRows = await prisma.setting.findMany({ where: { key: "resumePdfUrl" } });
    const resumePdfUrl = settingsRows.length > 0 ? settingsRows[0].value : "";

    return (
        <ResumeContent 
            education={education}
            experience={experience}
            skills={skills}
            resumePdfUrl={resumePdfUrl}
        />
    );
}
