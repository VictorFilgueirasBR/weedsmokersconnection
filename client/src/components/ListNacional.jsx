import React from "react";

const fornecedores = [
  {
    nome: "Ease Labs Brasil",
    link: "https://easelabs.com.br"
  },
  {
    nome: "Prati-Donaduzzi (Cannabis Medicinal)",
    link: "https://www.pratidonaduzzi.com.br"
  },
  {
    nome: "Entourage Brasil",
    link: "https://entourage.com.br"
  },
  {
    nome: "VerdeMed Brasil",
    link: "https://verdemed.com.br"
  },
  {
    nome: "NuNature Labs",
    link: "https://nunature.com.br"
  }
];

export default function ListaFornecedoresGlass() {
  return (
    <div style={styles.container}>
      <ul style={styles.list}>
        {fornecedores.map((fornecedor, index) => (
          <li key={index} style={styles.item}>
            <a
              href={fornecedor.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              {fornecedor.nome}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
  },
  list: {
    listStyle: "none",
    padding: "24px",
    width: "340px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)"
  },
  item: {
    marginBottom: "12px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.18)",
    transition: "transform 0.2s ease, background 0.2s ease"
  },
  link: {
    display: "block",
    padding: "14px 18px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none"
  }
};
