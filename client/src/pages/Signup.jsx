// src/pages/Signup.js
import React, { useState } from 'react';
import TransparentCheckout from '../components/TransparentCheckout';
import './Signup.css'; // Importe seu arquivo CSS para estilização

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'semestral',
  });
  const [user, setUser] = useState(null); // Estado para armazenar o usuário após o cadastro
  const [step, setStep] = useState(1); // 1: Cadastro, 2: Pagamento

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Erro no cadastro');
      }

      console.log('Usuário cadastrado com sucesso:', data);
      setUser(data.user); // Assume que o backend retorna o usuário cadastrado
      setStep(2); // Avança para a etapa de pagamento

    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error.message);
    }
  };

  const renderContent = () => {
    if (step === 1) {
      // Formulário de cadastro
      return (
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Cadastrar e Continuar
          </button>
        </form>
      );
    } else {
      // Componente de pagamento
      return (
        <TransparentCheckout
          userId={user._id} // Passa o ID do usuário cadastrado
          userEmail={user.email} // Passa o e-mail do usuário
          planId={formData.plan}
          planName={formData.plan === 'semestral' ? 'Plano Semestral' : 'Plano Anual'}
        />
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Signup;