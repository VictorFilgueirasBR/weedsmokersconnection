import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Footer from '../components/Footer';
import { AuthContext } from '../App';
import './Login.scss';

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const googleSignInButtonRef = useRef(null);

  const validate = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email) {
      errors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido.';
    }

    if (!password) {
      errors.password = 'Senha é obrigatória.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' });
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://api.weedsmokersconnection.com/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token && response.data.user) {
        // Atualiza contexto
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);

        setSubmitMessage({ type: 'success', text: 'Login realizado com sucesso! Redirecionando...' });

        // Redireciona para perfil
        navigate('/profile', { replace: true });
      } else {
        setSubmitMessage({ type: 'error', text: 'Credenciais inválidas. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro de login:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  const handleGoogleCredentialResponse = async (response) => {
    setSubmitMessage({ type: '', text: '' });
    setIsSubmitting(true);

    try {
      const backendResponse = await axios.post('https://weedsmokersconnection.com/api/auth/google-login', {
        id_token: response.credential,
      });

      if (backendResponse.data.token && backendResponse.data.user) {
        setToken(backendResponse.data.token);
        setUser(backendResponse.data.user);
        localStorage.setItem('token', backendResponse.data.token);

        setSubmitMessage({ type: 'success', text: 'Login com Google realizado com sucesso! Redirecionando...' });

        navigate('/profile', { replace: true });
      } else {
        setSubmitMessage({ type: 'error', text: 'O Login com Google está em manutenção. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro no login com Google:', error.response ? error.response.data : error.message);
      let errorMessage = 'Ocorreu um erro no servidor ao fazer login com Google. Tente novamente.';
      // Verifica se o erro é 403 (acesso negado) e altera a mensagem
      if (error.response && error.response.status === 403) {
        errorMessage = 'Você ainda não é assinante, assine agora e desbloqueie seu acesso!';
      }
      setSubmitMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "502133652940-g85oucph68cj65trt1tbf36ga7kmhavt.apps.googleusercontent.com",
        callback: handleGoogleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        googleSignInButtonRef.current,
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: "100%",
          shape: "pill",
          locale: "pt-BR"
        }
      );
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-container-wrapper">
        <div className="login-content">
          <div className="login-text">
            <h1>LOGIN</h1>
            <p>Cadastre-se e tenha acesso aos fornecedores das melhores Espécies e Extrções de THC e CBD LEGALIZADOS pela ANVISA.</p>
            <p className="small-text">Garantia de Satisfação e Qualidade, ou seu dinheiro de volta.</p>
          </div>
        </div>
        <div className="login-form-container">
          <div className="login-form-glass">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              {submitMessage.text && (
                <div className={`message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  required
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                />
                {formErrors.password && <span className="error">{formErrors.password}</span>}
              </div>
              <p className="forgot-password">
                <a href="/forgot-password">Esqueceu sua senha?</a>
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                className="submit-gradient-btn"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <div className="social-login">
              <span className="or-divider">OU</span>
              <div ref={googleSignInButtonRef} className="google-sign-in-button-wrapper"></div>
            </div>
            <p className="register-link">
              Não tem uma conta? <a href="/signup">Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;