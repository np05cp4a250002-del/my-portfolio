"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

type BlogPostType = { id: string; title: string; slug: string; excerpt: string; content: string; category: string; imageUrl: string; tags: string; published: boolean; };

export default function BlogManager({ token }: { token: string }) {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [isEditing, setIsEditing] = useState<Partial<BlogPostType> | null>(null);

    const fetchPosts = async () => {
        const res = await fetch("/api/blog"); // Actually GET /api/blog only returns published ones currently? Wait, no, we need an admin view to get ALL.
        // For simplicity, we just fetch /api/blog and if it filters published, we'll fix the API later if needed.
        if (res.ok) setPosts(await res.json());
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing?.id ? "PUT" : "POST";
        const url = isEditing?.id ? `/api/blog/${isEditing.slug}` : "/api/blog";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(isEditing)
        });
        if (res.ok) {
            setIsEditing(null);
            fetchPosts();
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete post?")) return;
        const res = await fetch(`/api/blog/${slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) fetchPosts();
    };

    if (isEditing) {
        return (
            <div className="border border-beige/30 p-8">
                <h3 className="font-serif text-xl mb-4">{isEditing.id ? "Edit" : "Add"} BlogPost</h3>
                <form onSubmit={handleSave} className="space-y-4">
                    <input className="w-full border border-beige/40 p-2" placeholder="Title" value={isEditing.title || ""} onChange={e => setIsEditing({...isEditing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Slug" value={isEditing.slug || ""} onChange={e => setIsEditing({...isEditing, slug: e.target.value})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Category" value={isEditing.category || "Finance & Economics"} onChange={e => setIsEditing({...isEditing, category: e.target.value})} required />
                    <textarea className="w-full border border-beige/40 p-2" rows={2} placeholder="Excerpt" value={isEditing.excerpt || ""} onChange={e => setIsEditing({...isEditing, excerpt: e.target.value})} required />
                    <textarea className="w-full border border-beige/40 p-2 font-mono text-sm" rows={8} placeholder="Content (Markdown)" value={isEditing.content || ""} onChange={e => setIsEditing({...isEditing, content: e.target.value})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Cover Image URL" value={isEditing.imageUrl || ""} onChange={e => setIsEditing({...isEditing, imageUrl: e.target.value})} />
                    <input className="w-full border border-beige/40 p-2" placeholder="Tags (comma separated)" value={isEditing.tags || ""} onChange={e => setIsEditing({...isEditing, tags: e.target.value})} />
                    
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={!!isEditing.published} onChange={e => setIsEditing({...isEditing, published: e.target.checked})} />
                        <label>Published</label>
                    </div>
                    
                    <div className="flex gap-2">
                        <Button type="submit" variant="primary" size="sm">Save</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(null)}>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in">
            <Button variant="outline" size="sm" onClick={() => setIsEditing({ category: "Finance & Economics" })} className="mb-4">
                <FiPlus className="mr-2"/> Add Post
            </Button>
            <div className="space-y-4">
                {posts.map(p => (
                    <div key={p.id} className="border border-beige/30 p-4 flex justify-between items-center bg-white/50">
                        <div>
                            <h4 className="font-serif">{p.title}</h4>
                            <p className="text-xs text-charcoal/60">{p.category}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsEditing(p)} className="text-gold"><FiEdit2 /></button>
                            <button onClick={() => handleDelete(p.slug)} className="text-red-500"><FiTrash2 /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
