import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Componente React totalmente inline (JS + styles no mesmo arquivo)
// - Background da página: /images/wscslid11.webp
// - Glassmorphism quase transparente
// - Animação de flutuação no eixo Y (loop)
// - Gamificado: pontos, badges, progress bar
// - Paginação (3 páginas) com transições animadas

const PAGES = [
  {
    id: 0,
    title: "📜 Contexto histórico",
    content: `O uso medicinal das flores de cannabis não é novidade. Civilizações antigas já utilizavam a planta como ferramenta de cura:\n\n• China Antiga (aprox. 2.700 a.C.): registros do imperador Shen Nung descrevem a cannabis como remédio para dores, reumatismo e até malária.\n\n• Índia: o bhang, preparado com flores em natura, era usado em rituais espirituais e medicinais, associado à purificação do corpo e alívio de sofrimentos.\n\n• Oriente Médio: médicos árabes medievais prescreviam flores de cannabis para dores crônicas, inflamações e epilepsia.\n\n• Ocidente: no século XIX, a cannabis entrou nas farmacopeias da Europa e EUA, sendo usada como analgésico e sedativo natural.\n\nOu seja, o consumo terapêutico das flores em natura tem raízes profundas, ligando medicina, espiritualidade e cultura.`,
  },
  {
    id: 1,
    title: "🌱 Consumo em forma in natura",
    content: `Quando falamos em flores de cannabis in natura, falamos da planta em sua forma mais pura, preservando canabinoides (como o THC e o CBD) e terpenos, que potencializam os efeitos através do chamado efeito entourage.\n\nAs flores podem ser administradas de diferentes formas:\n\n• Vaporização: método seguro, sem combustão, liberando compostos ativos sem produzir substâncias tóxicas.\n\n• Infusões ou óleos artesanais: prática antiga, ainda usada em culturas tradicionais.\n\n• Uso inalatório medicinal controlado: indicado em alguns tratamentos, sempre sob supervisão médica.`,
  },
  {
    id: 2,
    title: "💊 Benefícios terapêuticos & 🌍 Cultura",
    content: `O THC presente nas flores em natura tem sido estudado e aplicado no alívio de:\n\n• Dor crônica e neuropática\n• Espasmos musculares (ex.: esclerose múltipla)\n• Náuseas e vômitos induzidos por quimioterapia\n• Distúrbios do sono\n• Estímulo do apetite em pacientes com HIV ou câncer\n\nA combinação de THC com outros canabinoides e terpenos pode oferecer um tratamento mais holístico, diferente das formulações sintéticas isoladas.\n\nCultura e terapia lado a lado: o consumo medicinal das flores também traz um aspecto cultural: é a reconexão com práticas ancestrais de cura natural, unindo passado cultural ao presente médico-terapêutico.\n\nEm resumo: o uso das flores em natura de cannabis com THC não é apenas uma terapia moderna, mas a retomada de um caminho histórico, cultural e medicinal que vem atravessando civilizações.`,
  },
];

const floatVariants = {
  float: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const pageTransition = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.4 } },
};

