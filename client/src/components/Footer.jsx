import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  // 2. Crie a referência para o container
  const topContainerRef = useRef(null);

  // 3. Adicione o useEffect para o efeito de seguir o mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!topContainerRef.current) return;
      const rect = topContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      topContainerRef.current.style.setProperty('--mouse-x', `${px}%`);
      topContainerRef.current.style.setProperty('--mouse-y', `${py}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className={styles.footer}>
      {/* 4. Modifique a div do topContainer */}
      <div 
        ref={topContainerRef}
        className={`${styles.topContainer}`}
      >
        {/* Ícones do lado esquerdo com bordas circulares */}
        <div className={styles.socialIcons}>
          <a
            href="https://wa.me/message/WQS3YHS6QHS2I1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={styles.iconWrapper}
          >
            <FaWhatsapp size={24} color="#fff" />
          </a>
          <a
            href="https://www.instagram.com/weedsmokersconnectionbrasil/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.iconWrapper}
          >
            <FaInstagram size={24} color="#fff" />
          </a>
        </div>

        {/* Logo do lado direito com fundo arredondado branco */}
        <div className={styles.logoBox}>
          <img
            src="/logo192.png"
            alt="WEED SMOKERS CONNECTION logo"
            className={styles.logo}
          />
        </div>
      </div>

      {/* Container inferior com fundo preto e texto animado */}
      <div className={styles.bottomContainer}>
        <div className={styles.scrollingTextWrapper}>
          <motion.div
            className={styles.scrollingText}
            animate={{
              x: [0, '-100%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {/* DUPLICANDO O TEXTO AQUI */}
            Copyright &copy; WEED SMOKERS CONNECTION inc. &nbsp; Copyright &copy; WEED SMOKERS CONNECTION. &nbsp; Copyright &copy; WEED SMOKERS CONNECTION.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;