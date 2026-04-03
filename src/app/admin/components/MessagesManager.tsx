"use client";
import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import { FiMessageSquare, FiRefreshCw, FiTrash2 } from "react-icons/fi";

type MessageType = { id: string; name: string; email: string; message: string; createdAt: string; };

export default function MessagesManager({ token }: { token: string }) {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/messages", { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (res.ok) setMessages(data.messages || []);
        } catch {} finally { setIsLoading(false); }
    }, [token]);

    useEffect(() => { fetchMessages(); }, [fetchMessages]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete message?")) return;
        try {
            const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) fetchMessages();
        } catch (e) { alert("Failed to delete"); }
    };

    return (
        <div className="border border-beige/30 p-8 md:p-10 animate-in fade-in">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <FiMessageSquare className="text-gold" />
                    <h3 className="font-serif text-xl text-charcoal">Messages</h3>
                </div>
                <Button variant="outline" size="sm" onClick={fetchMessages} disabled={isLoading}>
                    <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                </Button>
            </div>
            <div className="space-y-4">
                {messages.length === 0 && !isLoading && <p className="text-charcoal-light/60 text-sm">No messages.</p>}
                {messages.map((msg) => (
                    <div key={msg.id} className="border border-beige/20 p-5 bg-[#faf9f6]/30 relative group">
                        <button onClick={() => handleDelete(msg.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><FiTrash2 /></button>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2 pr-8">
                            <div>
                                <h4 className="font-medium text-charcoal">{msg.name}</h4>
                                <a href={`mailto:${msg.email}`} className="text-sm text-gold hover:underline">{msg.email}</a>
                            </div>
                            <span className="text-xs text-charcoal-light/50 font-mono">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-charcoal/80 font-sans whitespace-pre-wrap">{msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
