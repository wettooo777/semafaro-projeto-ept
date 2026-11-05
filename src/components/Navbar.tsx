import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, subscribeSoundActivity } from '../utils/sound';

interface NavbarProps {
  fontSizeLevel: number;
  onFontSizeChange: (level: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ fontSizeLevel, onFontSizeChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActiveState] = useState(false);
  const [buzzerPlaying, setBuzzerPlaying] = useState(false);

  useEffect(() => {
    setSoundActiveState(isSoundEnabled());
    const unsubscribe = subscribeSoundActivity((active: boolean) => {
      setBuzzerPlaying(active);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    const newState = !soundActive;
    setSoundEnabled(newState);
    setSoundActiveState(newState);
  };

  const navLinks = [
    { href: '#proposito', label: 'Propósito' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#simulador', label: 'Simulador' },
    { href: '#formas-de-pedido', label: 'Como Pedir' },
    { href: '#visual-e-som', label: 'OLED & Som' },
    { href: '#inclusao-e-rota', label: 'Inclusão & Rota' },
    { href: '#painel-e-acesso', label: 'Painel & Rede' },
    { href: '#componentes', label: 'Componentes' },
    { href: '#faq', label: 'Dúvidas' },
  ];

  return (
    <>
      {/* Link de salto de acessibilidade para navegação por teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-950 focus:font-bold focus:shadow-lg focus:rounded-md"
      >
        Pular para o conteúdo principal
      </a>

      <header className="sticky top-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Identidade */}
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
                aria-label="Semáforo Inteligente Inclusivo - Página inicial"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center p-1.5 shadow-inner">
                  {/* Ícone estilizado do semáforo com 3 pontos */}
                  <div className="flex flex-col justify-between items-center h-full w-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" aria-hidden="true" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" aria-hidden="true" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-slate-100 group-hover:text-amber-400 transition-colors">
                    Semáforo Inclusivo
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Colégio Reni Correia Gamper
                  </span>
                </div>
              </a>
            </div>

            {/* Links desktop */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Navegação principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Controles de Acessibilidade & Áudio */}
            <div className="flex items-center space-x-2">
              {/* Botão de ajuste de fonte */}
              <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700" role="group" aria-label="Ajuste de tamanho do texto">
                <button
                  type="button"
                  onClick={() => onFontSizeChange(Math.max(-1, fontSizeLevel - 1))}
                  disabled={fontSizeLevel <= -1}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  title="Diminuir tamanho do texto"
                  aria-label="Diminuir tamanho do texto"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange(0)}
                  className="px-2 py-1 text-xs font-mono text-slate-300 hover:text-white rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  title="Tamanho padrão de texto"
                  aria-label="Redefinir tamanho do texto para padrão"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange(Math.min(2, fontSizeLevel + 1))}
                  disabled={fontSizeLevel >= 2}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  title="Aumentar tamanho do texto"
                  aria-label="Aumentar tamanho do texto"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botão de Som da Simulação */}
              <button
                type="button"
                onClick={toggleSound}
                className={`relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  soundActive
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                aria-pressed={soundActive}
                aria-label={soundActive ? 'Desativar áudio da simulação' : 'Ativar áudio da simulação (opcional)'}
                title="Ativar ou silenciar sons do protótipo educativo"
              >
                {soundActive ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {soundActive ? 'Som ligado' : 'Som desligado'}
                </span>
                {buzzerPlaying && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"
                    aria-hidden="true"
                    title="Buzzer emitindo som"
                  />
                )}
              </button>

              {/* Botão menu mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menu de seções"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Tamanho da fonte:</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onFontSizeChange(Math.max(-1, fontSizeLevel - 1))}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-xs rounded text-slate-200"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange(0)}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-xs rounded text-slate-200"
                >
                  Padrão
                </button>
                <button
                  type="button"
                  onClick={() => onFontSizeChange(Math.min(2, fontSizeLevel + 1))}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-xs rounded text-slate-200"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
