// client/src/components/WeedSmokerPassSection.jsx
import React from "react";

/**
 * WeedSmokerPassSection
 * - Seção explicando sobre o Weed Smoker Pass e uso legal da cannabis
 * - Layout limpo, minimalista e responsivo
 * - Fundo branco, texto preto, CTA sólido em preto
 */
export default function WeedPassSection() {
  return (
    <div style={styles.section}>
      {/* Título e Conteúdo */}
      <div style={styles.textWrapper}>
        <h2 style={styles.title}>Weed Smoker Pass</h2>

        <p style={styles.subtitle}>
          Liberdade total com Weed Smoker Pass: THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds), médicos, fornecedores. Vida leve, saudável e cura garantida! E sim… os caras conseguiram colocar tudo isso num software. Dá pra acreditar? 😂
        </p>

        <p style={styles.subtitle}>
          Assina e destrava: acesso direto aos médicos prescritores que liberam sua receita de Cannabis medicinal! 🍃 Sem stress, sem enrolação — insônia, ansiedade, dores crônicas, TDAH, TEA, epilepsia, depressão e outras condições reconhecidas pela ANVISA. Weed Smokers Connection: Tudo que você precisa saber, sem complicação. 💨
        </p>

        <p style={styles.subtitle}>
          Dentro da plataforma é mamão com açúcar: você segue o passo a passo para conseguir sua autorização, separa os documentos e pronto. Ainda tem contato direto com fornecedores confiáveis de espécies e extrações top de linha com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e outros canabinoides — tanto nacionais quanto importados, e eles entregam rápido, sem enrolação. Ou seja: menos burocracia, mais vantagem e mais liberdade pra você.
        </p>

        <p style={styles.subtitle}>
          Tá fácil: joga sua receita e as notas fiscais lá no perfil e pronto. O Weed Smoker Pass te dá a liberdade que você sempre quis — pode curtir seus produtos sem dor de cabeça, com segurança e na legalidade. E o melhor: você ainda tem acesso a um catálogo só com coisa boa, especialmente selecionada pra sua cura, disponível pra comprar sem enrolação, além dos fornecedores que sabem indicar médicos de confiança. Ou seja… menos burocracia, mais liberdade. 🍃
        </p>

        {/* CTA Button */}
        <button style={styles.ctaButton}>
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
    </div>
  );
}

const styles = {
  section: {
    background: "#fff",
    color: "#000",
    padding: "4rem 1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textWrapper: {
    maxWidth: 720,
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 800,
    margin: 0,
    marginBottom: "1rem",
    lineHeight: 1.2,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
    marginBottom: "2rem",
    lineHeight: 1.6,
    textAlign: "justify",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  ctaButton: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
};
