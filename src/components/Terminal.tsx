"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Array<{ type: 'command' | 'output' | 'error'; content: string }>>([
        { type: 'output', content: 'Welcome to Dibyashakti\'s Portfolio Terminal' },
        { type: 'output', content: 'Type "help" to see available commands' },
        { type: 'output', content: '─'.repeat(50) }
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    const commands = {
        help: {
            description: 'Show available commands',
            action: () => [
                'Available commands:',
                '• help - Show this help message',
                '• about - Learn about me',
                '• skills - View my technical skills',
                '• projects - See my recent projects',
                '• contact - Get my contact information',
                '• experience - View my work experience',
                '• clear - Clear the terminal',
                '• theme - Display current color scheme',
                '• whoami - Display current user info',
                '• exit/quit/close - Close the terminal'
            ]
        },
        about: {
            description: 'Learn about me',
            action: () => [
                'Hi! I\'m Dibyashakti Moharana',
                'Computer Science student passionate about full-stack development',
                'I specialize in modern web technologies and enterprise solutions',
                'Currently building scalable applications with React, Next.js, and Node.js'
            ]
        },
        skills: {
            description: 'View technical skills',
            action: () => [
                'Technical Skills:',
                '• Frontend: React, Next.js, TypeScript, Tailwind CSS',
                '• Backend: Node.js, Express, Python, Java',
                '• Databases: MongoDB, PostgreSQL, MySQL',
                '• Cloud: AWS, Docker, Vercel',
                '• Tools: Git, VS Code, Figma, Postman'
            ]
        },
        projects: {
            description: 'See recent projects',
            action: () => [
                'Recent Projects:',
                '• FinSage - Financial management platform',
                '• ACM One - Event management system',
                '• Apple Music Clone - Streaming app replica',
                '• CrypticHunt - Cybersecurity learning platform',
                '• TrackNTrash - Waste management solution'
            ]
        },
        contact: {
            description: 'Get contact information',
            action: () => [
                'Contact Information:',
                '• Email: dibyashakti.dev@gmail.com',
                '• LinkedIn: /in/dibyashakti-moharana',
                '• GitHub: /dibyashakti-dev',
                '• Location: Bhubaneswar, India'
            ]
        },
        experience: {
            description: 'View work experience',
            action: () => [
                'Work Experience:',
                '• Full Stack Developer - Various Projects (2023-Present)',
                '• Open Source Contributor - GitHub (2022-Present)',
                '• Computer Science Student - SOA University (2022-Present)'
            ]
        },
        clear: {
            description: 'Clear the terminal',
            action: () => 'CLEAR'
        },
        theme: {
            description: 'Display current color scheme',
            action: () => [
                'Current Theme: Dark Portfolio',
                '• Background: #171717 (Dark Gray)',
                '• Text: rgba(255, 255, 255, 0.87) (Light Gray)',
                '• Accent: Various gradients',
                '• Font: Inter & Raleway family'
            ]
        },
        whoami: {
            description: 'Display current user info',
            action: () => [
                'dibyashakti@portfolio-terminal',
                'Full Stack Developer | Computer Science Student',
                'Building the future, one line of code at a time.'
            ]
        },
        exit: {
            description: 'Close the terminal',
            action: () => 'EXIT'
        },
        quit: {
            description: 'Close the terminal',
            action: () => 'EXIT'
        },
        close: {
            description: 'Close the terminal',
            action: () => 'EXIT'
        }
    };

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) return;

        // Add command to history
        setHistory(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        if (commands[trimmedCmd as keyof typeof commands]) {
            const result = commands[trimmedCmd as keyof typeof commands].action();

            if (result === 'CLEAR') {
                setHistory([
                    { type: 'output', content: 'Terminal cleared' },
                    { type: 'output', content: 'Type "help" to see available commands' }
                ]);
            } else if (result === 'EXIT') {
                setHistory(prev => [...prev, { type: 'output', content: 'Closing terminal...' }]);
                setTimeout(() => onClose(), 500);
            } else if (Array.isArray(result)) {
                setHistory(prev => [...prev, ...result.map(line => ({ type: 'output' as const, content: line }))]);
            }
        } else {
            setHistory(prev => [...prev, {
                type: 'error',
                content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`
            }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
            }
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: "100%", y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: "100%", y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed top-2 right-2 left-2 bottom-2 w-auto h-auto bg-neutral-900/95 backdrop-blur-lg border border-neutral-700 rounded-lg shadow-2xl z-[60] overflow-hidden md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-[600px] md:h-[500px]"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-neutral-800 to-neutral-700 px-3 py-2 border-b border-neutral-600 md:px-4 md:py-3">
                        <div className="flex items-center gap-2 md:gap-3">
                            <TerminalIcon className="w-3 h-3 text-green-400 md:w-4 md:h-4" />
                            <span className="text-xs font-med text-neutral-200 md:text-sm">portfolio-terminal</span>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse md:w-2 md:h-2" />
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Window Controls */}
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <button
                                    className="w-2.5 h-2.5 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors hover:scale-110 md:w-3 md:h-3"
                                    title="Minimize"
                                />
                                <button
                                    className="w-2.5 h-2.5 bg-green-500 rounded-full hover:bg-green-400 transition-colors hover:scale-110 md:w-3 md:h-3"
                                    title="Maximize"
                                />
                                <button
                                    onClick={onClose}
                                    className="w-2.5 h-2.5 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 flex items-center justify-center hover:scale-110 group md:w-3 md:h-3"
                                    title="Close Terminal"
                                >
                                    <X className="w-1.5 h-1.5 text-red-900 group-hover:text-red-800 transition-colors md:w-2 md:h-2" />
                                </button>
                            </div>
                            {/* Exit Button */}
                            <button
                                onClick={onClose}
                                className="px-2 py-0.5 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded text-[10px] text-red-400 hover:text-red-300 transition-all duration-200 font-mono md:px-3 md:py-1 md:text-xs"
                                title="Exit Terminal"
                            >
                                EXIT
                            </button>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="h-full flex flex-col">
                        {/* Output Area */}
                        <div
                            ref={outputRef}
                            className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1 md:p-4 md:text-sm"
                        >
                            {history.map((line, index) => (
                                <div key={index} className={`
                  ${line.type === 'command' ? 'text-green-400' : ''}
                  ${line.type === 'output' ? 'text-neutral-300' : ''}
                  ${line.type === 'error' ? 'text-red-400' : ''}
                `}>
                                    {line.content}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center gap-2 p-3 bg-neutral-800/50 border-t border-neutral-700 md:p-4">
                            <span className="text-green-400 font-mono text-xs md:text-sm">folio@dibya~/home $</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent text-neutral-200 font-mono text-xs outline-none md:text-sm"
                                placeholder="Type a command..."
                                autoComplete="off"
                            />
                            {/* <div className="w-2 h-5 bg-green-400 animate-pulse" /> */}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
