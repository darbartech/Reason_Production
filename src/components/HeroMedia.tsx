"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HeroVideoSource = {
  src: string;
  type: string;
};

type Props = {
  poster: string;
  posterAlt: string;
  sources: HeroVideoSource[];
  caption: string;
  overlayText?: string;
};

export default function HeroMedia({ poster, posterAlt, sources, caption, overlayText }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!query.matches);
    const onChange = (event: MediaQueryListEvent) => setAnimate(!event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (animate) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [animate]);

  return (
    <div className="hero-media">
      <div className="hero-video-mask">
        {sources.length > 0 ? (
          <video
            ref={videoRef}
            className="hero-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
          >
            {sources.map(({ src, type }) => (
              <source key={src} src={src} type={type} />
            ))}
          </video>
        ) : (
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 88vw"
            className="hero-video hero-video--still"
          />
        )}
        <div className="hero-video-overlay" aria-hidden="true" />
        {overlayText && (
          <p className="hero-video-text">
            {overlayText}
          </p>
        )}
        <p className="hero-media-caption">{caption}</p>
      </div>
    </div>
  );
}
