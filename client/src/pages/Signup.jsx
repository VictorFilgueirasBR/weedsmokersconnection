import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import './Signup.scss';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const [selectedPlan, setSelectedPlan] = useState('semestral');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const checkPaymentStatus = () => {
            const paymentStatus = searchParams.get('status');
            const paymentId = searchParams.get('payment_id');

            if (paymentStatus === 'approved') {
                setSubmitMessage({ type: 'success', text: 'Seu pagamento foi aprovado! Em instantes sua conta será ativada e você será redirecionado para o seu perfil.' });
            } else if (paymentStatus === 'pending' || paymentStatus === 'in_process') {
                setSubmitMessage({ type: 'info', text: 'Seu pagamento está em análise. Você será notificado por e-mail assim que for aprovado.' });
            } else if (paymentStatus === 'rejected') {
                setSubmitMessage({ type: 'error', text: 'Seu pagamento foi rejeitado. Tente novamente ou use outra forma de pagamento.' });
            }
        };

        checkPaymentStatus();
    }, [searchParams]);

    const validate = () => {
        const errors = {};
        const { name, email, password, confirmPassword } = formData;
        if (!name) errors.name = 'Nome é obrigatório.';
        if (!email) {
            errors.email = 'Email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email inválido.';
        }
        if (!password) {
            errors.password = 'Senha é obrigatória.';
        } else if (password.length < 12) {
            errors.password = 'A senha deve ter pelo menos 12 caracteres.';
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'A senha deve conter pelo menos uma letra maiúscula.';
        } else if (!/\d/.test(password)) {
            errors.password = 'A senha deve conter pelo menos um número.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.password = 'A senha deve conter pelo menos um caractere especial.';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'As senhas não coincidem.';
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
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    };

    // A função submitSignup foi removida daqui, pois a criação da conta será feita pelo backend via webhook

    const handleCheckout = async () => {
        setSubmitMessage({ type: '', text: '' });
        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setSubmitMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' });
            return;
        }
        setIsProcessingPayment(true);
        setSubmitMessage({ type: 'info', text: 'Gerando checkout de pagamento...' });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/mercadopago/create-subscription`,
                {
                    plan: selectedPlan,
                    userEmail: formData.email, // Envie o email do usuário
                    userId: 'temporary_id' // Envie um ID temporário ou o ID gerado no frontend, se houver
                },
                { withCredentials: true }
            );
            const initPoint = response.data.init_point;
            
            // Redireciona o usuário para a página de pagamento da pré-aprovação
            window.location.href = initPoint;
            
        } catch (error) {
            setIsProcessingPayment(false);
            setSubmitMessage({ type: 'error', text: 'Erro ao gerar o pagamento. Tente novamente.' });
            console.error('Erro ao gerar pagamento:', error.response?.data || error.message);
        }
    };

    const planOptions = {
        semestral: {
            price: '57,90',
            duration: '6 meses',
            description: 'Plano Semestral',
            oldPrice: '119,90'
        },
        anual: {
            price: '87,90',
            duration: '1 ano',
            description: 'Plano Anual',
            oldPrice: '209,90'
        },
    };

    return (
        <div className="signup-page">
            <style>
                {`
                .signup-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 4rem 1rem;
                    background-image: url('/images/signup-bg.png');
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
                    font-size: 0.75rem;
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
                    padding: 0.8rem 1rem;
                    border: 2px solid transparent;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.08);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                }
                .plan-option:hover {
                    background: rgba(255,255,255,0.15);
                }
                .plan-option.selected {
                    border-color: #57C74C;
                    background: rgba(87, 199, 76, 0.2);
                    box-shadow: 0 0 15px rgba(87, 199, 76, 0.3);
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
                .plan-option .old-price {
                    font-size: 0.75rem;
                    text-decoration: line-through;
                    opacity: 0.6;
                    margin-left: 0.5rem;
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
                    background: rgba(255, 255, 255, 0.05); /* Usando um valor mais direto para o glass-bg-color-subtle */
                    backdrop-filter: blur(6px);
                    border-radius: 15px;
                    border: 1.5px solid rgba(255, 255, 255, 0.1); /* Usando um valor mais direto para o glass-border-color-subtle */
                    padding: 1.2rem 1.8rem;
                    max-width: 100%;
                    text-align: justify; /* Adicionado para justificar o texto */
                    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
                    color: #fff; /* Usando um valor mais direto para o text-color-light */
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.7rem;
                    transition: all 0.5s ease;
                }
                `}
            </style>
            <div className="signup-container-wrapper">
                <div className="signup-content">
                    <h1>Assine e Desbloqueie o Futuro da Sua Cura 🍃</h1>
                    <div className="signup-highlight-box">
                        <p>
                            Cadastre-se em segundos e tenha acesso imediato a um ecossistema exclusivo que conecta você a médicos prescritores, fornecedores premium e às melhores espécies e extrações — THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e muito mais. Tudo em um só lugar, pensado para sua cura, liberdade e lifestyle leve. E tem mais: como assinante, você entra para um círculo seleto que recebe novidades e um catálogo atualizado de fornecedores toda semana — garantindo sempre acesso ao que há de melhor e mais inovador. ✨ Essa é sua chance de fazer parte de algo único. Assine agora e desbloqueie o Pass para a sua transformação.
                        </p>
                    </div>
                </div>
                {submitMessage.text && (
                    <div className={`message ${submitMessage.type}`} style={{width: '100%', maxWidth: '900px', margin: '0 auto 2rem'}}>
                        {submitMessage.text}
                    </div>
                )}
                <div className="signup-gamification-container">
                    <div className="signup-form-container">
                        <div className="signup-form-glass">
                            <h2>Suas Informações</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nome completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="seuemail@exemplo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className="password-requirements">
                                        Pelo menos 12 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
                                    </p>
                                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formErrors.confirmPassword && (
                                        <span className="error">{formErrors.confirmPassword}</span>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="signup-plans-container">
                        <div className="signup-form-glass">
                            <h2>Escolha Seu Plano</h2>
                            <p style={{ margin: '0.5rem 0 1rem', opacity: 0.8, textAlign: 'center' }}>
                                Mais Saúde e um estilo de vida consciente.
                            </p>
                            <div className="plans-wrapper">
                                {['semestral', 'anual'].map((plan) => (
                                    <div
                                        key={plan}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`plan-option ${selectedPlan === plan ? 'selected' : ''}`}
                                    >
                                        <h4 style={{ margin: 0 }}>{planOptions[plan].description}</h4>
                                        <p style={{ margin: '0.15rem 0 0.4rem', fontSize: '0.8rem', opacity: 0.8 }}>
                                            {planOptions[plan].duration} de acesso
                                        </p>
                                        <div className="price-row">
                                            <span className="currency">R$</span>
                                            <span className="main-price">{planOptions[plan].price}</span>
                                            <span className="duration">
                                                {plan === 'anual' ? '/ano' : '/semestre'}
                                            </span>
                                            {planOptions[plan].oldPrice && (
                                                <span className="old-price">R$ {planOptions[plan].oldPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                disabled={isSubmitting || isProcessingPayment}
                                onClick={handleCheckout}
                                className="submit-gradient-btn"
                                onMouseMove={handleMouseMove}
                                style={{ marginTop: '1rem', width: '100%' }}
                            >
                                {isProcessingPayment ? 'Processando Pagamento...' : `Pagar R$ ${planOptions[selectedPlan].price}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}