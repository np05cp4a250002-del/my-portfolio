"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { FiSave } from "react-icons/fi";

export default function SettingsManager({ token }: { token: string }) {
    const [settings, setSettings] = useState<Record<string, string>>({
        homeHeroName: "",
        homeHeroLastName: "",
        homeHeroTagline: "",
        homeHeroDescription: "",
        homeProfilePhoto: "",
        aboutBio: "",
        aboutVisionBusiness: "",
        aboutVisionHealthcare: "",
        aboutPhoto: "",
        resumePdfUrl: "",
    });
    const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && typeof data === "object") {
                    setSettings((prev) => ({ ...prev, ...data }));
                }
            })
            .catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("saving");
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                setStatus("saved");
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const renderInput = (label: string, name: string, isTextarea = false) => (
        <div className="mb-4">
            <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                {label}
            </label>
            {isTextarea ? (
                <textarea
                    name={name}
                    value={settings[name] || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    value={settings[name] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                />
            )}
        </div>
    );

    return (
        <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-500">
            <div className="border border-beige/30 p-8">
                <h3 className="font-serif text-xl text-charcoal mb-6">Home Page Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderInput("Hero First Name", "homeHeroName")}
                    {renderInput("Hero Last Name", "homeHeroLastName")}
                    {renderInput("Tagline", "homeHeroTagline")}
                    {renderInput("Profile Photo URL", "homeProfilePhoto")}
                </div>
                {renderInput("Hero Description", "homeHeroDescription", true)}
            </div>

            <div className="border border-beige/30 p-8">
                <h3 className="font-serif text-xl text-charcoal mb-6">About Page Details</h3>
                <div className="grid grid-cols-1 gap-5">
                    {renderInput("About Profile Photo URL", "aboutPhoto")}
                    {renderInput("Main Biography", "aboutBio", true)}
                    {renderInput("Business & Finance Vision", "aboutVisionBusiness", true)}
                    {renderInput("Healthcare Entrepreneurship Vision", "aboutVisionHealthcare", true)}
                </div>
            </div>

            <div className="border border-beige/30 p-8">
                <h3 className="font-serif text-xl text-charcoal mb-6">Global Details</h3>
                {renderInput("Resume PDF URL", "resumePdfUrl")}
            </div>

            <Button type="submit" variant="primary" size="md" disabled={status === "saving"}>
                {status === "saving" ? "Saving..." : status === "saved" ? "✓ Saved!" : <><FiSave className="mr-2" /> Save Settings</>}
            </Button>
            {status === "error" && <p className="text-sm text-red-600/70 mt-2">Failed to save settings.</p>}
        </form>
    );
}
