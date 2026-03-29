import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Session } from "../types/session";
// Для иконок используем Heroicons (установите @heroicons/react)
import {
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export const StudentPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [studentName, setStudentName] = useState("");
  const [group, setGroup] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get<Session | null>("/session")
      .then((res) => setSession(res.data || null))
      .catch(() => {
        setError("Сессия ещё не запущена преподавателем.");
      });
  }, []);

  const handleDownloadAssignment = () => {
    window.location.href =
      api.defaults.baseURL!.replace(/\/api$/, "") + "/api/assignment";
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const fileInput = (e.currentTarget.elements.namedItem("file") ??
      null) as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (!file) {
      setError("Выберите файл с решением.");
      return;
    }
    if (!studentName || !group) {
      setError("Укажите ФИО и группу.");
      return;
    }
    setSending(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("studentName", studentName);
      form.append("group", group);
      const res = await fetch(
        api.defaults.baseURL!.replace(/\/api$/, "") + "/api/submit",
        {
          method: "POST",
          body: form,
        },
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      await res.json();
      setSuccess("Файл отправлен преподавателю.");
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      setError(err?.message || "Ошибка отправки файла");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 transition-all duration-300 hover:shadow-emerald-500/10">
        {/* Заголовок с иконкой */}
        <div className="flex items-center gap-3 mb-6">
          <AcademicCapIcon className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Лаборатория ОРД
          </h1>
        </div>

        {/* Статус сессии */}
        {session ? (
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              Занятие: <strong>{session.title}</strong>
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-slate-400"></span>
            </span>
            Ожидание запуска сессии преподавателем…
          </div>
        )}

        {/* Сообщения об ошибках и успехе */}
        {error && (
          <div className="flex items-center gap-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 rounded-xl mb-6">
            <XCircleIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-xl mb-6">
            <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{success}</span>
          </div>
        )}

        {/* Кнопка скачивания задания */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={handleDownloadAssignment}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-700 active:scale-[0.98] sm:w-auto"
          >
            <DocumentArrowDownIcon className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            <span>Скачать файл задания</span>
          </button>
        </div>

        {/* Форма отправки */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              ФИО
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-5 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              placeholder="Иванов Иван Иванович"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Группа
            </label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full px-5 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              placeholder="П-31"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Файл с решением
            </label>
            <div className="relative">
              <input
                type="file"
                name="file"
                className="w-full px-5 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 transition-all duration-200 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Отправка...</span>
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Отправить преподавателю</span>
              </>
            )}
          </button>
        </form>

        {/* Подпись */}
        <div className="mt-8 text-center text-sm text-slate-500">
          Практическое занятие · ОРД
        </div>
      </div>
    </div>
  );
};
