/**
 * ============================================================================
 * ARQUIVO: src/pages/HowToUsePage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - HTML Semântico: usamos tags <section>, <h2>, <h3> e botões acessíveis.
 * - CSS (Tailwind): classes como "grid grid-cols-1 md:grid-cols-3" criam colunas flexíveis.
 * - JAVASCRIPT: a função "onNavigate('simulador')" permite pular direto para testar!
 * ============================================================================
 */

import React from 'react';
import { PageId } from '../types';
import { 
  Hand, 
  CreditCard, 
  Smartphone, 
  Clock, 
  Volume2, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface HowToUsePageProps {
  onNavigate: (page: PageId) => void;
}

export const HowToUsePage: React.FC<HowToUsePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Cabeçalho Curto */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
          <Hand className="w-3.5 h-3.5" />
          <span>Guia do Pedestre</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Como Pedir a Travessia
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Você pode pedir tempo no semáforo de 3 maneiras muito simples.
        </p>
      </div>

      {/* 3 Cartões: As Formas de Pedir */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. O Botão */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
              🔘
            </div>
            <h2 className="text-base font-bold text-slate-900">
              1. Pelo Botão Vermelho
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fica na caixinha preta com relevo em Braille e seta tátil para localização com as mãos.
            </p>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block text-[11px] mb-0.5">⚡ Toque rápido (apertar e soltar):</strong>
                <span className="text-slate-600">Dá 1 bipe curto. Adiciona +5s na próxima vez (1º toque: 20s, 2º: 25s, 3º: 30s).</span>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950">
                <strong className="block text-[11px] mb-0.5">⏱️ Segurar por 2 segundos:</strong>
                <span className="text-blue-900">Dá 1 bipe longo. Pede <strong>30 segundos</strong> e liga o <strong>aviso sonoro</strong>.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('simulador')}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1 transition-transform active:scale-95"
          >
            <span>Apertar Botão no Simulador</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 2. O Cartão ou Chaveiro */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
              💳
            </div>
            <h2 className="text-base font-bold text-slate-900">
              2. Cartão ou Chaveiro RFID
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal para quem prefere não esticar o braço até o botão.
            </p>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block text-[11px] mb-0.5">📍 Onde encostar:</strong>
                <span className="text-slate-600">Aproxime no <strong>topo da caixa</strong>. Ao reconhecer o cartão cadastrado, faz 1 bipe curto.</span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950">
                <strong className="block text-[11px] mb-0.5">⚙️ Tempo personalizado:</strong>
                <span className="text-amber-900">O semáforo aplica o tempo (15 a 30s) e o som que foram salvos no cartão.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('cadastro')}
            className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 transition-transform active:scale-95"
          >
            <span>Ver ou Cadastrar Cartões</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 3. Pelo Celular */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl">
              📱
            </div>
            <h2 className="text-base font-bold text-slate-900">
              3. Celular (QR Code)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Para pedir a travessia pelo smartphone conectado à rede.
            </p>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block text-[11px] mb-0.5">📶 Passo a passo:</strong>
                <span className="text-slate-600">Conecte no Wi-Fi da maquete e aponte a câmera para o QR Code (fixado na parte mais baixa da estrutura para facilitar o alcance de gestantes, pessoas de baixa estatura e cadeirantes).</span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                <strong className="block text-[11px] mb-0.5">⚠️ Regra importante:</strong>
                <span className="text-emerald-900">Abrir a página não basta: você precisa <strong>clicar no botão verde</strong> na tela do celular!</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('simulador')}
            className="w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center space-x-1 transition-transform active:scale-95"
          >
            <span>Testar QR no Simulador</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Regras Importantes com Palavras Simples */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-amber-400 flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Duas Regras Fáceis de Entender:</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-white block font-bold">1. O pedido entra na próxima vez</strong>
            <p className="text-slate-300 leading-relaxed">
              Se os pedestres já estiverem atravessando, o seu pedido fica guardado para a próxima abertura. O semáforo não estica o tempo no meio para proteger a todos de freadas bruscas.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-white block font-bold">2. O maior tempo atende ao grupo</strong>
            <p className="text-slate-300 leading-relaxed">
              Se várias pessoas pedirem tempos diferentes (20s, 25s e 30s), o semáforo usa 30 segundos (o maior). Ele não soma os tempos para não fechar a rua por muitos minutos.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
