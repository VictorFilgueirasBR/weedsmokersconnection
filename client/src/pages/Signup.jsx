import React, { useState } from 'react';
import FirstClub from '../components/FirstClub'; // Importa o novo componente
import GlassSignup from '../components/GlassSignup';
import '../styles/Signup.scss';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        const { name, email, password, confirmPassword } = formData;

        if (!name) {
            errors.name = 'Nome é obrigatório.';
        }
        if (!email) {
            errors.email = 'Email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email inválido.';
        }
        if (!password) {
            errors.password = 'Senha é obrigatória.';
        } else if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            errors.password = 'A senha deve ter pelo menos 12 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.';
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirmação de senha é obrigatória.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'As senhas não coincidem.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage({ text: '', type: '' });

        if (validateForm()) {
            try {
                // Simulação de chamada de API
                console.log('Dados do formulário enviados:', formData);
                setSubmitMessage({ text: 'Cadastro realizado com sucesso!', type: 'success' });
            } catch (error) {
                setSubmitMessage({ text: 'Erro ao cadastrar. Tente novamente.', type: 'error' });
            }
        } else {
            setSubmitMessage({ text: 'Por favor, corrija os erros no formulário.', type: 'error' });
        }
    };

    return (
        <div className="signup-main-container">
            <FirstClub />
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
                            <form onSubmit={handleSubmit}>
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
                                <button type="submit" className="signup-submit-button">Criar Conta</button>
                            </form>
                        </div>
                    </div>
                    <div className="signup-plans-container">
                        <GlassSignup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;