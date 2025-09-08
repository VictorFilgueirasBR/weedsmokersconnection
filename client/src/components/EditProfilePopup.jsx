// src/components/EditProfilePopup.jsx

import React from "react";

import { motion, AnimatePresence } from "framer-motion";



export default function EditProfilePopup({ show }) {

 const popupVariants = {

  hidden: {

   opacity: 0,

   x: 50,

   y: 20,

   scale: 0.8,

   filter: "blur(5px)",

  },

  visible: {

   opacity: 1,

   x: 0,

   y: [0, -5, 0],

   scale: 1,

   filter: "blur(0px)",

   transition: {

    duration: 0.6,

    ease: "easeOut",

    y: {

     repeat: Infinity,

     repeatType: "reverse",

     duration: 3,

     ease: "easeInOut",

    },

  },

  },

  exit: {

   opacity: 0,

   x: 50,

   y: 20,

   scale: 0.8,

   filter: "blur(5px)",

   transition: {

    duration: 0.4,

    ease: "easeIn",

   },

  },

 };



 const glassCss = `

  .glass-balloon {

   position: relative;

   border-radius: 18px;

   padding: 0.8rem 1.2rem;

   isolation: isolate;

   backdrop-filter: blur(4px) contrast(1.1) saturate(160%);

   -webkit-backdrop-filter: blur(4px) contrast(1.1) saturate(160%);

   background: rgba(255,255,255,0.06);

   border: 2px solid rgba(236, 236, 236, 0.16);

   box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), 0 15px 40px rgba(0,0,0,0.35);

   color: #fff;

   font-weight: 600;

   max-width: 220px;

   text-align: center;

  }

  .glass-balloon::after {

   content: "";

   position: absolute;

   bottom: -8px; left: 20px;

   border-width: 8px 10px 0 10px;

   border-style: solid;

   border-color: rgba(255,255,255,0.06) transparent transparent transparent;

   filter: blur(0.2px);

  }

  .glass-small {

   position: absolute;

   bottom: -5px; right: -20px;

   border-radius: 14px;

   padding: 0.4rem 0.7rem;

   font-size: 1rem;

   font-weight: 600;

   background: rgba(255,255,255,0.08);

   border: 2px solid rgba(236,236,236,0.18);

   box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), 0 10px 25px rgba(0,0,0,0.25);

   backdrop-filter: blur(3px) contrast(1.1);

   -webkit-backdrop-filter: blur(3px) contrast(1.1);

  }

 `;



 return (

  <AnimatePresence>

   {show && (

    <motion.div

     variants={popupVariants}

     initial="hidden"

     animate="visible"

     exit="exit"

     className="relative inline-block"

    >

     <style>{glassCss}</style>



     {/* Balão principal */}

     <div className="glass-balloon">

      Edite seu perfil

      {/* Balão menor sobreposto */}

      <div className="glass-small">...</div>

     </div>

    </motion.div>

   )}

  </AnimatePresence>

 );

}