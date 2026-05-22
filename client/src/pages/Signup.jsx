// src/components/Signup.jsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { motion } from 'framer-motion';

import {
    FaCheckCircle,
    FaShieldAlt,
    FaHeadset,
    FaArrowRight,
    FaStar
} from 'react-icons/fa';

export default function Signup() {

    /* =========================================================
        STATE
    ========================================================= */

    const [selectedPlan, setSelectedPlan] = useState('anual');

    const [submitMessage, setSubmitMessage] = useState({
        type: '',
        text: ''
    });

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    /* =========================================================
        CHECKOUT LINKS
    ========================================================= */

    const checkoutLinks = {
        semestral:
            'https://ws-connectioncommerce.com/produto/wsc-signature-semestral/',

        anual:
            'https://ws-connectioncommerce.com/produto/wsc-signature-anual/',

        derve:
            'https://ws-connectioncommerce.com/produto/wsc-plano-start/',

        euyasmin:
            'https://ws-connectioncommerce.com/produto/wsc-plano-start/'
    };

    /* =========================================================
        PLANS
    ========================================================= */

    const officialPlans = {
        semestral: {
            title: 'Plano Semestral',
            price: '449,90',
            duration: '6 meses',
            badge: 'Mais escolhido'
        },

        anual: {
            title: 'Plano Anual',
            price: '767,90',
            duration: '12 meses',
            badge: 'Melhor benefício'
        }
    };

    const creatorPlans = {
        derve: {
            title: 'Plano Derve',
            price: '420,00',
            duration: '6 meses',
            creator: 'Parceiro oficial'
        },

        euyasmin: {
            title: 'Plano EuYasmin',
            price: '420,00',
            duration: '6 meses',
            creator: 'Parceiro oficial'
        }
    };

    /* =========================================================
        PAYMENT STATUS
    ========================================================= */

    useEffect(() => {

        const paymentStatus = searchParams.get('status');

        if (paymentStatus === 'approved') {

            setSubmitMessage({
                type: 'success',
                text: 'Pagamento aprovado. Redirecionando...'
            });

            setTimeout(() => {
                navigate('/profile');
            }, 2500);
        }

        if (paymentStatus === 'rejected') {

            setSubmitMessage({
                type: 'error',
                text: 'Pagamento não aprovado. Tente novamente.'
            });
        }

    }, [searchParams, navigate]);

    /* =========================================================
        CHECKOUT
    ========================================================= */

    const handleCheckout = () => {

        const link = checkoutLinks[selectedPlan];

        if (!link) {

            setSubmitMessage({
                type: 'error',
                text: 'Link de pagamento indisponível.'
            });

            return;
        }

        window.location.href = link;
    };

    /* =========================================================
        ANIMATION
    ========================================================= */

    const containerVariants = {
        hidden: {
            opacity: 0
        },

        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 18
        },

        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45
            }
        }
    };

    /* =========================================================
        COMPONENT
    ========================================================= */

    return (

        <section className="signup-page">

            {/* BACKGROUND */}

            <div className="bg-gradient" />
            <div className="bg-blur blur-1" />
            <div className="bg-blur blur-2" />

            <motion.div
                className="signup-container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >

                {/* TOP BADGE */}

                <motion.div
                    className="top-badge"
                    variants={itemVariants}
                >
                    <span className="status-dot" />
                    EXPERIÊNCIA PREMIUM ASSISTIDA
                </motion.div>

                {/* HERO */}

                <motion.div
                    className="hero-content"
                    variants={itemVariants}
                >

                    <h1 className="hero-title">
                        Acesso simplificado à
                        <span> cannabis medicinal premium.</span>
                    </h1>

                    <p className="hero-description">
                        Suporte especializado, processo organizado
                        e experiência humanizada em cada etapa.
                    </p>

                </motion.div>

                {/* TRUST BLOCK */}

                <motion.div
                    className="trust-grid"
                    variants={itemVariants}
                >

                    <div className="trust-card">
                        <FaShieldAlt />
                        <div>
                            <strong>Processo seguro</strong>
                            <p>
                                Organização documental e suporte completo.
                            </p>
                        </div>
                    </div>

                    <div className="trust-card">
                        <FaHeadset />
                        <div>
                            <strong>Atendimento humanizado</strong>
                            <p>
                                Acompanhamento contínuo durante todo o processo.
                            </p>
                        </div>
                    </div>

                </motion.div>

                {/* MESSAGE */}

                {submitMessage.text && (

                    <motion.div
                        className={`message ${submitMessage.type}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {submitMessage.text}
                    </motion.div>
                )}

                {/* PLANS */}

                <motion.div
                    className="plans-wrapper"
                    variants={itemVariants}
                >

                    {/* OFFICIAL */}

                    <div className="section-header">
                        <span>Planos Oficiais</span>
                    </div>

                    <div className="plans-grid">

                        {Object.entries(officialPlans).map(([key, plan]) => (

                            <motion.button
                                key={key}
                                type="button"
                                className={`plan-card ${selectedPlan === key ? 'selected' : ''
                                    }`}
                                onClick={() => setSelectedPlan(key)}
                                whileHover={{
                                    y: -3
                                }}
                                whileTap={{
                                    scale: 0.98
                                }}
                            >

                                <div className="plan-top">

                                    <div className="plan-badge">
                                        <FaStar />
                                        {plan.badge}
                                    </div>

                                    {selectedPlan === key && (
                                        <FaCheckCircle className="selected-icon" />
                                    )}

                                </div>

                                <div className="plan-content">

                                    <h3>{plan.title}</h3>

                                    <div className="price-row">
                                        <span className="currency">R$</span>

                                        <span className="price">
                                            {plan.price}
                                        </span>
                                    </div>

                                    <span className="duration">
                                        {plan.duration}
                                    </span>

                                </div>

                            </motion.button>
                        ))}

                    </div>

                    {/* CREATOR */}

                    <div className="section-header creator-header">
                        <span>Cupons Parceiros</span>
                    </div>

                    <div className="plans-grid">

                        {Object.entries(creatorPlans).map(([key, plan]) => (

                            <motion.button
                                key={key}
                                type="button"
                                className={`plan-card creator ${selectedPlan === key ? 'selected' : ''
                                    }`}
                                onClick={() => setSelectedPlan(key)}
                                whileHover={{
                                    y: -3
                                }}
                                whileTap={{
                                    scale: 0.98
                                }}
                            >

                                <div className="plan-top">

                                    <div className="plan-badge creator-badge">
                                        {plan.creator}
                                    </div>

                                    {selectedPlan === key && (
                                        <FaCheckCircle className="selected-icon" />
                                    )}

                                </div>

                                <div className="plan-content">

                                    <h3>{plan.title}</h3>

                                    <div className="price-row">
                                        <span className="currency">R$</span>

                                        <span className="price">
                                            {plan.price}
                                        </span>
                                    </div>

                                    <span className="duration">
                                        {plan.duration}
                                    </span>

                                </div>

                            </motion.button>
                        ))}

                    </div>

                    {/* CTA */}

                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                    >

                        Continuar pagamento

                        <FaArrowRight />

                    </button>

                    {/* FOOTER */}

                    <div className="bottom-info">

                        <p>
                            Já possui acesso?
                        </p>

                        <a href="https://ws-connectioncommerce.com/minha-conta/">
                            Entrar na conta
                        </a>

                    </div>

                </motion.div>

            </motion.div>

            {/* =========================================================
                STYLES
            ========================================================= */}

            <style>{`

                * {
                    box-sizing: border-box;
                }

                .signup-page {
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    background:
                        linear-gradient(
                            180deg,
                            #f7f8fa 0%,
                            #eef2f6 100%
                        );

                    padding:
                        80px 20px;

                    display: flex;
                    justify-content: center;

                    font-family:
                        Inter,
                        sans-serif;
                }

                .bg-gradient {
                    position: absolute;
                    inset: 0;

                    background:
                        radial-gradient(
                            circle at top left,
                            rgba(93, 135, 255, 0.10),
                            transparent 35%
                        ),

                        radial-gradient(
                            circle at bottom right,
                            rgba(180, 200, 255, 0.18),
                            transparent 40%
                        );

                    z-index: 0;
                }

                .bg-blur {
                    position: absolute;
                    border-radius: 999px;
                    filter: blur(100px);
                    opacity: 0.5;
                }

                .blur-1 {
                    width: 320px;
                    height: 320px;

                    background: rgba(135, 170, 255, 0.18);

                    top: -120px;
                    left: -100px;
                }

                .blur-2 {
                    width: 260px;
                    height: 260px;

                    background: rgba(255, 255, 255, 0.8);

                    right: -100px;
                    bottom: -100px;
                }

                .signup-container {
                    position: relative;
                    z-index: 2;

                    width: 100%;
                    max-width: 680px;

                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                }

                .top-badge {
                    width: fit-content;

                    display: flex;
                    align-items: center;
                    gap: 10px;

                    padding:
                        10px 16px;

                    border-radius: 999px;

                    background:
                        rgba(255,255,255,0.55);

                    border:
                        1px solid rgba(255,255,255,0.8);

                    backdrop-filter:
                        blur(12px);

                    font-size: 11px;
                    font-weight: 700;

                    letter-spacing: 0.16em;

                    color: #445066;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #87a5ff;
                }

                .hero-content {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .hero-title {
                    font-size:
                        clamp(40px, 7vw, 64px);

                    line-height: 0.95;

                    letter-spacing: -0.06em;

                    color: #111827;

                    font-weight: 800;

                    margin: 0;
                }

                .hero-title span {
                    color: #6f89ff;
                }

                .hero-description {
                    max-width: 560px;

                    color: #667085;

                    font-size: 1.05rem;

                    line-height: 1.7;

                    margin: 0;
                }

                .trust-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .trust-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;

                    padding: 22px;

                    border-radius: 24px;

                    background:
                        rgba(255,255,255,0.55);

                    backdrop-filter:
                        blur(16px);

                    border:
                        1px solid rgba(255,255,255,0.7);

                    box-shadow:
                        0 10px 30px rgba(15,23,32,0.04);
                }

                .trust-card svg {
                    font-size: 1.2rem;
                    color: #6f89ff;
                    margin-top: 2px;
                    flex-shrink: 0;
                }

                .trust-card strong {
                    display: block;

                    font-size: 0.95rem;
                    color: #111827;

                    margin-bottom: 6px;
                }

                .trust-card p {
                    margin: 0;

                    color: #667085;

                    font-size: 0.9rem;

                    line-height: 1.5;
                }

                .message {
                    padding: 16px;
                    border-radius: 18px;

                    font-size: 0.92rem;
                    font-weight: 600;

                    backdrop-filter: blur(12px);
                }

                .message.success {
                    background:
                        rgba(50, 200, 120, 0.08);

                    color:
                        #159b52;

                    border:
                        1px solid rgba(50, 200, 120, 0.2);
                }

                .message.error {
                    background:
                        rgba(255, 80, 80, 0.08);

                    color:
                        #d92d20;

                    border:
                        1px solid rgba(255, 80, 80, 0.15);
                }

                .plans-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;

                    padding: 28px;

                    border-radius: 32px;

                    background:
                        rgba(255,255,255,0.6);

                    backdrop-filter:
                        blur(20px);

                    border:
                        1px solid rgba(255,255,255,0.8);

                    box-shadow:
                        0 20px 60px rgba(15,23,32,0.06);
                }

                .section-header {
                    display: flex;
                    align-items: center;

                    font-size: 0.78rem;

                    letter-spacing: 0.18em;

                    text-transform: uppercase;

                    color: #98a2b3;

                    margin-top: 4px;
                }

                .section-header::after {
                    content: '';

                    flex: 1;

                    height: 1px;

                    margin-left: 12px;

                    background:
                        linear-gradient(
                            90deg,
                            rgba(17,24,39,0.08),
                            transparent
                        );
                }

                .creator-header {
                    margin-top: 10px;
                }

                .plans-grid {
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fit,
                        minmax(240px, 1fr)
                    );

                    gap: 16px;
                }

                .plan-card {
                    position: relative;

                    border: none;

                    background:
                        rgba(255,255,255,0.7);

                    border:
                        1px solid rgba(17,24,39,0.06);

                    border-radius: 24px;

                    padding: 22px;

                    cursor: pointer;

                    transition:
                        all 0.25s ease;

                    text-align: left;
                }

                .plan-card:hover {
                    border-color:
                        rgba(111,137,255,0.18);

                    box-shadow:
                        0 10px 30px rgba(111,137,255,0.08);
                }

                .plan-card.selected {
                    border-color:
                        rgba(111,137,255,0.35);

                    background:
                        linear-gradient(
                            180deg,
                            rgba(255,255,255,0.92),
                            rgba(245,247,255,0.96)
                        );

                    box-shadow:
                        0 15px 40px rgba(111,137,255,0.12);
                }

                .plan-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .plan-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    width: fit-content;

                    padding:
                        7px 10px;

                    border-radius: 999px;

                    background:
                        rgba(111,137,255,0.10);

                    color:
                        #6f89ff;

                    font-size: 10px;
                    font-weight: 700;

                    letter-spacing: 0.06em;

                    text-transform: uppercase;
                }

                .creator-badge {
                    background:
                        rgba(120,120,120,0.08);

                    color:
                        #667085;
                }

                .selected-icon {
                    color: #6f89ff;
                    font-size: 1rem;
                }

                .plan-content {
                    margin-top: 24px;
                }

                .plan-content h3 {
                    margin: 0;

                    color: #111827;

                    font-size: 1.05rem;
                    font-weight: 700;
                }

                .price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;

                    margin-top: 16px;
                }

                .currency {
                    color: #98a2b3;
                    font-size: 0.85rem;
                }

                .price {
                    font-size: 2rem;
                    font-weight: 800;

                    letter-spacing: -0.06em;

                    color: #111827;
                }

                .duration {
                    display: inline-block;

                    margin-top: 6px;

                    color: #98a2b3;

                    font-size: 0.9rem;
                }

                .checkout-button {
                    width: 100%;

                    height: 60px;

                    border: none;

                    border-radius: 18px;

                    margin-top: 10px;

                    background:
                        linear-gradient(
                            135deg,
                            #6f89ff,
                            #8ea3ff
                        );

                    color: white;

                    font-size: 0.96rem;
                    font-weight: 700;

                    letter-spacing: 0.02em;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;

                    cursor: pointer;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;

                    box-shadow:
                        0 14px 35px rgba(111,137,255,0.25);
                }

                .checkout-button:hover {
                    transform: translateY(-2px);
                }

                .bottom-info {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;

                    margin-top: 4px;

                    font-size: 0.92rem;
                }

                .bottom-info p {
                    margin: 0;
                    color: #667085;
                }

                .bottom-info a {
                    color: #6f89ff;
                    text-decoration: none;
                    font-weight: 600;
                }

                /* MOBILE */

                @media (max-width: 768px) {

                    .signup-page {
                        padding:
                            60px 16px;
                    }

                    .hero-title {
                        font-size:
                            clamp(34px, 10vw, 52px);
                    }

                    .trust-grid {
                        grid-template-columns: 1fr;
                    }

                    .plans-wrapper {
                        padding: 22px;
                    }

                    .plans-grid {
                        grid-template-columns: 1fr;
                    }

                    .checkout-button {
                        height: 58px;
                    }

                }

            `}</style>

        </section>
    );
}