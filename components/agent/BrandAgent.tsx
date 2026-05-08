"use client";

import { useState, useRef, useEffect } from "react";
import ColourSwatch from "@/components/ui/ColourSwatch";
import LemniscateAnimation from "@/components/agent/LemniscateAnimation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ColourItem = {
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  pantone?: string;
  role?: string;
};

type LogoItem = {
  name: string;
  file: string;
  usage?: string;
};

type FontVariant = {
  label: string;
  file: string;
};

type FontItem = {
  name: string;
  role?: string;
  variants: FontVariant[];
};

type IconItem = {
  file: string;
};

type VisualItem = {
  file: string;
  folder: "Backgrounds" | "Imagery";
};

type PhotoItem = {
  file: string;
};

type Segment =
  | { type: "text"; content: string }
  | { type: "colours"; items: ColourItem[] }
  | { type: "logos"; items: LogoItem[] }
  | { type: "fonts"; items: FontItem[] }
  | { type: "icons"; items: IconItem[] }
  | { type: "visuals"; items: VisualItem[] }
  | { type: "photos"; items: PhotoItem[] };

function parseContent(raw: string): Segment[] {
  const content = raw.replace(/\[BRAND_(?:COLOURS|LOGOS)\](?:(?!\[\/BRAND_)[\s\S])*$/, "").trim();

  const segments: Segment[] = [];
  const regex = /\[BRAND_(COLOURS|LOGOS|FONTS|ICONS|VISUALS|PHOTOS)\]([\s\S]*?)\[\/BRAND_(?:COLOURS|LOGOS|FONTS|ICONS|VISUALS|PHOTOS)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) segments.push({ type: "text", content: text });
    }
    try {
      const parsed = JSON.parse(match[2].trim());
      if (match[1] === "COLOURS") {
        segments.push({ type: "colours", items: parsed });
      } else if (match[1] === "LOGOS") {
        segments.push({ type: "logos", items: parsed });
      } else if (match[1] === "FONTS") {
        segments.push({ type: "fonts", items: parsed });
      } else if (match[1] === "ICONS") {
        segments.push({ type: "icons", items: parsed });
      } else if (match[1] === "VISUALS") {
        segments.push({ type: "visuals", items: parsed });
      } else if (match[1] === "PHOTOS") {
        segments.push({ type: "photos", items: parsed });
      }
    } catch {
      // skip malformed blocks
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const text = content.slice(lastIndex).trim();
    if (text) segments.push({ type: "text", content: text });
  }

  return segments.length > 0 ? segments : [{ type: "text", content: raw }];
}

function logoPreviewStyle(name: string): { className: string; style?: React.CSSProperties } {
  if (name.toLowerCase() === "white on dark") {
    return {
      className: "h-28 flex items-center justify-center px-6",
      style: { background: "#001D39" },
    };
  }
  return { className: "h-28 flex items-center justify-center px-6 bg-sand-light border-b border-black/5" };
}

function LogoCard({ item }: { item: LogoItem }) {
  const preview = logoPreviewStyle(item.name);
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
      <div className={preview.className} style={preview.style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.file} alt={item.name} className="max-h-10 w-auto" />
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-body font-medium text-dark-neutral text-sm">{item.name}</p>
          {item.usage && <p className="text-xs text-dark-neutral/50 font-body mt-0.5 leading-relaxed">{item.usage}</p>}
        </div>
        <a
          href={item.file}
          download
          className="shrink-0 px-3 py-1.5 rounded-lg bg-sea-blue-mid/8 text-sea-blue-mid text-xs font-body hover:bg-sea-blue-mid hover:text-white transition-all"
        >
          Download
        </a>
      </div>
    </div>
  );
}

