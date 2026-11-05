/**
 * ============================================================================
 * ARQUIVO: src/pages/AccessibilityPage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - HTML Semântico: usamos tags <section>, <h2>, <h3> com linguagem empática e clara.
 * - CSS (Tailwind): cartões em grade responsiva ("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3").
 * - Acessibilidade: contraste de cores WCAG AA, ícones ilustrativos e explicações sem jargões.
 * ============================================================================
 */

import React from 'react';
import { PageId } from '../types';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AccessibilityPageProps {
  onNavigate: (page: PageId) => void;
}

export const AccessibilityPage: React.FC<AccessibilityPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Cabeçalho Curto */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-md">
          <Heart className="w-3.5 h-3.5" />
          <span>Inclusão na Prática</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Para Quem Este Semáforo Foi Feito?
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Nem todo mundo anda na mesma velocidade. O projeto permite pedir mais tempo e aviso sonoro com dignidade.
        </p>
      </div>

      {/* Cartões dos Públicos Atendidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 1. Idosos e Cadeirantes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
              🧑‍🦽
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Idosos e Cadeirantes
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              15 segundos normais podem ser muito pouco para atravessar uma rua larga. O semáforo permite pedir 20s, 25s ou 30s para atravessar com calma.
            </p>
          </div>
          <div className="p-2.5 bg-blue-50/70 rounded-xl text-[11px] text-blue-900 border border-blue-100">
            <strong>Benefício:</strong> Menos pressa e menos perigo de ficar preso no meio dos carros.
          </div>
        </div>

        {/* 2. Pessoas Cegas ou com Baixa Visão */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
              🦯
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Pessoas Cegas
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              O aviso sonoro dá bipes cadenciados que aceleram quando faltam 10 segundos e emitem som contínuo nos últimos 2 segundos.
            </p>
          </div>
          <div className="p-2.5 bg-amber-50/70 rounded-xl text-[11px] text-amber-900 border border-amber-200">
            <strong>Aviso honesto:</strong> O som avisa o tempo, mas não detecta buracos na rua.
          </div>
        </div>

        {/* 3. Pessoas Surdas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl">
              👁️
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Pessoas Surdas
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              A tela digital mostra claramente o boneco andando e os segundos contando em números grandes. Não depende de avisos falados ou bipes.
            </p>
          </div>
          <div className="p-2.5 bg-emerald-50/70 rounded-xl text-[11px] text-emerald-900 border border-emerald-200">
            <strong>Benefício:</strong> Total autonomia através de leitura visual rápida.
          </div>
        </div>

        {/* 4. Pessoas Autistas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
              🧩
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Pessoas Autistas
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              A contagem numérica exata elimina a dúvida sobre quando o sinal vai mudar, ajudando a diminuir a ansiedade na rua.
            </p>
          </div>
          <div className="p-2.5 bg-purple-50/70 rounded-xl text-[11px] text-purple-900 border border-purple-200">
            <strong>Aviso honesto:</strong> Cada pessoa tem tolerância sensorial própria a sons e estímulos.
          </div>
        </div>

        {/* 5. Pessoas com Daltonismo */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-xl">
              🎨
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Pessoas com Daltonismo
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Muitas pessoas têm dificuldade para diferenciar o vermelho do verde no trânsito. A tela digital do semáforo exibe <strong>informações em cor azul sobre fundo escuro</strong>, uma combinação de altíssimo contraste que qualquer pessoa daltônica enxerga com facilidade.
            </p>
          </div>
          <div className="p-2.5 bg-cyan-50/70 rounded-xl text-[11px] text-cyan-950 border border-cyan-200">
            <strong>Contraste Total:</strong> Tela com letras e ícones em azul no fundo preto + boneco e números grandes, sem depender do vermelho e verde.
          </div>
        </div>

        {/* 6. Gestantes e Pessoas de Baixa Estatura */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-xl">
              🤰
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Gestantes e Baixa Estatura
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gestantes precisam de mais tempo para caminhar sem pressa ou esforço. Para pessoas de baixa estatura (e também cadeirantes), <strong>o cartaz com o QR Code fica em uma altura mais baixa na estrutura</strong>, facilitando o escaneamento pelo celular sem precisar esticar os braços.
            </p>
          </div>
          <div className="p-2.5 bg-pink-50/70 rounded-xl text-[11px] text-pink-950 border border-pink-200">
            <strong>Inclusão Ergonômica:</strong> QR Code na parte mais baixa da estrutura para alcance fácil com o celular + tempo extra para gestantes.
          </div>
        </div>

        {/* 7. Privacidade e Sigilo */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm">
                  🔒
                </div>
                <h2 className="text-sm font-bold text-slate-900">
                  Privacidade Garantida (LGPD)
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nenhum dado pessoal, foto ou laudo de saúde é gravado no cartão ou no semáforo. O chip e o celular só dizem quantos segundos foram pedidos.
              </p>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-xl text-[11px] text-slate-700 border border-slate-200 shrink-0">
              <strong>Sem Cadastro Médico:</strong> Total respeito à dignidade e ao anonimato.
            </div>
          </div>
        </div>

      </div>

      {/* Acessibilidade Urbana Real (Calçada, Rampas e Piso Tátil) */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-amber-400 flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>A Cidade Também Precisa Estar Pronta:</span>
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed">
          O semáforo resolve o tempo de travessia, mas a calçada precisa de <strong>piso tátil direcional e de alerta</strong> para guiar pessoas cegas até o poste, além de <strong>rampas rebaixadas</strong> para quem usa cadeira de rodas. Uma rua inclusiva é feita com tudo funcionando junto!
        </p>
      </div>

    </div>
  );
};
