"use client";

import { useState } from "react";

export default function GeneratorForm() {
    const [topic, setTopic] = useState("");
    const [contentType, setContentType] = useState("blog_outline");
    const [tone, setTone] = useState("professional");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!topic || loading) return;

        setLoading(true);
        setResult("");

        try {
            const response = await fetch("http://localhost:8000/api/generate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic,
                    content_type: contentType,
                    tone: tone,
                }),
            });

            console.log("status: ", response.status)

            const data = await response.json();
            console.log("Response data: ", data)
            if (!response.ok) {
                throw new Error("Backend error");
            }
            setResult(data.generated_text);
        } catch (error) {
            console.error("FULL ERROR:", error);
            alert("Error generating content.");
        }

        setLoading(false);
    };

    return (
        <div className="w-full space-y-6">

            {/* Input Form Panel */}
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col gap-6 transition-all duration-300 hover:shadow-purple-500/10">

                {/* Settings Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm text-slate-400 font-medium px-1">Content Type</label>
                        <div className="relative">
                            <select
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value)}
                                className="w-full bg-slate-800/50 text-white border border-slate-700/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 appearance-none"
                            >
                                <option value="blog_outline">Blog Outline</option>
                                <option value="essay">Essay</option>
                                <option value="social_post">Social Media Post</option>
                                <option value="product_desc">Product Description</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-sm text-slate-400 font-medium px-1">Tone</label>
                        <div className="relative">
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-slate-800/50 text-white border border-slate-700/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 appearance-none"
                            >
                                <option value="professional">Professional</option>
                                <option value="casual">Casual</option>
                                <option value="humorous">Humorous</option>
                                <option value="persuasive">Persuasive</option>
                                <option value="inspirational">Inspirational</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Topic Input Row */}
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="relative flex-1 w-full space-y-2">
                        <label className="text-sm text-slate-400 font-medium px-1">Topic / Subject</label>
                        <input
                            type="text"
                            id="topic"
                            placeholder="What should we write about today? (e.g. AI in Healthcare)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700/50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!topic || loading}
                        className="w-full md:w-auto relative group overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {/* Button Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-105" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Button Content */}
                        <div className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8   0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Generate</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </form>

            {/* Loading Skeletal State (Optional purely decorative Pulse Glow animation anchor) */}
            {loading && (
                <div className="w-24 h-2 mx-auto rounded-full bg-purple-500/50 animate-pulse-glow" />
            )}

            {/* Result Panel */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                    <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
                        {/* Soft decorative glow behind the content */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                                <h2 className="text-xl font-semibold text-slate-100">
                                    Your Generated Content
                                </h2>
                            </div>

                            <div className="prose prose-invert prose-purple max-w-none">
                                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-sm sm:text-base border-l border-slate-700/50 pl-4 sm:pl-6 py-2">
                                    {result}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => navigator.clipboard.writeText(result)}
                                    className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Content
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}