function FontCard({ item }: { item: FontItem }) {
  const sampleText = "The quick brown fox";
  const fontFamily = item.name === "Inter" ? "Inter, sans-serif" : "'Martina Plantijn', Georgia, serif";

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
      <div className="px-6 py-8 border-b border-black/5 bg-sand-light">
        <p className="text-dark-neutral/30 text-[10px] uppercase tracking-widest font-body mb-2">{item.name}</p>
        <p className="text-dark-neutral text-3xl leading-tight" style={{ fontFamily }}>
          {sampleText}
        </p>
      </div>
      <div className="p-4">
        {item.role && <p className="text-xs text-dark-neutral/50 font-body mb-3">{item.role}</p>}
        <div className="flex flex-wrap gap-2">
          {item.variants.map((v) => (
            <a
              key={v.file}
              href={v.file}
              download
              className="px-3 py-1.5 rounded-lg bg-sea-blue-mid/8 text-sea-blue-mid text-xs font-body hover:bg-sea-blue-mid hover:text-white transition-all"
            >
              {v.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "");
}

function MessageContent({ content }: { content: string }) {
  const segments = parseContent(content);

  return (
    <div className="space-y-4">
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          return (
            <p key={i} className="text-sm leading-relaxed font-body whitespace-pre-wrap">
              {stripMarkdown(seg.content)}
            </p>
          );
        }
        if (seg.type === "colours") {
          return (
            <div key={i} className="grid grid-cols-2 gap-2">
              {seg.items.map((colour) => (
                <ColourSwatch
                  key={colour.hex}
                  name={colour.name}
                  hex={colour.hex}
                  rgb={colour.rgb}
                  cmyk={colour.cmyk}
                  pantone={colour.pantone}
                  role={colour.role}
                  size="medium"
                />
              ))}
            </div>
          );
        }
        if (seg.type === "logos") {
          return (
            <div key={i} className="grid grid-cols-1 gap-3">
              {seg.items.map((logo) => (
                <LogoCard key={logo.file} item={logo} />
              ))}
            </div>
          );
        }
        if (seg.type === "fonts") {
          return (
            <div key={i} className="grid grid-cols-1 gap-3">
              {seg.items.map((font) => (
                <FontCard key={font.name} item={font} />
              ))}
            </div>
          );
        }
        if (seg.type === "visuals") {
          return (
            <div key={i} className="grid grid-cols-2 gap-3">
              {seg.items.map((item) => {
                const webp = `/assets/images/${item.folder}/WebP/${item.file}.webp`;
                const png = `/assets/images/${item.folder}/PNG/${item.file}.png`;
                const name = item.file.replace(/_bg$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <div key={item.file} className="group relative rounded-xl overflow-hidden bg-sea-blue-dark" style={{ aspectRatio: "16/10" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={webp} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-sea-blue-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <span className="text-[10px] text-white/70 font-body">{name}</span>
                      <div className="flex gap-2 justify-end">
                        <a href={webp} download={`${item.file}.webp`} className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[11px] font-body hover:bg-white/35 transition-colors">WebP</a>
                        <a href={png} download={`${item.file}.png`} className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[11px] font-body hover:bg-white/35 transition-colors">PNG</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        if (seg.type === "photos") {
          return (
            <div key={i} className="grid grid-cols-3 gap-3">
              {seg.items.map((item) => {
                const webp = `/assets/Photos/WebP/${item.file}.webp`;
                const png = `/assets/Photos/PNG/${item.file}.png`;
                const label = item.file.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <div key={item.file} className="group relative rounded-xl overflow-hidden bg-sea-blue-dark" style={{ aspectRatio: "4/3" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={webp} alt={label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-sea-blue-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <span className="text-[10px] text-white/70 font-body">{label}</span>
                      <div className="flex gap-2 justify-end">
                        <a href={webp} download={`${item.file}.webp`} className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[11px] font-body hover:bg-white/35 transition-colors">WebP</a>
                        <a href={png} download={`${item.file}.png`} className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[11px] font-body hover:bg-white/35 transition-colors">PNG</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        if (seg.type === "icons") {
          return (
            <div key={i} className="flex flex-wrap gap-3">
              {seg.items.map((icon) => {
                const src = `/assets/icons/${encodeURIComponent(icon.file)}`;
                return (
                  <div key={icon.file} className="flex flex-col items-center gap-1.5">
                    <a
                      href={src}
                      download={icon.file}
                      className="w-16 h-16 rounded-xl bg-sea-blue-dark flex items-center justify-center hover:opacity-80 transition-opacity"
                      title={icon.file.replace(/\.svg$/, "").replace(/[-_]/g, " ")}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={icon.file} className="w-9 h-9 object-contain" />
                    </a>
                    <span className="text-[10px] font-body text-dark-neutral/50 text-center max-w-[64px] leading-tight">
                      {icon.file.replace(/^\d+\.\s*/, "").replace(/\.svg$/, "").replace(/[-_]/g, " ")}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function VerticalLine() {
  return <div className="w-px h-14 bg-dark-neutral/10 mx-auto my-8" />;
}

const INSPIRED_QUESTIONS = [
  "What are our brand colours and when should I use each?",
  "What fonts do we use and what are they each for?",
  "How should I use the Vouch logo correctly?",
  "What words and phrases should we avoid in our copy?",
  "How do we describe what Vouch does in one sentence?",
  "What is our brand voice and tone?",
  "Can you write an on-brand LinkedIn post about hiring?",
  "How does Ask Vouch work?",
  "How should photography be used in Vouch designs?",
  "What's Vouch's design philosophy?",
  "Can you help me write an on-brand email subject line?",
  "What tone should I use for a customer-facing message?",
  "How do we talk about our customers?",
  "What visual assets do we have available?",
  "Can you show me our logo variants?",
  "Who is Vouch built for?",
  "How should I write a product update announcement?",
  "What icons do we have and how do I download them?",
  "Can you review this copy and make it more on-brand?",
  "What backgrounds and imagery can I use in designs?",
];

export default function BrandAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastInspiredIndex = useRef<number>(-1);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    document.body.classList.add("agent-working");

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...next, assistantMsg]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      if (!res.body) throw new Error("No body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: accumulated }]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Sorry, I ran into an issue. Please try again." },
      ]);
    } finally {
      document.body.classList.remove("agent-working");
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const getInspired = () => {
    let index: number;
    do {
      index = Math.floor(Math.random() * INSPIRED_QUESTIONS.length);
    } while (index === lastInspiredIndex.current && INSPIRED_QUESTIONS.length > 1);
    lastInspiredIndex.current = index;
    setInput(INSPIRED_QUESTIONS[index]);
    inputRef.current?.focus();
  };

const inputField = (placeholder: string) => (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={loading}
        rows={1}
        className="w-full bg-transparent resize-none border-b border-dark-neutral/20 focus:border-sea-blue-mid focus:outline-none font-body text-sm text-dark-neutral placeholder:text-dark-neutral/30 py-3 pr-10 transition-colors overflow-hidden"
        style={{ lineHeight: "1.6" }}
      />
      <button
        type="submit"
        disabled={!input.trim() || loading}
        className="absolute right-0 bottom-3 text-dark-neutral/30 hover:text-sea-blue-mid disabled:opacity-30 transition-colors"
        aria-label="Send"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );

  return (
    <div
      className="flex flex-col h-full"
    >
      {isEmpty ? (

        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
          <div className="mb-10">
            <LemniscateAnimation className="w-[160px] sm:w-[220px]" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-sea-blue-dark text-center leading-tight mb-3">
            Ask Flow anything.
          </h1>
          <p className="font-body text-sm text-dark-neutral/40 text-center mb-12 max-w-xs leading-relaxed">
            Your guide to the Vouch brand.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            {inputField("Ask anything about the Vouch brand...")}
            <p className="mt-3 text-xs font-body text-dark-neutral/30">
              Stuck on what to ask?{" "}
              <button
                type="button"
                onClick={getInspired}
                className="text-dark-neutral/50 hover:text-sea-blue-mid transition-colors underline underline-offset-2"
              >
                Get inspired
              </button>
            </p>
          </form>
        </div>

      ) : (

        /* Conversation state */
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto px-8 pt-16 pb-8">
              {messages.map((msg, i) => {
                if (msg.role === "user") {
                  return (
                    <div key={i} className={i > 0 ? "mt-24" : ""}>
                      <h2 className="font-heading text-3xl md:text-4xl text-sea-blue-dark text-center leading-tight">
                        {msg.content}
                      </h2>
                    </div>
                  );
                }

                const isLast = i === messages.length - 1;

                return (
                  <div key={i}>
                    <VerticalLine />
                    {isLast && (
                      <div className="flex justify-center mb-8">
                        <LemniscateAnimation className="w-[120px] sm:w-[160px]" />
                      </div>
                    )}
                    {msg.content && (
                      <div className="text-dark-neutral">
                        <MessageContent content={msg.content} />
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Pinned bottom input */}
          <div className="border-t border-black/5 bg-sand-light/95 backdrop-blur-sm px-8 py-6">
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSubmit}>
                {inputField("Ask a follow-up...")}
              </form>
              <p className="mt-3 text-xs font-body text-dark-neutral/30">
                Stuck on what to ask?{" "}
                <button
                  onClick={getInspired}
                  className="text-dark-neutral/50 hover:text-sea-blue-mid transition-colors underline underline-offset-2"
                >
                  Get inspired
                </button>
              </p>
            </div>
          </div>
        </>

      )}
    </div>
  );
}