export default function GamifiedFlowersCard() {
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState([]); // track which sections the user "read"
  const [badges, setBadges] = useState([]);

  // award points once per page when user expands/reads
  useEffect(() => {
    // create badge when score hits thresholds
    if (score >= 10 && !badges.includes("Reader")) setBadges((b) => [...b, "Reader"]);
    if (score >= 20 && !badges.includes("Scholar")) setBadges((b) => [...b, "Scholar"]);
    if (score >= 35 && !badges.includes("Historian")) setBadges((b) => [...b, "Historian"]);
  }, [score, badges]);

  const onReadPage = (pageId) => {
    if (!unlocked.includes(pageId)) {
      setUnlocked((u) => [...u, pageId]);
      // points: each page read = 12 points
      setScore((s) => s + 12);
    }
  };

  const next = () => {
    if (page < PAGES.length - 1) setPage((p) => p + 1);
  };
  const prev = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  const percentage = Math.round(((page + (unlocked.includes(page) ? 1 : 0)) / PAGES.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url('/images/wscslid11.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: 20,
      fontFamily: "Inter, Arial, sans-serif",
    }}>

      {/* Inline styles keyframes para partículas simples */}
      <style>{`
        @keyframes pulseBadge { 0% { transform: scale(1) } 50% { transform: scale(1.06) } 100% { transform: scale(1) } }
        .small-dot { width:8px; height:8px; border-radius:50%; position:absolute; opacity:0.9 }
        .dot-1 { background: rgba(255,255,255,0.6); left:10%; top:12%; animation: floaty 6s ease-in-out infinite }
        .dot-2 { background: rgba(0,0,0,0.08); left:80%; top:20%; animation: floaty 5.5s ease-in-out infinite }
        @keyframes floaty { 0% { transform: translateY(0) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0) } }
      `}</style>

      <motion.div
        variants={floatVariants}
        animate="float"
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 20,
          padding: 24,
          background: "rgba(255,255,255,0.06)", // quase transparente
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          position: "relative",
          color: "#000",
        }}
        whileHover={{ translateY: -4 }}
      >
        {/* pequenas partículas (decorativas) */}
        <div className="small-dot dot-1" />
        <div className="small-dot dot-2" />

        {/* Top bar gamificada */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ fontWeight: 700, fontSize: 18 }}
            >Flores Medicinais</motion.div>

            <div style={{ fontSize: 13, padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Level: <strong style={{ marginLeft: 6 }}>{Math.min(1 + Math.floor(score / 15), 5)}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>Pontos</div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{score}</div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {badges.map((b, i) => (
                <motion.div key={b}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.15 * i } }}
                  style={{ padding: "6px 8px", borderRadius: 8, background: "rgba(255,255,255,0.12)", fontSize: 12, fontWeight: 700 }}
                >{b}</motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 10, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden', marginBottom: 18 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, rgba(138,201,38,1) 0%, rgba(53,179,121,1) 100%)' }}
          />
        </div>

        {/* Paginação + conteúdo */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Left column: controls */}
          <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Página</div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{page + 1} / {PAGES.length}</div>
            </div>

            <button onClick={prev} disabled={page === 0}
              style={{ padding: '10px 12px', borderRadius: 10, border: 'none', cursor: page === 0 ? 'not-allowed' : 'pointer', background: page === 0 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)' }}>
              ← Anterior
            </button>

            <button onClick={next} disabled={page === PAGES.length - 1}
              style={{ padding: '10px 12px', borderRadius: 10, border: 'none', cursor: page === PAGES.length - 1 ? 'not-allowed' : 'pointer', background: page === PAGES.length - 1 ? 'rgba(0,0,0,0.06)' : 'linear-gradient(90deg,#8ac926,#35b379)' }}>
              Próxima →
            </button>

            <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.02)', fontSize: 13 }}>
              Dica: clique em "Marcar como lido" para ganhar pontos.
            </div>

            <button onClick={() => onReadPage(page)} style={{ marginTop: 'auto', padding: '10px 12px', borderRadius: 10, border: 'none', background: 'rgba(138,201,38,0.14)', cursor: 'pointer' }}>
              Marcar como lido ✅
            </button>
          </div>

          {/* Right column: page content (animado) */}
          <div style={{ flex: 1 }}>
            <AnimatePresence exitBeforeEnter>
              <motion.div key={page} variants={pageTransition} initial="initial" animate="animate" exit="exit" style={{ background: 'transparent' }}>
                <h2 style={{ marginTop: 0, marginBottom: 12 }}>{PAGES[page].title}</h2>
                <div style={{ whiteSpace: 'pre-line', fontSize: 15, lineHeight: 1.6, color: '#000' }}>{PAGES[page].content}</div>

                {/* Quick interactions gamificadas */}
                <div style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'center' }}>
                  <button onClick={() => {
                    // small microinteraction: like (gives 3 points)
                    setScore((s) => s + 3);
                  }} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.12)', cursor: 'pointer' }}>Gostei ❤️ (+3)</button>

                  <button onClick={() => {
                    // bookmark (adds badge)
                    if (!badges.includes('Saved')) setBadges((b) => [...b, 'Saved']);
                  }} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: badges.includes('Saved') ? 'rgba(138,201,38,0.14)' : 'rgba(255,255,255,0.06)', cursor: 'pointer' }}>Salvar</button>

                  <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(0,0,0,0.6)' }}>Progresso: {percentage}%</div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* footer notas */}
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Informação com caráter educacional. Consulte um profissional de saúde.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {unlocked.map(u => (
              <motion.div key={u} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 12 }}>✓ Página {u+1}</motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
