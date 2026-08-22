"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ExternalLink, Play, Film } from "lucide-react";
import type { Project } from "@/data/projects";

/* ── Derive YouTube thumbnail URL from a watch URL ── */
function ytThumb(url: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault"): string | null {
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/${quality}.jpg` : null;
}

/* ── Video list panel (used for projects with multiple videos) ── */
function VideoList({ videos, id }: { videos: NonNullable<Project["videos"]>; id: string }) {
  return (
    <div id={id} className="mt-3 border border-[var(--border)] rounded-md overflow-hidden">
      {/* Panel header */}
      <div
        className="flex items-center gap-2 px-3.5 py-2 border-b border-[var(--border)]"
        style={{ background: "var(--bg2)" }}
      >
        <Film size={12} className="text-[var(--blue)]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
          Videos ({videos.length})
        </span>
      </div>

      {/* List */}
      <ul className="divide-y divide-[var(--border)]" style={{ background: "var(--surface)" }}>
        {videos.map((v) => (
          <li key={v.url}>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-[var(--bg2)] transition-colors group/video"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                  style={{ background: "var(--blue-bg)" }}
                >
                  <Play size={8} className="text-[var(--blue)]" style={{ fill: "var(--blue)" }} />
                </span>
                <span className="text-xs text-[var(--fg2)] truncate group-hover/video:text-[var(--blue)] transition-colors">
                  {v.title}
                </span>
              </div>
              <ArrowUpRight
                size={11}
                className="text-[var(--subtle)] shrink-0 group-hover/video:text-[var(--blue)] transition-colors"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main card ── */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showVideos, setShowVideos] = useState(false);
  const hasVideos = Boolean(project.videos && project.videos.length > 0);
  const panelId = `videos-${project.id}`;

  // Use explicit thumbnail, or auto-derive from first video URL
  const firstVideoUrl = project.videos?.[0]?.url;
  const initialThumb = project.thumbnail ?? (firstVideoUrl ? ytThumb(firstVideoUrl) : null);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumb);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="card group flex flex-col overflow-hidden"
    >
      {/* ── Thumbnail ── */}
      {thumbnailUrl && (
        <div
          className="relative w-full overflow-hidden border-b border-[var(--border)]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={thumbnailUrl}
            alt={`${project.title} — project thumbnail`}
            fill
            sizes="(min-width: 640px) 520px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => {
              // maxres is missing for some uploads; hq always exists.
              if (thumbnailUrl.includes("maxresdefault")) {
                setThumbnailUrl(thumbnailUrl.replace("maxresdefault", "hqdefault"));
              }
            }}
          />

          {/* Floating category + featured badges */}
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff", backdropFilter: "blur(4px)" }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: "rgba(37,99,235,0.9)", color: "#fff", backdropFilter: "blur(4px)" }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Video count pill */}
          {hasVideos && (
            <div
              className="absolute bottom-2.5 right-3 flex items-center gap-1 px-2 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff", backdropFilter: "blur(4px)" }}
            >
              <Film size={11} />
              <span className="text-[10px] font-semibold">{project.videos!.length} videos</span>
            </div>
          )}
        </div>
      )}

      {/* ── Card content ── */}
      <div className="flex flex-col p-6 flex-1">
        {/* Top row — hide category/featured badges if thumbnail already shows them */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {!thumbnailUrl && (
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--blue)]">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 border border-[var(--border)] text-[var(--muted)] rounded">
                    Featured
                  </span>
                )}
              </div>
            )}
            <h3 className="text-base font-semibold text-[var(--fg)] group-hover:text-[var(--blue)] transition-colors leading-snug">
              {project.title}
            </h3>
          </div>
          <span className="text-xs text-[var(--subtle)] shrink-0 pt-0.5">{project.year}</span>
        </div>

        {/* Role */}
        <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-3">{project.role}</p>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div
            className="space-y-1.5 mb-4 p-3.5 rounded-md border border-[var(--border2)]"
            style={{ background: "var(--bg2)" }}
          >
            {project.metrics.map((m) => (
              <div key={m} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                <TrendingUp size={11} className="text-[var(--green)] shrink-0 mt-0.5" />
                {m}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 border border-[var(--border)] text-[var(--muted)] rounded">
              {t}
            </span>
          ))}
        </div>

        {/* Video list toggle */}
        {hasVideos && (
          <div className="mb-4">
            <button
              onClick={() => setShowVideos(!showVideos)}
              aria-expanded={showVideos}
              aria-controls={panelId}
              className="flex items-center gap-2 text-xs font-semibold text-[var(--blue)] hover:underline transition-all"
            >
              <Film size={12} />
              {showVideos ? "Hide" : "Show"} all {project.videos!.length} videos
              <span className="text-[var(--subtle)] font-normal ml-0.5" aria-hidden>
                {showVideos ? "▲" : "▼"}
              </span>
            </button>

            {showVideos && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <VideoList videos={project.videos!} id={panelId} />
              </motion.div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--blue)] hover:underline"
            >
              <ExternalLink size={11} />
              {hasVideos ? "View Channel" : "View Project"}
              <span className="sr-only">for {project.title}</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--subtle)]">
              <ArrowUpRight size={11} /> Available on request
            </span>
          )}
          {project.client && <span className="text-xs text-[var(--subtle)]">{project.client}</span>}
        </div>
      </div>
    </motion.article>
  );
}
