
// src/pages/WSCClubNew.jsx
import React, { useState, useEffect, useRef } from "react";

import HeroHashLegal from "../components/HeroHashLegal";
import FirstClub from "../components/FirstClub";
import GlassCardNacional from "../components/GlassCardNacional";
import GlassCardImport from "../components/GlassCardImport";
import MemberTreatmentFlow from "../components/MemberTreatmentFlow";
import Instruction from "../components/Instruction";
import IceSection from "../components/IceSection";
import ContactsModal from "../components/ContactsModal";
import PropertiesGrid from "../components/PropertiesGrid";
import PropertiesUtils from "../components/PropertiesUtils";
import PropertiesImp from "../components/PropertiesImp";

/*
 * WSC CLUB ACCESS GATE
 *
 * ATENÇÃO:
 * A senha abaixo é validada no frontend.
 * Para segurança real, implemente validação no servidor.
 */
const WSC_CLUB_PASSWORD = "vaitomando1717!";

const WSC_CLUB_IMAGE = "/images/first-start.png";

const WSC_CLUB_STYLES = `
  #wsc-access-root,
  #wsc-access-root * {
    box-sizing: border-box;
  }

  #wsc-access-root .wsc-access-gate {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    width: 100%;
    height: 100%;
    height: 100dvh;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 24px;
    background: #fff;
    isolation: isolate;
    font-family: Inter, Arial, sans-serif;
  }

  #wsc-access-root .wsc-access-background {
    position: absolute;
    inset: 0;
    z-index: -2;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #fff;
  }

  #wsc-access-root .wsc-access-background img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    opacity: 1;
  }

  #wsc-access-root .wsc-access-shade {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba(255, 255, 255, 0.16);
    pointer-events: none;
  }

  #wsc-access-root .wsc-access-panel {
    position: relative;
    width: min(100%, 390px);
    padding: 34px 28px 28px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.93);
    box-shadow:
      0 24px 90px rgba(0, 0, 0, 0.12),
      0 2px 10px rgba(0, 0, 0, 0.035);
    -webkit-backdrop-filter: blur(22px);
    backdrop-filter: blur(22px);
    text-align: center;
    animation: wscGateEnter 550ms cubic-bezier(.2,.8,.2,1) both;
  }

  #wsc-access-root .wsc-access-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin: 0 auto 21px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 50%;
    color: #111;
    background: rgba(255, 255, 255, 0.85);
  }

  #wsc-access-root .wsc-access-mark svg {
    width: 23px;
    height: 23px;
  }

  #wsc-access-root .wsc-access-eyebrow {
    margin: 0 0 10px;
    color: #777;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  #wsc-access-root .wsc-access-title {
    margin: 0;
    color: #111;
    font-size: clamp(23px, 5vw, 29px);
    line-height: 1.2;
    font-weight: 650;
    letter-spacing: -0.055em;
  }

  #wsc-access-root .wsc-access-description {
    margin: 12px 0 25px;
    color: #707070;
    font-size: 13px;
    line-height: 1.7;
  }

  #wsc-access-root .wsc-access-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin: 0;
  }

  #wsc-access-root .wsc-access-input {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 52px;
    margin: 0;
    padding: 0 15px;
    border: 1px solid #dedede;
    border-radius: 11px;
    outline: none;
    color: #111;
    background: rgba(255, 255, 255, 0.96);
    font: inherit;
    font-size: 14px;
    letter-spacing: 0.04em;
    box-shadow: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }

  #wsc-access-root .wsc-access-input::placeholder {
    color: #999;
    letter-spacing: 0;
  }

  #wsc-access-root .wsc-access-input:focus {
    border-color: #222;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.055);
  }

  #wsc-access-root .wsc-access-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 52px;
    padding: 14px 18px;
    border: 1px solid #111;
    border-radius: 11px;
    color: #fff;
    background: #111;
    font: inherit;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background 200ms ease,
      color 200ms ease,
      transform 200ms ease,
      box-shadow 200ms ease;
  }

  #wsc-access-root .wsc-access-button:hover {
    color: #111;
    background: #fff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  }

  #wsc-access-root .wsc-access-button:active {
    transform: scale(0.985);
  }

  #wsc-access-root .wsc-access-button:focus-visible {
    outline: 2px solid #555;
    outline-offset: 4px;
  }

  #wsc-access-root .wsc-access-error {
    margin: 0;
    padding: 10px 12px;
    border: 1px solid rgba(165, 30, 30, 0.15);
    border-radius: 9px;
    color: #982e2e;
    background: rgba(165, 30, 30, 0.045);
    font-size: 12px;
    line-height: 1.5;
    text-align: left;
  }

  #wsc-access-root .wsc-access-error[hidden],
  #wsc-access-root .wsc-access-image-error[hidden] {
    display: none;
  }

  #wsc-access-root .wsc-access-footer {
    margin: 22px 0 0;
    color: #999;
    font-size: 9px;
    line-height: 1.7;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  #wsc-access-root .wsc-access-footer span {
    display: inline-block;
    margin-right: 6px;
    color: #222;
  }

  #wsc-access-root .wsc-access-image-error {
    position: absolute;
    right: 14px;
    bottom: 12px;
    left: 14px;
    color: #777;
    font-size: 10px;
    text-align: center;
  }

  /*
   * ÂNCORA DO PRIMEIRO COMPONENTE
   * Evita margem superior e permite o posicionamento no início do Club.
   */
  #wsc-club-top-anchor {
    display: block;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    scroll-margin-top: 0 !important;
    scroll-snap-align: start;
  }

  @keyframes wscGateEnter {
    from {
      opacity: 0;
      transform: translateY(15px) scale(.985);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @media (max-width: 480px) {
    #wsc-access-root .wsc-access-gate {
      padding: 18px;
    }

    #wsc-access-root .wsc-access-panel {
      padding: 29px 21px 24px;
      border-radius: 19px;
    }

    #wsc-access-root .wsc-access-description {
      margin-bottom: 21px;
    }

    #wsc-access-root .wsc-access-background img {
      object-fit: contain;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    #wsc-access-root .wsc-access-panel {
      animation: none;
    }

    #wsc-access-root .wsc-access-button,
    #wsc-access-root .wsc-access-input {
      transition: none;
    }
  }
`;

function AccessGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!password) {
      setError("Digite a senha para continuar.");
      inputRef.current?.focus();
      return;
    }

    if (password === WSC_CLUB_PASSWORD) {
      setPassword("");
      onUnlock();
      return;
    }

    setPassword("");
    setError("Senha incorreta. Verifique e tente novamente.");
    inputRef.current?.focus();
  }

  return (
    <div className="wsc-access-gate">
      <div className="wsc-access-background" aria-hidden="true">
        {!imageFailed && (
          <img
            src={WSC_CLUB_IMAGE}
            alt=""
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="wsc-access-shade" aria-hidden="true" />

      <section
        className="wsc-access-panel"
        aria-labelledby="wsc-access-title"
        aria-describedby="wsc-access-description"
      >
        <div className="wsc-access-mark" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v3" />
          </svg>
        </div>

        <p className="wsc-access-eyebrow">WS | CONNECTION</p>

        <h1 id="wsc-access-title" className="wsc-access-title">
          Acesso restrito
        </h1>

        <p
          id="wsc-access-description"
          className="wsc-access-description"
        >
          Esta área é protegida. Insira sua senha para acessar o WS Club.
        </p>

        <form
          className="wsc-access-form"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <input
            ref={inputRef}
            className="wsc-access-input"
            type={showPassword ? "text" : "password"}
            name="wsc-club-password"
            placeholder="Digite sua senha"
            aria-label="Senha de acesso ao WS Club"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "wsc-access-error" : undefined}
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            required
          />

          <button className="wsc-access-button" type="submit">
            Desbloquear acesso
            <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            style={{
              alignSelf: "center",
              padding: "4px 8px",
              border: 0,
              background: "transparent",
              color: "#666",
              font: "inherit",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {showPassword ? "Ocultar senha" : "Mostrar senha"}
          </button>

          <p
            id="wsc-access-error"
            className="wsc-access-error"
            role="alert"
            hidden={!error}
          >
            {error}
          </p>
        </form>

        <p className="wsc-access-footer">
          <span aria-hidden="true">●</span>
          WS CLUB · ACCESS CONTROL
        </p>
      </section>

      <p className="wsc-access-image-error" hidden={!imageFailed}>
        Imagem de fundo indisponível. Verifique o caminho do arquivo.
      </p>
    </div>
  );
}

export default function WSCClubNew() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*
   * Bloqueia o scroll durante a autenticação e restaura
   * o valor original quando o componente é desmontado.
   */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (!isAuthenticated) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAuthenticated]);

  /*
   * APÓS DESBLOQUEAR:
   * 1. Aguarda o conteúdo protegido aparecer no DOM.
   * 2. Posiciona a janela no início do documento.
   * 3. Leva a âncora diretamente ao primeiro componente.
   *
   * O segundo requestAnimationFrame ajuda a garantir que
   * o layout já esteja renderizado antes do posicionamento.
   */
  useEffect(() => {
    if (!isAuthenticated) return undefined;

    let secondFrame = null;

    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const anchor = document.getElementById(
          "wsc-club-top-anchor"
        );

        if (!anchor) {
          window.scrollTo(0, 0);
          return;
        }

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        anchor.scrollIntoView({
          behavior: "auto",
          block: "start",
          inline: "nearest",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, [isAuthenticated]);

  return (
    <div id="wsc-access-root">
      <style>{WSC_CLUB_STYLES}</style>

      {!isAuthenticated && (
        <AccessGate
          onUnlock={() => setIsAuthenticated(true)}
        />
      )}

      <div
        className="wsc-club-page"
        aria-hidden={!isAuthenticated}
        inert={!isAuthenticated}
        style={{
          display: isAuthenticated ? undefined : "none",
        }}
      >
        {/* ÂNCORA: TOPO DO PRIMEIRO COMPONENTE */}
        <div id="wsc-club-top-anchor">
          <FirstClub />
        </div>

        <MemberTreatmentFlow />

        <HeroHashLegal />

        <GlassCardNacional />
        <GlassCardImport />

        <Instruction />

        <PropertiesGrid id="properties-grid" />

        <PropertiesImp id="properties-imp" />

        <PropertiesUtils id="properties-utils" />

        <IceSection />

        {isContactsOpen && (
          <ContactsModal
            onClose={() => setIsContactsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
