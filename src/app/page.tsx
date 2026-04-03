import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const settingsRows = await prisma.setting.findMany();
    const settings = settingsRows.reduce((acc: Record<string, string>, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {});

    return <HomeContent settings={settings} />;
}
