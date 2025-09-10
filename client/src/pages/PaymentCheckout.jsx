import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentCheckout = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [pixDisplay, setPixDisplay] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [pixQrCode, setPixQrCode] = useState('');

  const userId = searchParams.get('userId');
  const userEmail = searchParams.get('userEmail');
  const amount = searchParams.get('amount');

  const PUBLIC_KEY = 'TEST-ecd8f16d-1187-460c-9f06-ecb3f03ca725';

  const createSelectOptions = (elem, options, labelsAndKeys = { label: "name", value: "id" }) => {
    const { label, value } = labelsAndKeys;
    elem.options.length = 0;
    const tempOptions = document.createDocumentFragment();
    options.forEach(option => {
      const optValue = option[value];
      const optLabel = option[label];
      const opt = document.createElement('option');
      opt.value = optValue;
      opt.textContent = optLabel;
      tempOptions.appendChild(opt);
    });
    elem.appendChild(tempOptions);
  };

  const renderPix = (response) => {
    setPixCode(response.point_of_interaction.transaction_data.qr_code);
    setPixQrCode(`data:image/png;base64,${response.point_of_interaction.transaction_data.qr_code_base64}`);
    setPixDisplay(true);
  };

  const processPixPayment = async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById('form-checkout__submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Gerando Pix...';
    const statusMessage = document.getElementById('status-message');

    const pixData = {
      userId: userId,
      amount: parseFloat(amount),
      email: document.getElementById('form-checkout__pixEmail').value,
      firstName: document.getElementById('form-checkout__payerFirstName').value,
      lastName: document.getElementById('form-checkout__payerLastName').value,
      identificationType: document.getElementById('pix-identificationType').value,
      identificationNumber: document.getElementById('pix-identificationNumber').value,
    };
    
    try {
      const response = await fetch('https://api.weedsmokersconnection.com/api/mercadopago/process-pix-payment', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pixData),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.status === "pending" && result.status_detail === "pending_waiting_transfer") {
          renderPix(result);
        } else {
          statusMessage.className = "mt-6 text-center text-red-500";
          statusMessage.textContent = 'Erro ao gerar o Pix. Tente novamente.';
        }
      } else {
        statusMessage.className = "mt-6 text-center text-red-500";
        statusMessage.textContent = result.message || 'Erro ao processar o pagamento Pix. Verifique os dados e tente novamente.';
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      statusMessage.className = "mt-6 text-center text-red-500";
      statusMessage.textContent = 'Erro de rede. Verifique sua conexão e tente novamente.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Gerar Pix';
    }
  };

  useEffect(() => {
    if (!userId || !userEmail || !amount) {
      setErrorMessage('Erro: Faltam informações do usuário ou valor do pagamento. Por favor, volte e tente novamente.');
      setLoading(false);
      return;
    }

    const loadMercadoPago = async () => {
      const { MercadoPago } = window;
      if (!MercadoPago) {
        setErrorMessage('Erro ao carregar o SDK do Mercado Pago. Tente novamente.');
        setLoading(false);
        return;
      }
      
      const mp = new MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

      const cardForm = mp.cardForm({
        amount: amount,
        iframe: true,
        form: {
          id: "form-checkout",
          cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
          expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/YY" },
          securityCode: { id: "form-checkout__securityCode", placeholder: "Cód. de segurança" },
          cardholderName: { id: "form-checkout__cardholderName", placeholder: "Nome completo" },
          issuer: { id: "form-checkout__issuer", placeholder: "Banco emissor" },
          installments: { id: "form-checkout__installments", placeholder: "Parcelas" },
          identificationType: { id: "form-checkout__identificationType", placeholder: "Tipo de documento" },
          identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "Número do documento" },
          cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail" },
        },
        callbacks: {
          onFormMounted: error => {
            if (error) {
              console.warn("Form Mounted handling error: ", error);
              return;
            }
            setLoading(false);
          },
          onSubmit: async event => {
            event.preventDefault();
            const submitButton = document.getElementById('form-checkout__submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Processando...';
            const statusMessage = document.getElementById('status-message');

            const cardData = cardForm.getCardFormData();
            
            const paymentData = {
              token: cardData.token,
              userId: userId,
              email: cardData.cardholderEmail,
              amount: parseFloat(amount),
              description: "WeedsmokersPass",
              installments: Number(cardData.installments),
              paymentMethodId: cardData.paymentMethodId,
              issuerId: cardData.issuerId,
              identificationType: cardData.identificationType,
              identificationNumber: cardData.identificationNumber,
            };
            
            try {
              const response = await fetch('https://api.weedsmokersconnection.com/api/mercadopago/process-payment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
              });

              const result = await response.json();

              if (response.ok) {
                statusMessage.className = "mt-6 text-center text-green-500";
                statusMessage.textContent = 'Pagamento aprovado! Redirecionando...';
                window.location.href = `${window.location.origin}/login`;
              } else {
                statusMessage.className = "mt-6 text-center text-red-500";
                statusMessage.textContent = result.message || 'Erro ao processar o pagamento. Verifique os dados e tente novamente.';
                submitButton.disabled = false;
                submitButton.textContent = 'Pagar Agora';
              }
            } catch (error) {
              console.error("Erro na requisição:", error);
              statusMessage.className = "mt-6 text-center text-red-500";
              statusMessage.textContent = 'Erro de rede. Verifique sua conexão e tente novamente.';
              submitButton.disabled = false;
              submitButton.textContent = 'Pagar Agora';
            }
          },
          onFetching: (resource) => {
            console.log("Fetching resource: ", resource);
            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.classList.remove('hidden');
              progressBar.removeAttribute("value");
            }
            // Removido o 'return' inválido que causava um erro de renderização
            // e mantida apenas a lógica de ocultar/mostrar a barra de progresso.
            const hideProgressBar = () => {
              if (progressBar) {
                progressBar.setAttribute("value", "0");
                progressBar.classList.add('hidden');
              }
            };
            return hideProgressBar;
          }
        },
      });

      const paymentMethodSelect = document.getElementById('payment-method');
      const form = document.getElementById('form-checkout');
      const submitButton = document.getElementById('form-checkout__submit');
      const cardFormSection = document.getElementById('card-form-section');
      const pixFormSection = document.getElementById('pix-form-section');
      const pixDisplaySection = document.getElementById('pix-display');

      const handlePaymentMethodChange = (event) => {
        if (event.target.value === 'pix') {
          cardFormSection.classList.add('hidden');
          pixFormSection.classList.remove('hidden');
          pixDisplaySection.classList.add('hidden');
          form.removeEventListener('submit', cardForm.onSubmit);
          form.addEventListener('submit', processPixPayment);
          submitButton.textContent = 'Gerar Pix';
        } else {
          cardFormSection.classList.remove('hidden');
          pixFormSection.classList.add('hidden');
          pixDisplaySection.classList.add('hidden');
          form.removeEventListener('submit', processPixPayment);
          form.addEventListener('submit', cardForm.onSubmit);
          submitButton.textContent = 'Pagar Agora';
        }
      };

      if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
      }
      
      const getIdentificationTypes = async () => {
        try {
          const identificationTypes = await mp.getIdentificationTypes();
          const pixIdentificationTypeElement = document.getElementById('pix-identificationType');
          createSelectOptions(pixIdentificationTypeElement, identificationTypes);
        } catch (e) {
          console.error('Error getting identificationTypes for Pix: ', e);
        }
      };
      
      getIdentificationTypes();
    };

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = loadMercadoPago;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [amount, userEmail, userId]);
  
  const handlePixCopy = () => {
    const copyInput = document.getElementById('pix-copy-paste');
    copyInput.select();
    try {
      document.execCommand('copy');
      const copyMessage = document.getElementById('copy-message');
      copyMessage.textContent = 'Copiado!';
      copyMessage.classList.remove('opacity-0');
      setTimeout(() => copyMessage.classList.add('opacity-0'), 2000);
    } catch (err) {
      console.error('Erro ao copiar o texto:', err);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {loading ? (
        <div id="loading-spinner" className="text-center">
          <svg className="animate-spin h-10 w-10 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600 font-semibold">Carregando...</p>
        </div>
      ) : errorMessage ? (
        <div className="text-center text-red-500 font-medium">{errorMessage}</div>
      ) : (
        <div id="payment-card" className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transform transition-all duration-300">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Finalizar Compra</h1>
          <p id="amount-display" className="text-lg font-semibold text-center text-green-600 mb-6">
            WeedsmokersPass - R${parseFloat(amount).toFixed(2).replace('.', ',')}
          </p>
          
          <form id="form-checkout" className="flex flex-col gap-4">
            <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
            <select id="payment-method" className="input-text">
              <option value="credit_card">Cartão de Crédito</option>
              <option value="pix">Pix</option>
            </select>
          
            <div id="card-form-section">
              <div id="form-checkout__cardNumber" className="container"></div>
              <div className="flex gap-4">
                <div id="form-checkout__expirationDate" className="container w-1/2"></div>
                <div id="form-checkout__securityCode" className="container w-1/2"></div>
              </div>
              <input type="text" id="form-checkout__cardholderName" className="input-text" placeholder="Nome Completo (igual no cartão)" />
              <select id="form-checkout__issuer" className="input-text"></select>
              <select id="form-checkout__installments" className="input-text"></select>
              <div className="flex gap-4">
                <select id="form-checkout__identificationType" className="input-text w-1/3"></select>
                <input type="text" id="form-checkout__identificationNumber" className="input-text w-2/3" placeholder="Número do documento" />
              </div>
              <input type="email" id="form-checkout__cardholderEmail" className="input-text" placeholder="Seu e-mail" defaultValue={userEmail} />
            </div>
          
            <div id="pix-form-section" className="hidden">
              <input type="text" id="form-checkout__payerFirstName" className="input-text" placeholder="Nome" />
              <input type="text" id="form-checkout__payerLastName" className="input-text" placeholder="Sobrenome" />
              <div className="flex gap-4">
                <select id="pix-identificationType" className="input-text w-1/3"></select>
                <input type="text" id="pix-identificationNumber" className="input-text w-2/3" placeholder="Número do documento" />
              </div>
              <input type="email" id="form-checkout__pixEmail" className="input-text" placeholder="Seu e-mail" defaultValue={userEmail} />
            </div>
          
            <button type="submit" id="form-checkout__submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4">
              Pagar Agora
            </button>
            <progress value="0" className="progress-bar hidden mt-4"></progress>
          </form>
          
          {pixDisplay && (
            <div id="pix-display" className="text-center mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pagamento Pix</h2>
              <img id="qr-code-image" src={pixQrCode} className="mx-auto rounded-lg mb-4 shadow-md w-full max-w-xs" alt="QR Code" />
              
              <label htmlFor="pix-copy-paste" className="block text-sm font-medium text-gray-700 text-left">Copiar Código Pix:</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input type="text" id="pix-copy-paste" className="flex-1 block w-full rounded-l-lg sm:text-sm border-gray-300 p-2 text-gray-700 font-mono" readOnly value={pixCode} />
                <button id="pix-copy-button" onClick={handlePixCopy} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Copiar
                </button>
              </div>
              <div id="copy-message" className="mt-2 text-sm text-center text-green-600 opacity-0 transition-opacity duration-300">Copiado!</div>
              <p className="text-xs text-gray-500 mt-4">Este QR Code expira em 15 minutos. Realize o pagamento em seu Internet Banking ou app Pix.</p>
            </div>
          )}
          
          <div id="status-message" className="mt-6 text-center text-sm font-medium"></div>
        </div>
      )}
    </div>
  );
};

export default PaymentCheckout;
