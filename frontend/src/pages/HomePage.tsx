import React from "react";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  UserCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const cards: {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}[] = [
  {
    to: "/teacher",
    title: "Преподаватель",
    description: "Запуск сессии, задание, работа с ответами студентов.",
    icon: AcademicCapIcon,
    accent:
      "border-emerald-400/35 bg-emerald-950/25 text-emerald-200 hover:border-emerald-300/50 hover:bg-emerald-900/30",
  },
  {
    to: "/student",
    title: "Студент",
    description: "Скачать материалы и отправить выполненное задание.",
    icon: UserCircleIcon,
    accent:
      "border-sky-400/35 bg-sky-950/25 text-sky-200 hover:border-sky-300/50 hover:bg-sky-900/30",
  },
  {
    to: "/ord",
    title: "Проектор",
    description: "Экран задания: НОН, ИТК, интернет-среда.",
    icon: GlobeAltIcon,
    accent:
      "border-cyan-400/35 bg-cyan-950/30 text-cyan-100 hover:border-cyan-300/50 hover:bg-cyan-900/35",
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(16,185,129,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-14 sm:max-w-xl">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            lesson-system
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Учебная система
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Выберите раздел для перехода.
          </p>
        </header>

        <nav className="flex flex-col gap-4" aria-label="Основная навигация">
          {cards.map(({ to, title, description, icon: Icon, accent }) => (
            <Link
              key={to}
              to={to}
              className={`group flex items-start gap-4 rounded-2xl border px-5 py-5 shadow-lg shadow-black/20 backdrop-blur-sm transition ${accent}`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-current">
                <Icon className="h-7 w-7 opacity-90" aria-hidden />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-lg font-semibold text-white">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-slate-300/90 group-hover:text-slate-200">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
