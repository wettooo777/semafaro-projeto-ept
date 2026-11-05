/**
 * ============================================================================
 * ARQUIVO: src/pages/HomePage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - Textos enxutos e fáceis de ler para qualquer pessoa.
 * - CSS Grid responsivo ("grid grid-cols-1 md:grid-cols-3") que adapta em celulares e computadores.
 * - Navegação via botões chamando a função "onNavigate(pagina)".
 * ============================================================================
 */

import React from 'react';
import { PageId } from '../types';
import { 
  ArrowRight, 
  SlidersHorizontal, 
  CreditCard, 
  Hand, 
  Heart, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      
      {/* Banner de Boas-Vindas */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-5">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Colégio Reni Correia Gamper • 2º Téc. Desenvolvimento de Sistemas</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Semáforo Inteligente <span className="text-amber-400">Inclusivo</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Um projeto escolar para permitir que idosos, gestantes e pessoas com deficiência ou baixa estatura solicitem <strong>mais tempo de travessia</strong> e <strong>aviso sonoro</strong> através do botão, de cartões RFID ou do celular.
        </p>

        {/* Botões de Ação Imediata */}
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={() => onNavigate('simulador')}
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-transform active:scale-95 shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Testar o Semáforo ao Vivo</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cadastro')}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-transform active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Cadastrar Novo Cartão</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Protótipo escolar de bancada • Desenvolvido para pesquisa e demonstrações.</span>
        </div>
      </section>

      {/* 3 Cartões Rápidos: Como Funciona */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Como funciona em 3 pontos rápidos:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <span className="text-2xl block">🚦</span>
            <strong className="text-slate-900 font-bold text-sm block">1. As luzes são dos carros</strong>
            <p className="text-slate-600 leading-relaxed">
              Verde e amarelo = carros andam (pedestre aguarda). Vermelho = carros parados (pedestre pode atravessar com segurança).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <span className="text-2xl block">📺</span>
            <strong className="text-slate-900 font-bold text-sm block">2. Visor e som para você</strong>
            <p className="text-slate-600 leading-relaxed">
              A tela digital mostra "AGUARDE" ou o bonequinho andando com os segundos contando. Bipes sonoros avisam antes de fechar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <span className="text-2xl block">⏱️</span>
            <strong className="text-slate-900 font-bold text-sm block">3. Tempo para a próxima vez</strong>
            <p className="text-slate-600 leading-relaxed">
              Qualquer pedido vale para a <em>próxima travessia</em>. O semáforo dá o maior tempo solicitado ao grupo (sem somar tudo).
            </p>
          </div>

        </div>
      </section>

      {/* Acesso aos Recursos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        <button
          type="button"
          onClick={() => onNavigate('como-usar')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <Hand className="w-4 h-4 text-blue-600" />
            <strong className="text-slate-900 font-semibold">Como Usar</strong>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('cadastro')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <strong className="text-slate-900 font-semibold">Cadastrar Cartão</strong>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('inclusao')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <Heart className="w-4 h-4 text-rose-600" />
            <strong className="text-slate-900 font-semibold">Inclusão</strong>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('sobre')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <strong className="text-slate-900 font-semibold">Sobre o Projeto</strong>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

      </section>

    </div>
  );
};
