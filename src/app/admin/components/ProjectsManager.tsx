"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

type ProjectType = { id: string; title: string; slug: string; description: string; category: string; githubUrl: string; liveUrl: string; imageUrl: string; featured: boolean; };

export default function ProjectsManager({ token }: { token: string }) {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [isEditing, setIsEditing] = useState<Partial<ProjectType> | null>(null);

    const fetchProjects = async () => {
        const res = await fetch("/api/projects");
        if (res.ok) setProjects(await res.json());
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing?.id ? "PUT" : "POST";
        const url = isEditing?.id ? `/api/projects/${isEditing.id}` : "/api/projects";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(isEditing)
        });
        if (res.ok) {
            setIsEditing(null);
            fetchProjects();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) fetchProjects();
    };

    if (isEditing) {
        return (
            <div className="border border-beige/30 p-8">
                <h3 className="font-serif text-xl mb-4">{isEditing.id ? "Edit" : "Add"} Project</h3>
                <form onSubmit={handleSave} className="space-y-4">
                    <input className="w-full border border-beige/40 p-2" placeholder="Title" value={isEditing.title || ""} onChange={e => setIsEditing({...isEditing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Slug" value={isEditing.slug || ""} onChange={e => setIsEditing({...isEditing, slug: e.target.value})} required />
                    <textarea className="w-full border border-beige/40 p-2" rows={3} placeholder="Description" value={isEditing.description || ""} onChange={e => setIsEditing({...isEditing, description: e.target.value})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Category" value={isEditing.category || ""} onChange={e => setIsEditing({...isEditing, category: e.target.value})} required />
                    <input className="w-full border border-beige/40 p-2" placeholder="Image URL (e.g. /ayuraksha.jpg)" value={isEditing.imageUrl || ""} onChange={e => setIsEditing({...isEditing, imageUrl: e.target.value})} />
                    <input className="w-full border border-beige/40 p-2" placeholder="GitHub URL" value={isEditing.githubUrl || ""} onChange={e => setIsEditing({...isEditing, githubUrl: e.target.value})} />
                    <input className="w-full border border-beige/40 p-2" placeholder="Live URL" value={isEditing.liveUrl || ""} onChange={e => setIsEditing({...isEditing, liveUrl: e.target.value})} />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={!!isEditing.featured} onChange={e => setIsEditing({...isEditing, featured: e.target.checked})} />
                        <label>Featured</label>
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
            <Button variant="outline" size="sm" onClick={() => setIsEditing({})} className="mb-4">
                <FiPlus className="mr-2"/> Add Project
            </Button>
            <div className="space-y-4">
                {projects.map(p => (
                    <div key={p.id} className="border border-beige/30 p-4 flex justify-between items-center group bg-white/50">
                        <div>
                            <h4 className="font-serif">{p.title}</h4>
                            <p className="text-xs text-charcoal-light/60">{p.category} • {p.featured ? "Featured" : ""}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsEditing(p)} className="text-gold hover:text-charcoal"><FiEdit2 /></button>
                            <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
