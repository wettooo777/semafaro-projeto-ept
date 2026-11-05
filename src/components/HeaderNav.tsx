/**
 * ============================================================================
 * ARQUIVO: src/components/HeaderNav.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - HTML Semântico: usamos <header>, <nav> e <button> acessíveis com aria-label.
 * - CSS (Tailwind): classes como "sticky top-0" mantêm a barra fixa no topo.
 * - JavaScript (React): gerencia qual aba está ativa com "currentPage" e dispara a troca de página.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Home, 
  SlidersHorizontal, 
  CreditCard, 
  Hand, 
  Heart, 
  Info, 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Menu,
  X,
  Download 
} from 'lucide-react';
import { isSoundActive, toggleAudioSystem, subscribeSound } from '../utils/sound';

interface HeaderNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
  cardsCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  onNavigate,
  fontSize,
  onChangeFontSize,
  cardsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [buzzerPlaying, setBuzzerPlaying] = useState(false);

  // Escuta se o som está emitindo no momento para piscar indicador
  useEffect(() => {
    setSoundOn(isSoundActive());
    return subscribeSound((active) => setBuzzerPlaying(active));
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    toggleAudioSystem(next);
    setSoundOn(next);
  };

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'simulador', label: 'Semáforo', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: 'cadastro', label: 'Cadastrar Cartão', icon: <CreditCard className="w-4 h-4" />, badge: cardsCount },
    { id: 'como-usar', label: 'Como Usar', icon: <Hand className="w-4 h-4" /> },
    { id: 'inclusao', label: 'Inclusão', icon: <Heart className="w-4 h-4" /> },
    { id: 'sobre', label: 'Sobre o Projeto', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo e Nome da Escola */}
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex flex-col justify-between items-center py-1.5 px-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div>
              <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors block leading-none">
                Semáforo Inclusivo
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Colégio Reni Correia Gamper
              </span>
            </div>
          </button>

          {/* Abas de Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Menu principal">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                      active ? 'bg-slate-900 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controles de Acessibilidade (Fonte e Áudio) */}
          <div className="flex items-center space-x-2">
            
            {/* Ajuste de Tamanho do Texto */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => onChangeFontSize(Math.max(-1, fontSize - 1))}
                className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-700"
                title="Letra menor"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChangeFontSize(0)}
                className="px-2 py-1 text-slate-300 hover:text-white font-mono text-[11px]"
                title="Tamanho padrão"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeFontSize(Math.min(2, fontSize + 1))}
                className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-700"
                title="Letra maior"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Botão de Som */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                soundOn
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-slate-950" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundOn ? 'Som Ativo' : 'Mudo'}</span>
              {buzzerPlaying && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>

            {/* Botão Baixar .ZIP */}
            <a
              href="/semaforo-inteligente-inclusivo.zip"
              download="semaforo-inteligente-inclusivo.zip"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors shrink-0"
              title="Baixar projeto completo em formato .ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Baixar .ZIP</span>
            </a>

            {/* Menu Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold ${
                  active ? 'bg-amber-400 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Download ZIP no Mobile */}
          <a
            href="/semaforo-inteligente-inclusivo.zip"
            download="semaforo-inteligente-inclusivo.zip"
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white mt-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Projeto Completo (.ZIP)</span>
          </a>
        </div>
      )}
    </header>
  );
};
