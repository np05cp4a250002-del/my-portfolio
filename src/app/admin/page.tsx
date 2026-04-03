"use client";

import { useState, FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { FiLogIn, FiSettings, FiBriefcase, FiFileText, FiBookOpen, FiMessageSquare, FiLogOut } from "react-icons/fi";

import SettingsManager from "./components/SettingsManager";
import ProjectsManager from "./components/ProjectsManager";
import ResumeManager from "./components/ResumeManager";
import BlogManager from "./components/BlogManager";
import MessagesManager from "./components/MessagesManager";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [activeTab, setActiveTab] = useState("settings");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                setIsAuthenticated(true);
            } else {
                setLoginError(data.error || "Login failed");
            }
        } catch {
            setLoginError("Connection error");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="page-transition pt-28">
                <div className="container-custom py-16 max-w-md mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-10">
                            <h1 className="font-serif text-3xl text-charcoal mb-2">Admin Access</h1>
                            <div className="w-12 h-[2px] bg-gold mx-auto mb-4" />
                            <p className="text-sm text-charcoal-light/50 font-light">Sign in to manage your portfolio content.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase text-charcoal-light/60 font-sans mb-2">Email</label>
                                <input type="email" required value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="w-full px-4 py-3 bg-transparent border border-beige/40 text-sm focus:border-gold" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-charcoal-light/60 font-sans mb-2">Password</label>
                                <input type="password" required value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="w-full px-4 py-3 bg-transparent border border-beige/40 text-sm focus:border-gold" />
                            </div>
                            {loginError && <p className="text-sm text-red-600/70">{loginError}</p>}
                            <Button type="submit" variant="primary" size="md" className="w-full"><FiLogIn className="mr-2" /> Sign In</Button>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "settings", label: "Pages", icon: FiSettings },
        { id: "projects", label: "Projects", icon: FiBriefcase },
        { id: "resume", label: "Resume", icon: FiFileText },
        { id: "blog", label: "Blog", icon: FiBookOpen },
        { id: "messages", label: "Messages", icon: FiMessageSquare },
    ];

    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <div className="flex justify-between items-end border-b border-beige/30 pb-6 mb-8">
                    <SectionHeading title="Admin Dashboard" subtitle="Manage website content directly." />
                    <button onClick={() => {setIsAuthenticated(false); setToken("");}} className="text-sm text-red-500 hover:underline flex items-center mb-4">
                        <FiLogOut className="mr-2"/> Logout
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 space-y-2 border-r border-beige/30 pr-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center px-4 py-3 text-left text-sm transition-all duration-300 ${activeTab === tab.id ? "bg-gold text-offwhite font-medium" : "text-charcoal/70 hover:bg-beige/20"}`}
                            >
                                <tab.icon className="mr-3 text-lg" /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {activeTab === "settings" && <SettingsManager token={token} />}
                        {activeTab === "projects" && <ProjectsManager token={token} />}
                        {activeTab === "resume" && <ResumeManager token={token} />}
                        {activeTab === "blog" && <BlogManager token={token} />}
                        {activeTab === "messages" && <MessagesManager token={token} />}
                    </div>
                </div>
            </section>
        </div>
    );
}
