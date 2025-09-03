"use client";

import { motion } from "framer-motion";

const LiveGradientBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Main gradient background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 60%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)"
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)",
                    filter: "blur(40px)"
                }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    scale: [1, 1.2, 0.8, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-80 h-80 rounded-full opacity-25"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
                    filter: "blur(50px)"
                }}
                animate={{
                    x: [0, -120, 80, 0],
                    y: [0, 100, -60, 0],
                    scale: [1, 0.9, 1.3, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
            />

            <motion.div
                className="absolute w-72 h-72 rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
                animate={{
                    x: [0, 60, -100, 0],
                    y: [0, -40, 80, 0],
                    scale: [1, 1.1, 0.7, 1]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 10
                }}
            />

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />
        </div>
    );
};

export default LiveGradientBackground;
