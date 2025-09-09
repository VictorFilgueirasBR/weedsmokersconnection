// src/components/TransparentCheckout.js
import React, { useState, useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

const TransparentCheckout = ({ userId, userEmail, planId, planName }) => {
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  // Inicializa a SDK do Mercado Pago com a sua Public Key
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: 'pt-BR' });
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mercadopago/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          planName,
          userId,
          userEmail,
          payment_method_id: formData.paymentMethodId,
          token: formData.token,
          issuer_id: formData.issuerId,
          installments: formData.installments,
          payer: formData.payer
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Erro ao processar o pagamento');
      }

      console.log('Pagamento aprovado:', data);
      alert('Pagamento aprovado! Seja bem-vindo(a)!');
      // Redireciona o usuário para a página de sucesso
      window.location.href = '/success';

    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onError = async (error) => {
    console.error('Erro na SDK do Mercado Pago:', error);
    alert('Erro no pagamento. Verifique os dados e tente novamente.');
  };

  const onReady = async () => {
    // Aqui você pode ocultar o loading e mostrar o formulário
    // console.log('SDK do Mercado Pago carregada');
  };

  // Renderiza o componente CardPayment da SDK do Mercado Pago
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Finalizar Pagamento</h2>
      <CardPayment
        initialization={{ amount: 57.90 }} // Valor do plano semestral
        onSubmit={handleSubmit}
        onReady={onReady}
        onError={onError}
      />
      {loading && (
        <div className="mt-4 text-center text-blue-500">
          Processando pagamento...
        </div>
      )}
    </div>
  );
};

export default TransparentCheckout;