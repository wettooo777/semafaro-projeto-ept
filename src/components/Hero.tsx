import React from 'react';
import { ShieldAlert, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="proposito" className="relative pt-10 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Elementos decorativos sutis no fundo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna de texto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-400 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Colégio Reni Correia Gamper • 2º Téc. em Desenvolvimento de Sistemas</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Semáforo Inteligente <span className="text-amber-400">Inclusivo</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Uma pesquisa aplicada sobre como tornar a comunicação e a solicitação de travessia urbana mais acessíveis. O sistema combina <strong>informação visual dedicada</strong>, <strong>aviso sonoro opcional com cadência progressiva</strong> e <strong>múltiplas formas de solicitar tempo</strong> adaptadas às diferentes necessidades de deslocamento.
            </p>

            {/* Aviso transparente de escopo e responsabilidade */}
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 text-sm text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Escopo Educacional do Protótipo</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                Este projeto é um <strong>protótipo educacional de bancada</strong> construído para pesquisa e demonstração. Não foi homologado nem certificado para operar no trânsito de vias públicas. Seu objetivo inclusivo é apresentado com responsabilidade técnica, sem alegar acessibilidade universal comprovada.
              </p>
            </div>

            {/* Ações rápidas */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#como-funciona"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <span>Entenda como funciona</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#simulador"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span>Ver simulação educativa</span>
              </a>
            </div>

            {/* Pilares fundamentais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white block">3 Formas de Pedido:</strong> Botão com toques, RFID e QR Code
                </span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white block">Regra da Próxima Fila:</strong> Travessia em andamento nunca é alterada
                </span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white block">Maior Tempo Ganha:</strong> Não há acúmulo desordenado de tempo
                </span>
              </div>
            </div>
          </div>

          {/* Coluna visual: Representação da maquete e estrutura */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Unidade Demonstradora</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  V6.1 / Caixa V11
                </span>
              </div>

              {/* Caixa física simplificada */}
              <div className="relative bg-slate-950 p-4 rounded-xl border-2 border-slate-700 shadow-inner flex flex-col items-center space-y-4">
                {/* Zona RFID do topo */}
                <div className="w-3/4 py-1.5 px-3 bg-slate-900 border border-dashed border-amber-500/60 rounded text-center">
                  <span className="text-[11px] font-mono text-amber-300 flex items-center justify-center space-x-1">
                    <span>📡</span>
                    <span>Antena RFID (Topo)</span>
                  </span>
                </div>

                {/* Semáforo dos veículos */}
                <div className="flex flex-col space-y-2.5 bg-slate-900 p-3 rounded-lg border border-slate-800 w-20 items-center">
                  <div className="w-10 h-10 rounded-full bg-rose-600/80 border-2 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)] flex items-center justify-center text-[10px] font-bold text-white">
                    PARE
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-900/60 opacity-40" />
                  <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-900/60 opacity-40" />
                </div>

                {/* Display OLED */}
                <div className="w-full bg-black p-3 rounded border border-cyan-800/80 font-mono text-cyan-400 flex flex-col items-center justify-center space-y-1">
                  <span className="text-[10px] text-cyan-300 font-bold tracking-wider">OLED 128×64</span>
                  <span className="text-xs font-bold text-emerald-400">🚶 ATRAVESSE</span>
                  <span className="text-2xl font-black text-white">25<span className="text-xs text-slate-400 font-normal">s</span></span>
                </div>

                {/* Botão e Buzzer */}
                <div className="flex items-center justify-between w-full px-4 pt-1">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 border border-blue-400 shadow-sm flex items-center justify-center text-white text-[10px]">
                      🔘
                    </div>
                    <span className="text-[10px] text-slate-400">Botão</span>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] text-amber-400">
                      🔊
                    </div>
                    <span className="text-[10px] text-slate-400">Buzzer 2 kHz</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 leading-snug">
                As luzes indicam a condição dos <strong>veículos</strong>. Quando os carros estão no vermelho, a travessia de pedestres é liberada.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
