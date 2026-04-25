// client/src/components/WeedSmokerPassSection.jsx
import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function WeedPassSection() {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };

    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={wrapRef} className="wsp-wrap">

      {/* BACKGROUND */}
      <div className="wsp-bg-gradient" />
      <div className="wsp-bg-grid" />
      <div className="wsp-bg-noise" />

      <div className="wsp-container">

        {/* TITLE */}
        <motion.h2
          className="wsp-title"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          WS | Connection <br />
          <span>Pass</span>
        </motion.h2>

        {/* TEXT (ORIGINAL PRESERVED) */}
        <motion.div
          className="wsp-text"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={!prefersReducedMotion ? { y: [0, -6, 0, 6, 0] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <p>
            Liberdade total com Weed Smoker Pass: THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds), médicos, fornecedores. Vida leve, saudável e cura garantida! E sim… os caras conseguiram colocar tudo isso num software. Dá pra acreditar? 😂
          </p>

          <p>
            Assina e destrava: acesso direto aos médicos prescritores que liberam sua receita de Cannabis medicinal! 🍃 Sem stress, sem enrolação — insônia, ansiedade, dores crônicas, TDAH, TEA, epilepsia, depressão e outras condições reconhecidas pela ANVISA. Weed Smokers Connection: Tudo que você precisa saber, sem complicação. 💨
          </p>

          <p>
            Dentro da plataforma é mamão com açúcar: você segue o passo a passo para conseguir sua autorização, separa os documentos e pronto. Ainda tem contato direto com fornecedores confiáveis de espécies e extrações top de linha com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e outros canabinoides — tanto nacionais quanto importados, e eles entregam rápido, sem enrolação. Ou seja: menos burocracia, mais vantagem e mais liberdade pra você.
          </p>

          <p>
            Tá fácil: joga sua receita e as notas fiscais lá no perfil e pronto. O Weed Smoker Pass te dá a liberdade que você sempre quis — pode curtir seus produtos sem dor de cabeça, com segurança e na legalidade. E o melhor: você ainda tem acesso a um catálogo só com coisa boa, especialmente selecionada pra sua cura, disponível pra comprar sem enrolação, além dos fornecedores que sabem indicar médicos de confiança. Ou seja… menos burocracia, mais liberdade. 🍃
          </p>
        </motion.div>

        {/* CTA ORIGINAL */}
        <button
          className="wsp-cta"
          onClick={() =>
            (window.location.href =
              "https://weedsmokersconnection.com/signup")
          }
        >
          Quero meu Pass
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginLeft: 10 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>

      <style>{`

      .wsp-wrap {
        position: relative;
        width: 100%;
        padding: 72px 20px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        background: #02050a;
        --mx: 50%;
        --my: 50%;
      }

      .wsp-bg-gradient {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(0,255,180,0.08), transparent 40%),
          radial-gradient(circle at 80% 60%, rgba(0,200,255,0.08), transparent 50%),
          linear-gradient(180deg, #02050a, #010308);
      }

      .wsp-bg-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0,255,200,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,200,0.05) 1px, transparent 1px);
        background-size: 48px 48px;
        opacity: 0.1;
        animation: gridFloat 30s ease-in-out infinite alternate;
      }

      @keyframes gridFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-30px); }
      }

      .wsp-bg-noise {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 3px 3px;
        opacity: 0.2;
      }

      .wsp-container {
        position: relative;
        z-index: 2;
        max-width: 680px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .wsp-title {
        font-size: clamp(36px, 5.5vw, 60px);
        font-weight: 900;
        line-height: 0.9;
        color: #eafff7;
        letter-spacing: -0.04em;
      }

      .wsp-title span {
        background: linear-gradient(90deg, #00ffc3, #00cfff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .wsp-text {
        display: flex;
        flex-direction: column;
        gap: 18px;
        font-size: 15px;
        line-height: 1.7;
        color: #d8fff6;
        max-width: 460px;
        text-align: justify;
      }

      .wsp-cta {
        width: 100%;
        margin-top: 12px;
        padding: 16px;
        border-radius: 14px;
        border: none;
        background: linear-gradient(90deg, #00ffc3, #00cfff);
        color: #002;
        font-weight: 700;
        letter-spacing: 0.03em;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all .2s ease;
      }

      .wsp-cta::before {
        content: '';
        position: absolute;
        left: var(--mx);
        top: var(--my);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%);
        opacity: 0;
        transition: width .25s ease, height .25s ease, opacity .25s ease;
      }

      .wsp-cta:hover::before {
        width: 200px;
        height: 200px;
        opacity: 1;
      }

      .wsp-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(0,255,200,0.25);
      }

      `}</style>
    </section>
  );
}