// src/components/WSCCcompliance.jsx
import React, { useEffect, useRef } from "react";

/**
 * WSCCcompliance
 * Aviso de conformidade em estilo glass card fosco, com fundo branco.
 * Todo o JSX e CSS estão reunidos neste arquivo.
 */
export default function WSCCcompliance() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const handlePointerMove = (event) => {
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--wscc-mx", `${x}%`);
      card.style.setProperty("--wscc-my", `${y}%`);
    };

    card.addEventListener("pointermove", handlePointerMove);
    return () => card.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const css = `
    .wscc-compliance,
    .wscc-compliance * {
      box-sizing: border-box;
    }

    .wscc-compliance {
      --wscc-mx: 50%;
      --wscc-my: 50%;
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 22px 24px;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.09);
      border-radius: 22px;
      color: #000000;
      background: rgba(255, 255, 255, 0.88);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.98),
        inset 0 0 0 1px rgba(255, 255, 255, 0.45),
        0 18px 48px rgba(0,  0, 0, 0.09),
        0 2px 8px rgba(0, 0, 0, 0.035);
      backdrop-filter: blur(18px) saturate(125%);
      -webkit-backdrop-filter: blur(18px) saturate(125%);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      animation: wscc-enter 500ms cubic-bezier(.2, .8, .2, 1) both;
    }

    .wscc-compliance::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(
        circle at var(--wscc-mx) var(--wscc-my),
        rgba(255, 255, 255, 0.96) 0%,
        rgba(255, 255, 255, 0.44) 24%,
        rgba(255, 255, 255, 0) 68%
      );
      opacity: 0.9;
      transition: opacity 180ms ease;
    }

    .wscc-compliance::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.5),
        rgba(235, 235, 235, 0.12) 48%,
        rgba(255, 255, 255, 0.35)
      );
    }

    .wscc-compliance__icon {
      position: relative;
      z-index: 1;
      display: flex;
      flex: 0 0 28px;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin-top: 1px;
      color: #000000;
    }

    .wscc-compliance__icon svg {
      display: block;
      width: 26px;
      height: 26px;
    }

    .wscc-compliance__content {
      flex: 1 1 auto;
      min-width: 0;
      position: relative;
      z-index: 1;
    }

    .wscc-compliance__title {
      margin: 0 0 8px;
      color: #000000;
      font-size: 16px;
      font-weight: 750;
      line-height: 1.4;
      letter-spacing: -0.025em;
    }

    .wscc-compliance__text {
      margin: 0;
      color: #000000;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.7;
      overflow-wrap: anywhere;
    }

    @keyframes wscc-enter {
      from {
        opacity: 0;
        transform: translateY(10px);
        filter: blur(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }

    @media (max-width: 520px) {
      .wscc-compliance {
        gap: 12px;
        padding: 17px 16px;
        border-radius: 18px;
      }

      .wscc-compliance__icon {
        flex-basis: 24px;
        width: 24px;
        height: 24px;
      }

      .wscc-compliance__icon svg {
        width: 23px;
        height: 23px;
      }

      .wscc-compliance__title {
        font-size: 14px;
      }

      .wscc-compliance__text {
        font-size: 10px;
        line-height: 1.65;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .wscc-compliance {
        animation: none;
      }

      .wscc-compliance::before {
        transition: none;
      }
    }
  `;

  return (
    <section
      ref={cardRef}
      className="wscc-compliance"
      role="note"
      aria-labelledby="wscc-compliance-title"
    >
      <style>{css}</style>

      <div className="wscc-compliance__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3.25 21 20H3L12 3.25Z" />
          <path d="M12 9v4.5" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <div className="wscc-compliance__content">
        <h2
          className="wscc-compliance__title"
          id="wscc-compliance-title"
        >
          IMPORTANTE: PRESCRIÇÃO MÉDICA OBRIGATÓRIA
        </h2>

        <p className="wscc-compliance__text">
          TODOS OS MEDICAMENTOS CANABINOIDES REQUEREM PRESCRIÇÃO 
          MÉDICA VÁLIDA E CERTIFICADO ANVISA CONFORME RDC 660/2022. 
          PARA FAZER PEDIDOS, É NECESSÁRIO TER UMA CONTA E ESTAR 
          AUTENTICADO NA ÁREA DO PACIENTE.
        </p>
      </div>
    </section>
  );
}
