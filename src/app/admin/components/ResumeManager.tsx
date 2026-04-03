"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

type RecordType = { id: string; title?: string; subtitle?: string; year?: string; description?: string; category?: string; items?: string; order?: number; };

export default function ResumeManager({ token }: { token: string }) {
    const [activeType, setActiveType] = useState<"education"|"experience"|"skills">("education");
    const [records, setRecords] = useState<RecordType[]>([]);
    const [isEditing, setIsEditing] = useState<Partial<RecordType> | null>(null);

    const fetchData = async (type: string) => {
        const res = await fetch(`/api/resume/${type}`);
        if (res.ok) setRecords(await res.json());
    };

    useEffect(() => { fetchData(activeType); setIsEditing(null); }, [activeType]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing?.id ? "PUT" : "POST";
        const url = isEditing?.id ? `/api/resume/${activeType}/${isEditing.id}` : `/api/resume/${activeType}`;
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(isEditing)
        });
        if (res.ok) {
            setIsEditing(null);
            fetchData(activeType);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        const res = await fetch(`/api/resume/${activeType}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) fetchData(activeType);
    };

    return (
        <div className="animate-in fade-in space-y-6">
            <div className="flex gap-4 border-b border-beige/30 pb-2">
                {(["education", "experience", "skills"] as const).map(t => (
                    <button key={t} onClick={() => setActiveType(t)} className={`pb-2 capitalize text-sm ${activeType === t ? 'border-b-2 border-gold font-medium' : 'text-charcoal/50'}`}>
                        {t}
                    </button>
                ))}
            </div>

            {isEditing ? (
                <div className="border border-beige/30 p-6 bg-[#faf9f6]">
                    <h4 className="font-serif text-lg mb-4">{isEditing.id ? "Edit" : "Add"} {activeType}</h4>
                    <form onSubmit={handleSave} className="space-y-4">
                        {activeType !== "skills" && (
                            <>
                                <input className="w-full border border-beige/40 p-2 text-sm" placeholder="Year" value={isEditing.year || ""} onChange={e => setIsEditing({...isEditing, year: e.target.value})} required/>
                                <input className="w-full border border-beige/40 p-2 text-sm" placeholder="Title" value={isEditing.title || ""} onChange={e => setIsEditing({...isEditing, title: e.target.value})} required/>
                                <input className="w-full border border-beige/40 p-2 text-sm" placeholder="Subtitle (Institution/Company)" value={isEditing.subtitle || ""} onChange={e => setIsEditing({...isEditing, subtitle: e.target.value})}/>
                                <textarea className="w-full border border-beige/40 p-2 text-sm" rows={3} placeholder="Description" value={isEditing.description || ""} onChange={e => setIsEditing({...isEditing, description: e.target.value})}/>
                            </>
                        )}
                        {activeType === "skills" && (
                            <>
                                <input className="w-full border border-beige/40 p-2 text-sm" placeholder="Category" value={isEditing.category || ""} onChange={e => setIsEditing({...isEditing, category: e.target.value})} required/>
                                <textarea className="w-full border border-beige/40 p-2 text-sm" rows={3} placeholder="Skills (comma separated)" value={isEditing.items || ""} onChange={e => setIsEditing({...isEditing, items: e.target.value})} required/>
                            </>
                        )}
                        <input type="number" className="w-full border border-beige/40 p-2 text-sm" placeholder="Order (0 = first)" value={isEditing.order || 0} onChange={e => setIsEditing({...isEditing, order: Number(e.target.value)})} />
                        
                        <div className="flex gap-2">
                            <Button type="submit" variant="primary" size="sm">Save</Button>
                            <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(null)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing({})}>
                        <FiPlus className="mr-2"/> Add New
                    </Button>
                    <div className="space-y-3 mt-4">
                        {records.map(r => (
                            <div key={r.id} className="border border-beige/30 p-4 flex justify-between items-center group">
                                <div>
                                    <h4 className="font-serif text-sm">{r.title || r.category}</h4>
                                    <p className="text-xs text-charcoal/60">{r.subtitle || r.items}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setIsEditing(r)} className="text-gold"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(r.id)} className="text-red-500"><FiTrash2 /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
