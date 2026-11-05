/**
 * ============================================================================
 * ARQUIVO: src/components/SimpleFooter.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS):
 * - HTML Semântico: usamos <footer> com links de navegação secundária e créditos.
 * - CSS (Tailwind): borda sutil ("border-t border-slate-800") e alinhamento flexível.
 * - Créditos Discretos: posicionados no final da página, com nomes dos estudantes e professor.
 * ============================================================================
 */

import React from 'react';
import { PageId } from '../types';
import { ArrowUp, GraduationCap } from 'lucide-react';

interface SimpleFooterProps {
  onNavigate: (page: PageId) => void;
}

export const SimpleFooter: React.FC<SimpleFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        {/* Navegação Rápida entre as 6 Páginas */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-300 pb-6 border-b border-slate-800">
          <button type="button" onClick={() => onNavigate('inicio')} className="hover:text-amber-400 transition-colors">Início</button>
          <button type="button" onClick={() => onNavigate('simulador')} className="hover:text-amber-400 transition-colors">Semáforo ao Vivo</button>
          <button type="button" onClick={() => onNavigate('cadastro')} className="hover:text-amber-400 transition-colors">Cadastrar Cartão</button>
          <button type="button" onClick={() => onNavigate('como-usar')} className="hover:text-amber-400 transition-colors">Como Usar</button>
          <button type="button" onClick={() => onNavigate('inclusao')} className="hover:text-amber-400 transition-colors">Inclusão</button>
          <button type="button" onClick={() => onNavigate('sobre')} className="hover:text-amber-400 transition-colors">Sobre o Projeto</button>
          <a href="/semaforo-inteligente-inclusivo.zip" download="semaforo-inteligente-inclusivo.zip" className="text-amber-400 hover:text-amber-300 transition-colors font-bold flex items-center space-x-1">
            <span>Baixar Projeto (.ZIP)</span>
          </a>
        </div>

        {/* Linha de Créditos Discretos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-slate-200 font-bold flex items-center justify-center sm:justify-start space-x-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Colégio Estadual Prof. Reni Correia Gamper</span>
            </div>
            <p>
              2º Técnico em Desenvolvimento de Sistemas • Manoel Ribas - PR
            </p>
            <p className="text-[11px] text-slate-500">
              Alunos: Ana Julia, Bianca, Henrique e Welliton • Orientador: Prof. Richardson
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center space-x-1 text-xs transition-colors"
              title="Voltar ao início da página"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Topo</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

