import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on finance, entrepreneurship, health, spirituality, and leadership.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const blogPosts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return <BlogContent blogPosts={blogPosts} />;
}
