import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.topContainer}>

        <div className={styles.footerContent}>

          <div className={styles.brandInfo}>
            <span className={styles.brandName}>
              WS <span>|</span> CONNECTION®
            </span>

            <span className={styles.brandDescription}>
              CONECTANDO EXPERIÊNCIAS.
            </span>
          </div>

          <div className={styles.socialSection}>

            <span className={styles.socialLabel}>
              ACOMPANHE
            </span>

            <div className={styles.socialIcons}>

              <a
                href="https://wa.me/message/WQS3YHS6QHS2I1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.iconWrapper}
              >
                <FaWhatsapp size={19} />
              </a>

              <a
                href="https://www.instagram.com/weedsmokersconnectionbrasil/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.iconWrapper}
              >
                <FaInstagram size={19} />
              </a>

            </div>
          </div>

        </div>

      </div>

      <div className={styles.bottomContainer}>

        <span className={styles.copyright}>
          © {new Date().getFullYear()} WS | CONNECTION®.
          <span> TODOS OS DIREITOS RESERVADOS.</span>
        </span>

        <span className={styles.footerStatus}>
          <span className={styles.statusDot}></span>
          DIGITAL EXPERIENCE
        </span>

      </div>

    </footer>
  );
};

export default Footer;