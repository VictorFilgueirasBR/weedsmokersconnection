// src/components/WeedSmokersRules.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const rules = [
  {
    id: 1,
    title: "Regra número um",
    text: "A primeira regra do Weed Smokers Club é: você NÃO fala sobre o Weed Smokers Club."
  },
  {
    id: 2,
    title: "Regra número dois",
    text: "A segunda regra do Weed Smokers Club é: você NÃO fala sobre o Weed Smokers Club."
  },
  {
    id: 3,
    title: "Regra número três",
    text: "Chame Entre em contato com os fornecedores e pronto, pode contar com nosso auxílio e indicações"
  }
];

export default function WeedSmokersRules() {
  const [openId, setOpenId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-green-900 via-gray-900 to-black">
      {rules.map((rule) => (
        <motion.div
          key={rule.id}
          className="w-full max-w-md p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="w-full flex justify-between items-center text-left text-lg font-semibold text-white"
            onClick={() => toggleDropdown(rule.id)}
          >
            {rule.title}
            {openId === rule.id ? (
              <ChevronUp className="w-5 h-5 text-green-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-green-400" />
            )}
          </button>

          <AnimatePresence>
            {openId === rule.id && (
              <motion.div
                className="mt-3 text-gray-200 text-sm leading-relaxed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {rule.text}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
