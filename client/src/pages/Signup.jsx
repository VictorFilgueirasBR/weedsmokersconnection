// src/components/Signup.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import './Signup.scss';
import { FaUserCircle, FaEnvelope, FaLock, FaCheckCircle, FaCoins, FaHandshake, FaCannabis } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const [selectedPlan, setSelectedPlan] = useState('mensal');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    // A lógica de verificação de status do pagamento é mantida
    // para exibir mensagens de feedback ao usuário após o redirecionamento.
    useEffect(() => {
        const paymentStatus = searchParams.get('status');
        const paymentId = searchParams.get('payment_id');

        if (paymentStatus === 'approved') {
            setSubmitMessage({ type: 'success', text: 'Seu pagamento foi aprovado! Em instantes sua conta será ativada e você será redirecionado para o seu perfil.' });
            // Redireciona o usuário para o perfil após a confirmação do pagamento
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else if (paymentStatus === 'pending' || paymentStatus === 'in_process') {
            setSubmitMessage({ type: 'info', text: 'Seu pagamento está em análise. Você será notificado por e-mail assim que for aprovado.' });
        } else if (paymentStatus === 'rejected') {
            setSubmitMessage({ type: 'error', text: 'Seu pagamento foi rejeitado. Tente novamente ou use outra forma de pagamento.' });
        }
    }, [searchParams, navigate]);

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

    // A requisição de registro e o redirecionamento foram unidos aqui.
    const handleSubmit = async () => {
        setSubmitMessage({ type: '', text: '' });
        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setSubmitMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' });
            return;
        }
        setIsSubmitting(true);
        setSubmitMessage({ type: 'info', text: 'Criando sua conta...' });

        try {
            // 1. Tenta registrar o usuário
            const registerResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            const { userId, userEmail } = registerResponse.data;
            setSubmitMessage({ type: 'info', text: 'Conta criada! Redirecionando para o pagamento...' });

            // 2. Redireciona o usuário para a página de checkout transparente.
            // Passamos o userId e o email como parâmetros de URL.
            navigate(`/payment_checkout.html?userId=${userId}&userEmail=${userEmail}&plan=${selectedPlan}&amount=${planOptions[selectedPlan].amount}`);

            // Note: Não há uma requisição 'await' aqui, pois a navegação é imediata.
            // O estado de carregamento de pagamento será gerenciado na nova página.
        } catch (error) {
            setIsSubmitting(false);
            const serverMessage = error.response?.data?.msg;

            if (serverMessage === 'Usuário já existe. Por favor, faça login.') {
                setSubmitMessage({
                    type: 'error',
                    text: 'Este e-mail já está cadastrado. Por favor, faça login para continuar.'
                });
            } else if (serverMessage === 'Este email já está cadastrado, mas o pagamento ainda não foi confirmado. Prossiga para o pagamento.') {
                setSubmitMessage({
                    type: 'info',
                    text: 'Seu cadastro foi encontrado, mas o pagamento não foi concluído. Redirecionando para o pagamento...'
                });
                // Redireciona para o checkout transparente com o userId retornado pelo backend
                const { userId } = error.response.data;
                navigate(`/payment_checkout.html?userId=${userId}&userEmail=${formData.email}&plan=${selectedPlan}`);
            } else {
                const errorMessage = serverMessage || 'Erro ao criar a conta. Tente novamente.';
                setSubmitMessage({ type: 'error', text: errorMessage });
            }

            console.error('Erro no registro:', error.response?.data || error.message);
        }
    };

    const planOptions = {
        mensal: {
            price: '27,90',
            amount: 27.90,
            duration: '1 mês',
            description: 'Plano Mensal',
        },
        semestral: {
            price: '47,90',
            amount: 47.90,
            duration: '6 meses',
            description: 'Plano Semestral',
        },
        anual: {
            price: '77,90',
            amount: 77.90,
            duration: '1 ano',
            description: 'Plano Anual',
        },
    };

    return (
        <div className="signup-page">
            <style>
                {`
                /* ... (CSS and HTML are the same as before, no changes needed here) ... */
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
                `}
            </style>
            <div className="signup-container-wrapper">
                <div className="signup-content">
                    <h1>Assine e Desbloqueie o Futuro da Sua Cura</h1>
                    <div className="signup-highlight-box">
                        <p>
                            Cadastre-se em segundos e tenha acesso imediato a um ecossistema exclusivo que conecta você a:
                        </p>
                        <ul className="highlight-list">
                            <li className="highlight-item">
                                <FaHandshake />
                                <span>Médicos prescritores e fornecedores premium, selecionados a dedo.</span>
                            </li>
                            <li className="highlight-item">
                                <FaCannabis />
                                <span>As melhores Espécies de Flores em Natura e Extrações do mercado: THC (ICE, Hash, Rosin, FullSpectrum, Diamonds), Gummies de THC, CBD e muito mais.</span>
                            </li>
                            <li className="highlight-item">
                                <FaCheckCircle />
                                <span>Como assinante, você entra para um círculo seleto que recebe um catálogo atualizado de fornecedores toda semana.</span>
                            </li>
                        </ul>
                        <p>
                            Tudo em um só lugar, pensado para sua cura, liberdade e lifestyle leve. Essa é sua chance de fazer parte de algo único.
                        </p>
                    </div>
                </div>
                {submitMessage.text && (
                    <div className={`message ${submitMessage.type}`}>
                        {submitMessage.text}
                    </div>
                )}
                <div className="signup-form-glass">
                    <h2>Criar sua Conta</h2>
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
                        <div className="form-section-divider"></div>
                        <h2>Escolha Seu Plano</h2>
                        <div className="plans-wrapper">
                            {['mensal', 'semestral', 'anual'].map((plan) => (
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
                                            {plan === 'anual' ? '/ano' : (plan === 'mensal' ? '/mês' : '/semestre')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className="submit-gradient-btn"
                            onMouseMove={handleMouseMove}
                            style={{ width: '100%' }}
                        >
                            {isSubmitting ? 'Criando Conta...' : `Finalizar pagamento R$ ${planOptions[selectedPlan].price}`}
                        </button>
                    </form>
                    <div className="login-link">
                        Já tem uma conta? <a href="/login">Faça Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}