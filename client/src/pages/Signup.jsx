import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../App';

// Componente <FirstClub/> fictício para o exemplo
const FirstClub = () => (
    <div style={{ 
        width: '100%', 
        padding: '2rem', 
        backgroundColor: '#121212', 
        color: '#fff', 
        textAlign: 'center', 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        borderBottom: '2px solid #57C74C' 
    }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>First Club</h1>
    </div>
);

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
                { name: formData.name, email: formData.email, password: formData.password },
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
                { plan: selectedPlan, userEmail: formData.email, userId: userId },
                { withCredentials: true }
            );
            window.location.href = response.data.init_point;
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

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1rem',
            fontFamily: 'sans-serif',
            backgroundImage: `url(${image_f49bca.png})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            color: '#fff',
            position: 'relative',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
        },
        contentWrapper: {
            zIndex: 2,
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
            paddingTop: '2rem',
        },
        introText: {
            textAlign: 'center',
            maxWidth: '700px',
            marginBottom: '2rem',
        },
        introTitle: {
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            marginBottom: '0.5rem',
            textShadow: '0 2px 5px rgba(0,0,0,0.5)',
        },
        introSubtitle: {
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            opacity: 0.9,
        },
        formPlansWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            alignItems: 'stretch',
        },
        glassContainer: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px) saturate(180%)',
            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        formInput: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontSize: '1rem',
            transition: 'border-color 0.3s ease, background-color 0.3s ease',
        },
        formInputFocus: {
            outline: 'none',
            borderColor: '#57C74C',
            background: 'rgba(255, 255, 255, 0.15)',
        },
        inputPlaceholder: {
            color: 'rgba(255, 255, 255, 0.6)',
        },
        passwordReq: {
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '0.2rem',
            lineHeight: 1.4,
        },
        errorText: {
            color: '#ff6b6b',
            fontSize: '0.8rem',
            marginTop: '0.2rem',
        },
        planOption: {
            padding: '1rem 1.2rem',
            border: '2px solid transparent',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
        },
        planSelected: {
            borderColor: '#57C74C',
            background: 'rgba(87, 199, 76, 0.2)',
            boxShadow: '0 0 15px rgba(87, 199, 76, 0.3)',
        },
        planTitle: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: 600,
        },
        planPrice: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
        },
        priceCurrency: {
            fontSize: '0.9rem',
            opacity: 0.8,
        },
        priceMain: {
            fontSize: '1.8rem',
            fontWeight: 700,
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        },
        priceOld: {
            fontSize: '0.8rem',
            textDecoration: 'line-through',
            opacity: 0.6,
        },
        submitButton: {
            background: 'linear-gradient(90deg, #57C74C, #3AA853)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 24px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            boxShadow: '0 4px 15px rgba(87, 199, 76, 0.4)',
            marginTop: '1rem',
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: 'none',
        },
        message: {
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            textAlign: 'center',
            width: '100%',
            maxWidth: '900px',
        },
        successMessage: {
            background: 'rgba(87, 199, 76, 0.2)',
            color: '#57C74C',
            border: '1px solid #57C74C',
        },
        errorMessage: {
            background: 'rgba(255, 107, 107, 0.2)',
            color: '#ff6b6b',
            border: '1px solid #ff6b6b',
        },
        infoMessage: {
            background: 'rgba(77, 172, 250, 0.2)',
            color: '#4dacfa',
            border: '1px solid #4dacfa',
        },
        loginLink: {
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.8)',
        },
        link: {
            color: '#57C74C',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s ease',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <FirstClub />
            <div style={styles.contentWrapper}>
                <div style={styles.introText}>
                    <h1 style={styles.introTitle}>Assine e Desbloqueie um Novo Futuro</h1>
                    <p style={styles.introSubtitle}>
                        Tenha acesso imediato a um ecossistema exclusivo que conecta você a médicos, fornecedores premium e as melhores espécies e extrações.
                    </p>
                </div>

                {submitMessage.text && (
                    <div style={{ ...styles.message, ...(styles[`${submitMessage.type}Message`] || {}) }}>
                        {submitMessage.text}
                    </div>
                )}

                <div style={{ ...styles.formPlansWrapper, '@media (min-width: 768px)': { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' } }}>
                    <div style={{ width: '100%', maxWidth: '450px' }}>
                        <div style={styles.glassContainer}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem' }}>Suas Informações</h2>
                            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nome completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={styles.formInput}
                                        onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
                                        onBlur={(e) => Object.assign(e.target.style, styles.formInput)}
                                    />
                                    {formErrors.name && <span style={styles.errorText}>{formErrors.name}</span>}
                                </div>
                                <div style={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="seuemail@exemplo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={styles.formInput}
                                        onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
                                        onBlur={(e) => Object.assign(e.target.style, styles.formInput)}
                                    />
                                    {formErrors.email && <span style={styles.errorText}>{formErrors.email}</span>}
                                </div>
                                <div style={styles.formGroup}>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={styles.formInput}
                                        onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
                                        onBlur={(e) => Object.assign(e.target.style, styles.formInput)}
                                    />
                                    <p style={styles.passwordReq}>
                                        Pelo menos 12 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
                                    </p>
                                    {formErrors.password && <span style={styles.errorText}>{formErrors.password}</span>}
                                </div>
                                <div style={styles.formGroup}>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        style={styles.formInput}
                                        onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
                                        onBlur={(e) => Object.assign(e.target.style, styles.formInput)}
                                    />
                                    {formErrors.confirmPassword && <span style={styles.errorText}>{formErrors.confirmPassword}</span>}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div style={{ width: '100%', maxWidth: '450px' }}>
                        <div style={styles.glassContainer}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem' }}>Escolha Seu Plano</h2>
                            <p style={{ margin: '0.5rem 0 1rem', opacity: 0.8, textAlign: 'center', fontSize: '1rem' }}>
                                Mais Saúde e um estilo de vida consciente.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                                {['semestral', 'anual'].map((plan) => (
                                    <div
                                        key={plan}
                                        onClick={() => setSelectedPlan(plan)}
                                        style={{
                                            ...styles.planOption,
                                            ...(selectedPlan === plan ? styles.planSelected : {}),
                                        }}
                                    >
                                        <h4 style={styles.planTitle}>{planOptions[plan].description}</h4>
                                        <div style={styles.planPrice}>
                                            <span style={styles.priceCurrency}>R$</span>
                                            <span style={styles.priceMain}>{planOptions[plan].price}</span>
                                            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                                                {plan === 'anual' ? '/ano' : '/semestre'}
                                            </span>
                                            {planOptions[plan].oldPrice && (
                                                <span style={styles.priceOld}>R$ {planOptions[plan].oldPrice}</span>
                                            )}
                                        </div>
                                        <p style={{ margin: '0.15rem 0 0', fontSize: '0.8rem', opacity: 0.8 }}>
                                            {planOptions[plan].duration} de acesso
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                disabled={isSubmitting || isProcessingPayment}
                                onClick={handleSubmit}
                                style={{
                                    ...styles.submitButton,
                                    ...(isSubmitting || isProcessingPayment ? styles.buttonDisabled : {})
                                }}
                            >
                                {isSubmitting ? 'Criando Conta...' : isProcessingPayment ? 'Processando Pagamento...' : `Pagar R$ ${planOptions[selectedPlan].price}`}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.loginLink}>
                    Já tem uma conta? <a href="#" onClick={() => navigate('/login')} style={styles.link}>Entrar</a>
                </div>
            </div>
        </div>
    );
}