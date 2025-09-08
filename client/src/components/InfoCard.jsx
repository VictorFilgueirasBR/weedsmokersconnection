import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export default function ExtractInfoCard() {
  const cardRef = useRef(null);
  const [openSection, setOpenSection] = useState("cbd");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-100, 100], [12, -12]);
  const rotateX = useTransform(mouseY, [-100, 100], [-12, 12]);
  const scale = useTransform(mouseY, [-100, 100], [1.02, 0.98]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const nx = (x / (rect.width / 2)) * 100;
      const ny = (y / (rect.height / 2)) * 100;
      mouseX.set(nx);
      mouseY.set(ny);
    }

    function handleLeave() {
      mouseX.set(0);
      mouseY.set(0);
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  const sectionToggle = (key) => {
    setOpenSection((prev) => (prev === key ? "" : key));
  };

  const cbdText = `As extrações de CBD (canabidiol) são processos químicos...`;
  const thcText = `As extrações de THC são processos utilizados...`;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-emerald-800 via-black to-black">
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="max-w-3xl w-full bg-black/70 backdrop-blur-md border border-slate-700/60 shadow-2xl rounded-2xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">Métodos de Extração</h3>
            <p className="mt-1 text-sm text-gray-300">CBD & THC — visão geral dos métodos mais comuns</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSection("cbd")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-shadow shadow-sm focus:outline-none ${openSection === "cbd" ? "bg-emerald-600 text-white" : "bg-white/10 text-gray-200"}`}
            >
              CBD
            </button>
            <button
              onClick={() => setOpenSection("thc")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-shadow shadow-sm focus:outline-none ${openSection === "thc" ? "bg-rose-600 text-white" : "bg-white/10 text-gray-200"}`}
            >
              THC
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: openSection === "cbd" ? 1 : 0.7, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className={`relative rounded-xl p-4 border ${openSection === "cbd" ? "border-emerald-400 bg-emerald-700/40" : "border-slate-600 bg-black/40"}`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white">Extração de CBD</h4>
              <button
                onClick={() => sectionToggle("cbd")}
                className="text-sm text-gray-300 hover:text-white"
              >
                {openSection === "cbd" ? "Fechar" : "Abrir"}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {openSection === "cbd" && (
                <motion.div
                  key="cbd"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 text-sm text-gray-100 overflow-hidden"
                >
                  <p className="whitespace-pre-wrap">{cbdText}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: openSection === "thc" ? 1 : 0.7, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className={`relative rounded-xl p-4 border ${openSection === "thc" ? "border-rose-400 bg-rose-700/40" : "border-slate-600 bg-black/40"}`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white">Extração de THC</h4>
              <button
                onClick={() => sectionToggle("thc")}
                className="text-sm text-gray-300 hover:text-white"
              >
                {openSection === "thc" ? "Fechar" : "Abrir"}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {openSection === "thc" && (
                <motion.div
                  key="thc"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 text-sm text-gray-100 overflow-hidden"
                >
                  <p className="whitespace-pre-wrap">{thcText}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mt-6 text-xs text-gray-400"
        >
          <p>Observação: o componente apresenta apenas informação descritiva. Procedimentos práticos e manipulação de solventes exigem normas técnicas, ambientes controlados e profissionais qualificados.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
