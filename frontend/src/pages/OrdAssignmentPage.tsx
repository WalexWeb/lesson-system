import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Session } from "../types/session";
import {
  MagnifyingGlassIcon,
  FingerPrintIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  CameraIcon,
  LockClosedIcon,
  EyeIcon,
  KeyIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

export const OrdAssignmentPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    api
      .get<Session | null>("/session")
      .then((res) => setSession(res.data || null))
      .catch(() => setLoadError("Не удалось получить данные сессии."));
  }, []);

  const text = session?.assignmentText?.trim() ?? "";
  const hasText = text.length > 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0c10] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(180,83,9,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_70%,rgba(251,191,36,0.08),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251,191,36,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251,191,36,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full bg-amber-700/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[100px]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 animate-ord-pulse-glow bg-[radial-gradient(circle_at_30%_80%,rgba(234,179,8,0.08),transparent_45%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent shadow-[0_0_24px_rgba(251,191,36,0.35)] animate-ord-scan"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <MagnifyingGlassIcon className="absolute left-[6%] top-[18%] h-16 w-16 text-amber-500/25 animate-ord-float drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]" />
        <FingerPrintIcon className="absolute right-[10%] top-[12%] h-20 w-20 text-amber-600/20 animate-ord-float-slow" />
        <DocumentMagnifyingGlassIcon className="absolute left-[12%] bottom-[22%] h-14 w-14 text-amber-400/22 animate-ord-drift" />
        <ShieldCheckIcon className="absolute right-[18%] bottom-[16%] h-[4.5rem] w-[4.5rem] text-amber-500/18 animate-ord-float" />
        <CameraIcon className="absolute left-[42%] top-[8%] h-11 w-11 text-amber-500/15 animate-ord-float-slow" />
        <LockClosedIcon className="absolute right-[38%] bottom-[10%] h-12 w-12 text-amber-600/20 animate-ord-drift" />
        {/* Новые иконки для большей детализации */}
        <EyeIcon className="absolute left-[28%] top-[35%] h-10 w-10 text-amber-400/20 animate-ord-float-slow" />
        <KeyIcon className="absolute right-[25%] top-[40%] h-12 w-12 text-amber-500/18 animate-ord-float" />
        <ScaleIcon className="absolute left-[15%] bottom-[40%] h-14 w-14 text-amber-600/15 animate-ord-drift" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-12 sm:px-6">
        <header className="mb-8 text-center">
          <p className="mb-2 text-base font-semibold uppercase tracking-[0.35em] text-amber-500/90">
            учебный материал
          </p>
          {/* Увеличенный заголовок */}
          <h1 className="text-5xl font-bold tracking-tight text-amber-100">
            Оперативно-розыскная деятельность
          </h1>
          {session?.title && (
            <p className="mt-3 text-lg text-slate-400 sm:text-lg">
              {session.title}
            </p>
          )}
        </header>

        <div className="flex-1">
          {loadError && (
            <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-5 py-4 text-center text-sm text-red-200">
              {loadError}
            </div>
          )}

          {!loadError && !session && (
            <div className="rounded-2xl border border-slate-600/50 bg-slate-900/60 px-6 py-10 text-center text-slate-400 backdrop-blur-sm">
              Сессия ещё не запущена преподавателем.
            </div>
          )}

          {!loadError && session && !hasText && (
            <div className="rounded-2xl border border-amber-500/25 bg-slate-900/70 px-6 py-10 text-center text-slate-400 backdrop-blur-md">
              Текст задания пока не опубликован. Преподаватель может ввести его
              в панели управления.
            </div>
          )}

          {!loadError && session && hasText && (
            <article className="rounded-2xl border border-amber-500/35 bg-slate-950/75 px-6 py-8 shadow-[0_0_60px_-12px_rgba(245,158,11,0.25)] backdrop-blur-md sm:px-10 sm:py-10">
              <div className="mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-4">
                <DocumentMagnifyingGlassIcon className="h-6 w-6 shrink-0 text-amber-500/90" />
                <span className="text-lg font-medium uppercase tracking-wide text-amber-200/90">
                  Задание
                </span>
              </div>
              <div className="whitespace-pre-wrap text-xl leading-relaxed text-slate-200">
                {text}
              </div>
            </article>
          )}
        </div>

        <footer className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <Link
            to="/teacher"
            className="rounded-lg px-3 py-1.5 text-amber-500/90 underline-offset-4 transition hover:text-amber-400 hover:underline"
          >
            Панель преподавателя
          </Link>
        </footer>
      </div>
    </div>
  );
};
