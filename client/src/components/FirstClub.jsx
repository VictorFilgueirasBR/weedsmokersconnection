import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';
import './Signup.scss';
import FirstClub from './FirstClub'; // Linha de importação adicionada

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
            const registerResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            const { _id: userId } = registerResponse.data.user;
            setSubmitMessage({ type: 'info', text: 'Conta criada! Gerando checkout de pagamento...' });

            await handleCheckout(userId);

        } catch (error) {
            setIsSubmitting(false);
            const errorMessage = error.response?.data?.message || 'Erro ao criar a conta. Tente novamente.';
            setSubmitMessage({ type: 'error', text: errorMessage });
            console.error('Erro no registro:', error.response?.data || error.message);
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
                    userId: userId
                },
                { withCredentials: true }
            );
            const initPoint = response.data.init_point;

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
            <FirstClub /> // Componente FirstClub incluído aqui
            <div className="signup-container-wrapper">
                <div className="signup-content">
                    <h1>Assine e Desbloqueie o Futuro da Sua Cura</h1>
                    <div className="signup-highlight-box">
                        <p>
                            Cadastre-se em segundos e tenha acesso imediato a um ecossistema exclusivo que conecta você a médicos prescritores, fornecedores premium e às melhores espécies e extrações — THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e muito mais. Tudo em um só lugar, pensado para sua cura, liberdade e lifestyle leve. E tem mais: como assinante, você entra para um círculo seleto que recebe novidades e um catálogo atualizado de fornecedores toda semana — garantindo sempre acesso ao que há de melhor e mais inovador. ✨ Essa é sua chance de fazer parte de algo único. Assine agora e desbloqueie o Pass para a sua transformação.
                        </p>
                    </div>
                </div>
                {submitMessage.text && (
                    <div className={`message ${submitMessage.type}`}>
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
                                onClick={handleSubmit}
                                className="submit-gradient-btn"
                                onMouseMove={handleMouseMove}
                                style={{ marginTop: '1rem', width: '100%' }}
                            >
                                {isSubmitting ? 'Criando Conta...' : isProcessingPayment ? 'Processando Pagamento...' : `Pagar R$ ${planOptions[selectedPlan].price}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}