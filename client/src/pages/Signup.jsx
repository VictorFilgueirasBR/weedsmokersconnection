// src/components/Signup.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import './Signup.scss';
import { FaCheckCircle, FaHandshake, FaCannabis } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const [selectedPlan, setSelectedPlan] = useState('mensal');

    const [couponCode, setCouponCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [couponValidated, setCouponValidated] = useState(false);

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    /* =========================
       🔹 LINKS EXTERNOS POR PLANO
       EDITE AQUI
    ========================= */
    const planCheckoutLinks = {
        mensal: "https://ws-connectioncommerce.com/produto/wsc-signature-mensal/",
        semestral: "https://ws-connectioncommerce.com/produto/wsc-signature-semestral/",
        anual: "https://ws-connectioncommerce.com/produto/wsc-signature-anual/"
    };

    const handleExternalCheckout = () => {
        const link = planCheckoutLinks[selectedPlan];

        if (!link) {
            setSubmitMessage({
                type: 'error',
                text: 'Link de pagamento não configurado para este plano.'
            });
            return;
        }

        window.location.href = link;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    useEffect(() => {
        const paymentStatus = searchParams.get('status');

        if (paymentStatus === 'approved') {
            setSubmitMessage({ type: 'success', text: 'Seu pagamento foi aprovado! Redirecionando...' });
            setTimeout(() => navigate('/profile'), 3000);
        } else if (paymentStatus === 'pending' || paymentStatus === 'in_process') {
            setSubmitMessage({ type: 'info', text: 'Pagamento em análise. Você será notificado por e-mail.' });
        } else if (paymentStatus === 'rejected') {
            setSubmitMessage({ type: 'error', text: 'Pagamento rejeitado. Tente novamente.' });
        }
    }, [searchParams, navigate]);

    const planOptions = {
        mensal: { price: '389,90', amount: 77.9, description: 'Plano NEVOEIRO710' },
        semestral: { price: '499,90', amount: 280.9, description: 'Plano Semestral' },
        anual: { price: '767,90', amount: 467.9, description: 'Plano Anual' }
    };

    const finalAmount = Math.max(
        0,
        couponValidated
            ? planOptions[selectedPlan].amount * (1 - discountPercent / 100)
            : planOptions[selectedPlan].amount
    );

    return (
        <div className="signup-page">
            <style>
                {`
                /* ... (CSS and HTML are the same as before, não modifiquei a maior parte) ... */
                .signup-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 4rem 1rem;
                    background-image: url('/images/bg-signup.png');
                    background-position: center;
                    background-size: cover;
                    filter: saturate(120%) contrast(100%) brightness(0.85);
                    position: relative;
                }
                .signup-container-wrapper {
                    max-width: 1200px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    align-items: center;
                }
                .signup-content {
                    text-align: center;
                    color: #fff;
                    margin-bottom: 2rem;
                    max-width: 700px;
                }
                .signup-content h1 {
                    font-size: 1.5rem;
                    font-weight: 900;
                    margin-bottom: 0.5rem;
                    line-height: 1.1;
                    color: #fff;
                }
                .signup-content p {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    margin-top: 0.5rem;
                }
                .signup-content .small-text {
                    font-size: clamp(0.9rem, 1.5vw, 1rem);
                    opacity: 0.7;
                    margin-top: 1rem;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .signup-gamification-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    width: 100%;
                    align-items: stretch;
                }
                @media (min-width: 768px) {
                    .signup-gamification-container {
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        gap: 3rem;
                    }
                }
                .signup-form-container, .signup-plans-container {
                    width: 100%;
                    max-width: 450px;
                }
                .signup-form-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px) saturate(180%);
                    -webkit-backdrop-filter: blur(10px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 1.5rem;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .signup-form-glass h2 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    text-align: center;
                    color: #fff;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                .form-group input {
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    font-size: 1rem;
                    transition: border-color 0.3s ease, background-color 0.3s ease;
                }
                .form-group input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                .form-group input:focus {
                    outline: none;
                    border-color: #57C74C;
                    background: rgba(255, 255, 255, 0.15);
                }
                .form-group .error {
                    color: #ff6b6b;
                    font-size: 0.8rem;
                    margin-top: 0.4rem;
                    display: block;
                }
                .password-requirements {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 0.4rem;
                    line-height: 1.4;
                }
                .social-login {
                    margin-top: 1.5rem;
                    text-align: center;
                }
                .or-divider {
                    display: block;
                    text-align: center;
                    margin-bottom: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                    position: relative;
                }
                .or-divider::before, .or-divider::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 40%;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.2);
                }
                .or-divider::before { left: 0; }
                .or-divider::after { right: 0; }
                .plans-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .plan-option {
                padding: 1rem 1.2rem;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 14px;
                background: rgba(255,255,255,0.08);
                cursor: pointer;
                transition: all 0.25s ease;
                text-align: left;
                color: #fff;
                }
                .plan-option:hover {
                border: 2px solid rgba(147, 255, 246, 0.14);
                border-radius: 14px;
                border-color: #4cc3c74d;
                background: rgba(57, 225, 231, 0.19);
                box-shadow: 0 0 20px rgba(76, 199, 199, 0.19);
                transform: scale(1.03);
                transform: translateY(-3.5px);
                }
                .plan-option.selected {
                border: 2px solid rgba(147, 255, 246, 0.3);
                border-radius: 14px;
                border-color: #4cc3c7ff;
                background: rgba(57, 225, 231, 0.48);
                box-shadow: 0 0 20px rgba(76, 199, 199, 0.5);
                transform: scale(1.03);
                }
                .plan-option h4,
                .plan-option p,
                .plan-option .currency,
                .plan-option .main-price,
                .plan-option .duration {
                color: #fff !important;
                }
                .plan-option h4 {
                    margin: 0;
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin-bottom: 0.1rem;
                }
                .plan-option p {
                    margin: 0.15rem 0 0.4rem;
                    font-size: 0.8rem;
                    opacity: 0.8;
                }
                .plan-option .price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 0.5rem;
                }
                .plan-option .currency {
                    font-size: 0.8rem;
                    opacity: 0.8;
                }
                .plan-option .main-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .plan-option .duration {
                    font-size: 0.75rem;
                    opacity: 0.7;
                }
                .submit-gradient-btn {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(90deg, #57C74C, #3AA853);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 24px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 0.5px;
                    width: 100%;
                    box-shadow: 0 4px 15px rgba(87, 199, 76, 0.4);
                    margin-top: 1rem;
                }
                .submit-gradient-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(49, 250, 240, 0.49);
                }
                .submit-gradient-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: translateY(0);
                    box-shadow: none;
                }
                .submit-gradient-btn::before {
                    content: '';
                    position: absolute;
                    top: var(--y);
                    left: var(--x);
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    opacity: 0;
                    transition: width 0.4s ease-out, height 0.4s ease-out, opacity 0.4s ease-out;
                }
                .submit-gradient-btn:hover::before {
                    width: 200px;
                    height: 200px;
                    opacity: 1;
                }
                .message {
                    padding: 0.8rem 1rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                    text-align: center;
                }
                .message.success {
                    background: rgba(87, 199, 76, 0.2);
                    color: #57C74C;
                    border: 1px solid #57C74C;
                }
                .message.error {
                    background: rgba(255, 107, 107, 0.2);
                    color: #ff6b6b;
                    border: 1px solid #ff6b6b;
                }
                .message.info {
                    background: rgba(77, 172, 250, 0.2);
                    color: #4dacfa;
                    border: 1px solid #4dacfa;
                }
                .login-link {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.8);
                }
                .login-link a {
                    color: #57C74C;
                    text-decoration: none;
                    font-weight: 600;
                    transition: color 0.2s ease;
                }
                .login-link a:hover {
                    color: #3AA853;
                    text-decoration: underline;
                }
                .signup-highlight-box {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(6px);
                    border-radius: 15px;
                    border: 1.5px solid rgba(255, 255, 255, 0.1);
                    padding: 1.2rem 1.8rem;
                    max-width: 100%;
                    text-align: justify;
                    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.7rem;
                    transition: all 0.5s ease;
                }

                .highlight-list {
                    list-style: none;
                    padding: 0;
                    margin: 0.5rem 0 1rem;
                }

                .highlight-item {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 0.8rem;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    color: #fff;
                }

                .highlight-item svg {
                    flex-shrink: 0;
                    margin-right: 12px;
                    color: #4CC3C7;
                    font-size: 1.2rem;
                    margin-top: 2px;
                }

                .form-section-divider {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    margin: 1.5rem 0;
                }

                .form-section-divider h2 {
                    margin-top: 0;
                }

                /* Termos checkbox e modal simples (estilos locais para integração rápida) */
                .terms-checkbox {
                    display: flex;
                    align-items: center;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.85);
                    margin-top: 0.8rem;
                    gap: 0.5rem;
                }
                .terms-checkbox a {
                    color: #57C74C;
                    font-weight: 600;
                    cursor: pointer;
                }
                .terms-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .terms-modal {
                    background: rgba(30,30,30,0.95);
                    color: #fff;
                    padding: 2rem;
                    border-radius: 15px;
                    max-width: 700px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                }
                .terms-modal h2 {
                    margin-top: 0;
                }
                .terms-modal button {
                    margin-top: 1rem;
                    background: #57C74C;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    color: #fff;
                }
                `}
            </style>

            <div className="signup-container-wrapper">

                <div className="signup-content">
                    <h1>Assine e Desbloqueie o Futuro da Sua Cura</h1>

                    <div className="signup-highlight-box"> <p> Cadastre-se em segundos e tenha acesso imediato a um ecossistema exclusivo que conecta você a: </p> <ul className="highlight-list"> <li className="highlight-item"> <FaHandshake /> <span>Médicos prescritores e fornecedores premium, selecionados a dedo.</span> </li> <li className="highlight-item"> <FaCannabis /> <span>As melhores Espécies de Flores em Natura e Extrações do mercado: THC (ICE, Hash, Rosin, FullSpectrum, Diamonds), Gummies de THC, CBD e muito mais.</span> </li> <li className="highlight-item"> <FaCheckCircle /> <span>Como assinante, você entra para um círculo seleto que recebe um catálogo atualizado de fornecedores mensalmente, assim como SUPORTE para agendamento de consultas, compra e pós venda da aquisição de produtos.</span> </li> <li className="highlight-item"> <FaCheckCircle /> <span>A sua consulta Médica já está inclusa no valor do plano, oque muda é o tempo de acesso a área de membros com catálogo atualizado.</span> </li> </ul> <p> Tudo em um só lugar, pensado para sua cura, liberdade e lifestyle leve. Essa é sua chance de fazer parte de algo único. Acesso imediato a todas as novidades liberadas nos catálogos de THC (Flores em Natura, ICE, Hash, Rosin, FullSpectrum, Diamonds) e CBD, promovendo saúde e consciência. </p> </div> 
                </div>

                {submitMessage.text && (
                    <div className={`message ${submitMessage.type}`}>
                        {submitMessage.text}
                    </div>
                )}

                <div className="signup-form-glass">

                    <h2>Escolha Seu Plano</h2>

                    <div className="plans-wrapper">
                        {['mensal', 'semestral', 'anual'].map((plan) => (
                            <div
                                key={plan}
                                onClick={() => setSelectedPlan(plan)}
                                className={`plan-option ${selectedPlan === plan ? 'selected' : ''}`}
                            >
                                <h4>{planOptions[plan].description}</h4>

                                <div className="price-row">
                                    <span className="currency">R$</span>
                                    <span className="main-price">{planOptions[plan].price}</span>
                                    <span className="duration">
                                        {plan === 'anual'
                                            ? '/ Ano'
                                            : plan === 'mensal'
                                            ? '/ Especial'
                                            : '/ Semestre'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ BOTÃO ALTERADO */}
                    <button
                        type="button"
                        className="submit-gradient-btn"
                        onClick={handleExternalCheckout}
                        onMouseMove={handleMouseMove}
                    >
                        Concluir Pagamento
                    </button>

                </div>


                {/* ✅ BOTÃO ALTERADO */}
                <button
                    type="button"
                    className="submit-gradient-btn"
                    onClick={() => window.open("https://www.instagram.com/wsconnectionbrasil/", "_blank")}
                    onMouseMove={handleMouseMove}
                >
                    INSTAGRAM
                </button>

                <button
                    type="button"
                    className="submit-gradient-btn"
                    onClick={() => window.open("https://wa.me/5561995276936", "_blank")}
                    onMouseMove={handleMouseMove}
                >
                    WHATSAPP
                </button>


            </div>
        </div>
    );
}