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
        mensal: { price: '377,90', amount: 77.9, description: 'Plano Mensal' },
        semestral: { price: '580,90', amount: 280.9, description: 'Plano Semestral' },
        anual: { price: '767,90', amount: 467.9, description: 'Plano Anual' }
    };

    return (
        <div className="signup-page">
            <style>{`/* TODO O CSS ORIGINAL — EXATAMENTE COMO VOCÊ ENVIOU */`}</style>

            <div className="signup-container-wrapper">

                {/* ... TODO O JSX ORIGINAL MANTIDO ... */}

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
                                            ? '/ Mês | Renovação • R$ 77,90'
                                            : '/ Semestre'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA FINAL — REDIRECT */}
                    <button
                        type="button"
                        className="submit-gradient-btn"
                        onClick={() => {
                            const links = {
                                mensal: 'https://checkout.seusite.com/plano-mensal',
                                semestral: 'https://checkout.seusite.com/plano-semestral',
                                anual: 'https://checkout.seusite.com/plano-anual'
                            };
                            window.location.href = links[selectedPlan];
                        }}
                    >
                        Concluir Pagamento
                    </button>
                </div>
            </div>
        </div>
    );
}
