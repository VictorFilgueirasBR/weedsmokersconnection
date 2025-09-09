import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../App";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const [selectedPlan, setSelectedPlan] = useState("semestral");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkPaymentStatus = () => {
      const paymentStatus = searchParams.get("status");
      if (paymentStatus === "approved") {
        setSubmitMessage({
          type: "success",
          text: "Seu pagamento foi aprovado! Em instantes sua conta será ativada.",
        });
      } else if (paymentStatus === "pending" || paymentStatus === "in_process") {
        setSubmitMessage({
          type: "info",
          text: "Seu pagamento está em análise. Você será notificado por e-mail assim que for aprovado.",
        });
      } else if (paymentStatus === "rejected") {
        setSubmitMessage({
          type: "error",
          text: "Seu pagamento foi rejeitado. Tente novamente ou use outra forma de pagamento.",
        });
      }
    };
    checkPaymentStatus();
  }, [searchParams]);

  const validate = () => {
    const errors = {};
    const { name, email, password, confirmPassword } = formData;
    if (!name) errors.name = "Nome é obrigatório.";
    if (!email) {
      errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido.";
    }
    if (!password) {
      errors.password = "Senha é obrigatória.";
    } else if (password.length < 12) {
      errors.password = "A senha deve ter pelo menos 12 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/\d/.test(password)) {
      errors.password = "A senha deve conter pelo menos um número.";
    } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      errors.password = "A senha deve conter pelo menos um caractere especial.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  };

  const handleSubmit = async () => {
    setSubmitMessage({ type: "", text: "" });
    if (!validate()) {
      setSubmitMessage({
        type: "error",
        text: "Por favor, corrija os erros no formulário.",
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage({ type: "info", text: "Criando sua conta..." });

    try {
      const registerResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const { _id: userId } = registerResponse.data.user;
      setSubmitMessage({
        type: "info",
        text: "Conta criada! Gerando checkout de pagamento...",
      });

      await handleCheckout(userId);
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao criar a conta. Tente novamente.";
      setSubmitMessage({ type: "error", text: errorMessage });
    }
  };

  const handleCheckout = async (userId) => {
    setIsProcessingPayment(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/mercadopago/create-subscription`,
        {
          plan: selectedPlan,
          userEmail: formData.email,
          userId: userId,
        },
        { withCredentials: true }
      );
      const initPoint = response.data.init_point;
      window.location.href = initPoint;
    } catch (error) {
      setIsProcessingPayment(false);
      setSubmitMessage({
        type: "error",
        text: "Erro ao gerar o pagamento. Tente novamente.",
      });
    }
  };

  const planOptions = {
    semestral: {
      price: "57,90",
      duration: "6 meses",
      description: "Plano Semestral",
      oldPrice: "119,90",
    },
    anual: {
      price: "87,90",
      duration: "1 ano",
      description: "Plano Anual",
      oldPrice: "209,90",
    },
  };

  return (
    <div className="signup-layout">
      <style>{`
        .signup-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }
        .signup-left {
          flex: 1;
          background: url('/images/signup-bg.png') center/cover no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
        }
        .testimonial-box {
          background: rgba(0,0,0,0.5);
          color: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 2rem;
          max-width: 400px;
        }
        .testimonial-box p {
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .testimonial-author {
          margin-top: 1rem;
          font-weight: 600;
        }
        .signup-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .signup-card {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
        }
        .signup-card h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 1.3rem;
        }
        .social-buttons button {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-bottom: 0.8rem;
          background: #fff;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }
        .social-buttons button:hover {
          background: #f9f9f9;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.7rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg,#000,#333);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        .login-switch {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .login-switch a {
          color: #000;
          font-weight: 600;
        }
      `}</style>

      <div className="signup-left">
        <div className="testimonial-box">
          <p>
            “App makes it easy to invest in real estate using cryptocurrency.
            Whether I’m buying luxury villas or fractional shares in commercial
            properties, every transaction is seamless, secure, and transparent.”
          </p>
          <div className="testimonial-author">Isabella Garcia</div>
          <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
            Layers Capital <br /> Global Real Estate Investment Firm
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Create an account</h2>
          <div className="social-buttons">
            <button>Continue with Google</button>
            <button>Continue with Apple</button>
            <button>Continue with Binance</button>
            <button>Continue with Wallet</button>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.email}
              </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.password}
              </span>
            )}
          </div>
          <button
            className="submit-btn"
            disabled={isSubmitting || isProcessingPayment}
            onClick={handleSubmit}
            onMouseMove={handleMouseMove}
          >
            {isSubmitting
              ? "Criando Conta..."
              : isProcessingPayment
              ? "Processando Pagamento..."
              : "Create an account"}
          </button>
          <div className="login-switch">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
