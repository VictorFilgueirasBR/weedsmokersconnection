// src/components/Signup.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCheckCircle, FaHandshake, FaCannabis, FaShieldAlt } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
    const [selectedPlan, setSelectedPlan] = useState('semestral');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const prefersReducedMotion = useReducedMotion();
    const wrapRef = useRef(null);

    /* =========================
       🔹 LINKS DE CHECKOUT
    ========================= */
    const planCheckoutLinks = {
        semestral: "https://ws-connectioncommerce.com/produto/wsc-signature-semestral/",
        anual: "https://ws-connectioncommerce.com/produto/wsc-signature-anual/"
    };

    const planOptions = {
        semestral: { price: '449,90', description: 'Plano Semestral', duration: '/ Semestre' },
        anual: { price: '767,90', description: 'Plano Anual', duration: '/ Ano' }
    };

    // Spotlight Effect (Neural Tracking)
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const move = (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y}px`);
        };
        el.addEventListener("mousemove", move);
        return () => el.removeEventListener("mousemove", move);
    }, []);

    // Monitoramento de Status de Pagamento
    useEffect(() => {
        const paymentStatus = searchParams.get('status');
        if (paymentStatus === 'approved') {
            setSubmitMessage({ type: 'success', text: 'Seu pagamento foi aprovado! Redirecionando...' });
            setTimeout(() => navigate('/profile'), 3000);
        } else if (paymentStatus === 'rejected') {
            setSubmitMessage({ type: 'error', text: 'Pagamento rejeitado. Tente novamente.' });
        }
    }, [searchParams, navigate]);

    const handleExternalCheckout = () => {
        const link = planCheckoutLinks[selectedPlan];
        if (!link) {
            setSubmitMessage({ type: 'error', text: 'Link de pagamento não configurado.' });
            return;
        }
        window.location.href = link;
    };

    return (
        <section ref={wrapRef} className="wsc-wrap">
            {/* Camadas de Fundo Inspiradas na Referência */}
            <div className="wsc-bg-gradient" />
            <div className="wsc-bg-grid" />
            <div className="wsc-bg-noise" />

            <div className="wsc-container">
                
                {/* BADGE DE STATUS */}
                <motion.div 
                    className="wsc-badge"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <span className="dot" />
                    ACESSO EXCLUSIVO MEDICINAL
                </motion.div>

                {/* TÍTULO PRINCIPAL */}
                <motion.h1 
                    className="wsc-title"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    ASSINE E DESBLOQUEIE <br />
                    <span>O SEU ACESSO</span>
                </motion.h1>

                {/* BOX DE DESTAQUES (Glassmorphism Avançado) */}
                <motion.div 
                    className="signup-highlight-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <ul className="highlight-list">
                        <li className="highlight-item">
                            <FaHandshake /> 
                            <span>Médicos prescritores e fornecedores premium, selecionados a dedo.</span>
                        </li>
                        <li className="highlight-item">
                            <FaCannabis /> 
                            <span>Acesso as melhores Espécies de Flores in Natura e Extrações do mercado: THC (ICE, Hash, Rosin, FullSpectrum, Diamonds), Gummies de THC, CBD, Óleos e muito mais.</span>
                        </li>
                        <li className="highlight-item">
                            <FaShieldAlt /> 
                            <span>Consulta médica + atualizações necessárias já inclusas no valor dos plano, oque muda é o tempo de acesso LEGALIZADO & conteúdo exclusivo com catálogo atualizado mensalmente.</span>
                        </li>
                    </ul>
                </motion.div>

                {/* FEEDBACK DE MENSAGEM */}
                {submitMessage.text && (
                    <div className={`message ${submitMessage.type}`}>
                        {submitMessage.text}
                    </div>
                )}

                {/* CONTAINER DE PLANOS */}
                <div className="signup-form-glass">
                    <h2 className="section-subtitle">Escolha Seu Plano</h2>
                    
                    <div className="plans-wrapper">
                        {Object.entries(planOptions).map(([key, opt]) => (
                            <motion.div
                                key={key}
                                onClick={() => setSelectedPlan(key)}
                                className={`plan-option ${selectedPlan === key ? 'selected' : ''}`}
                                whileHover={{ scale: 1.02, translateY: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="plan-info">
                                    <h4>{opt.description}</h4>
                                    <div className="price-row">
                                        <span className="currency">R$</span>
                                        <span className="main-price">{opt.price}</span>
                                        <span className="duration">{opt.duration}</span>
                                    </div>
                                </div>
                                {selectedPlan === key && <FaCheckCircle className="check-icon" />}
                            </motion.div>
                        ))}
                    </div>

                    <button 
                        className="wsc-cta" 
                        onClick={handleExternalCheckout}
                    >
                        CONCLUIR PAGAMENTO
                    </button>
                    
                    <p className="login-link">
                        Já possui conta? <a href="https://ws-connectioncommerce.com/minha-conta/">My Account</a>
                    </p>
                </div>

            </div>

            <style>{`
                /* ====== ESTILIZAÇÃO INSPIRADA EM HOWITWORKS ====== */
                .wsc-wrap {
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    padding: 80px 20px;
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                    background: #04070c;
                    --mx: 50%;
                    --my: 50%;
                    font-family: 'Inter', sans-serif;
                }

                .wsc-bg-gradient {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 15% 15%, rgba(0,207,255,0.12), transparent 40%),
                        radial-gradient(circle at 85% 85%, rgba(77,166,255,0.1), transparent 40%),
                        linear-gradient(180deg, #050b14, #02050a);
                    z-index: 0;
                }

                .wsc-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px);
                    background-size: 50px 50px;
                    opacity: 0.2;
                    animation: gridFloat 30s linear infinite;
                    z-index: 1;
                }

                @keyframes gridFloat {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50px); }
                }

                .wsc-bg-noise {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 4px 4px;
                    z-index: 2;
                }

                .wsc-container {
                    position: relative;
                    z-index: 3;
                    max-width: 600px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                /* TÍTULO & BADGE */
                .wsc-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(0, 207, 255, 0.05);
                    border: 1px solid rgba(0, 207, 255, 0.2);
                    color: #bfefff;
                    padding: 8px 18px;
                    border-radius: 999px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.2em;
                    backdrop-filter: blur(10px);
                    align-self: flex-start;
                }

                .wsc-badge .dot {
                    width: 6px;
                    height: 6px;
                    background: #00cfff;
                    border-radius: 50%;
                    box-shadow: 0 0 12px #00cfff;
                }

                .wsc-title {
                    font-size: clamp(32px, 5vw, 56px);
                    font-weight: 900;
                    line-height: 0.9;
                    color: #eaf6ff;
                    letter-spacing: -0.04em;
                }

                .wsc-title span {
                    background: linear-gradient(90deg, #00cfff, #4da6ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* GLASS BOX HIGHLIGHT */
                .signup-highlight-box {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 24px;
                }

                .highlight-list { list-style: none; padding: 0; margin: 0; }
                .highlight-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    margin-bottom: 16px;
                    color: #cfeeff;
                    font-size: 0.95rem;
                    line-height: 1.4;
                }
                .highlight-item svg {
                    color: #00cfff;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }

                /* FORM & PLANS */
                .signup-form-glass {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                }

                .section-subtitle {
                    color: #fff;
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .plans-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .plan-option {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .plan-option.selected {
                    background: rgba(0, 207, 255, 0.1);
                    border-color: #00cfff;
                    box-shadow: 0 0 20px rgba(0, 207, 255, 0.2);
                }

                .price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                    margin-top: 4px;
                }
                .main-price { font-size: 1.5rem; font-weight: 800; color: #fff; }
                .currency, .duration { font-size: 0.8rem; color: #00cfff; }
                .check-icon { color: #00cfff; font-size: 1.5rem; }

                /* BOTÃO CTA ESTILO NEURAL */
                .wsc-cta {
                    width: 100%;
                    padding: 18px;
                    border-radius: 16px;
                    border: none;
                    background: linear-gradient(90deg, #4da6ff, #00cfff);
                    color: #fff;
                    font-weight: 800;
                    font-size: 1rem;
                    letter-spacing: 0.05em;
                    box-shadow: 0 10px 30px rgba(0,207,255,0.3);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .wsc-cta::before {
                    content: '';
                    position: absolute;
                    left: var(--mx);
                    top: var(--my);
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%);
                    transition: width .4s ease, height .4s ease, opacity .4s ease;
                    opacity: 0;
                }

                .wsc-cta:hover::before { width: 300px; height: 300px; opacity: 1; }
                .wsc-cta:hover { transform: translateY(-3px); }

                .login-link {
                    margin-top: 20px;
                    text-align: center;
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                }
                .login-link a { color: #00cfff; text-decoration: none; font-weight: 700; }

                /* MENSAGENS */
                .message {
                    padding: 12px;
                    border-radius: 12px;
                    text-align: center;
                    font-weight: 600;
                }
                .message.success { background: rgba(0,255,150,0.1); color: #00ff96; border: 1px solid #00ff96; }
                .message.error { background: rgba(255,80,80,0.1); color: #ff5050; border: 1px solid #ff5050; }
            `}</style>
        </section>
    );
}