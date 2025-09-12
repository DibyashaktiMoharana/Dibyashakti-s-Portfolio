"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import Terminal from "./Terminal";

const TerminalButton: React.FC = () => {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    const toggleTerminal = () => {
        setIsTerminalOpen(!isTerminalOpen);
    };

    return (
        <>
            {/* Terminal Toggle Button */}
            <motion.button
                onClick={toggleTerminal}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed top-4 right-4 z-[70] w-12 h-12 bg-gradient-to-br from-neutral-800 to-neutral-900 backdrop-blur-md border border-neutral-600/50 rounded-xl flex items-center justify-center hover:from-neutral-700 hover:to-neutral-800 transition-all duration-300 shadow-2xl group cursor-pointer md:top-6 md:right-6 md:w-14 md:h-14"
                aria-label="Toggle Terminal"
            >
                <motion.div
                    animate={{
                        scale: isTerminalOpen ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, type: "spring", damping: 15 }}
                >
                    <TerminalIcon className="w-5 h-5 text-white font-bold group-hover:text-green-300 transition-colors duration-300 md:w-6 md:h-6" />
                </motion.div>

                {/* Enhanced glow effect */}
                {/* <div className="absolute inset-0 rounded-xl bg-green-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

                {/* Status indicator */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${isTerminalOpen ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-neutral-500'
                    }`} />
            </motion.button>

            {/* Terminal Component */}
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        </>
    );
};

export default TerminalButton;
