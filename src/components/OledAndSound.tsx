import React from 'react';
import { Eye, Volume2, BellRing, Sparkles, AlertCircle, Music } from 'lucide-react';

export const OledAndSound: React.FC = () => {
  return (
    <section id="visual-e-som" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            <span>Sinalização Acessível</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comunicação visual e sonora na travessia
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            O projeto prioriza a clareza e a previsibilidade: a tela exibe o essencial sem poluição visual, e o sinal acústico transmite a passagem do tempo através de uma cadência intuitiva.
          </p>
        </div>

        {/* Grade: OLED à esquerda, Som à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Coluna 1: O Display OLED 128x64 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 space-y-6 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold shadow-inner">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Comunicação Visual</span>
                <h3 className="text-xl font-bold text-slate-900">Display OLED 0,96" I²C</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Instalado na moldura frontal com janela dedicada. O software elimina elementos supérfluos durante a travessia para assegurar legibilidade imediata a qualquer distância de observação.
            </p>

            {/* As duas telas do OLED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Estado A: Espera */}
              <div className="bg-black p-4 rounded-xl border border-slate-800 text-center font-mono space-y-2 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Durante a Espera</span>
                <div className="py-3 space-y-1">
                  <div className="text-3xl text-rose-500" aria-label="Figura humana parada">🧍</div>
                  <div className="text-xl font-bold text-rose-400 tracking-wider">AGUARDE</div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  Figura parada + texto claro. <strong>Sem fila no visor</strong>.
                </div>
              </div>

              {/* Estado B: Passagem Liberada */}
              <div className="bg-black p-4 rounded-xl border border-cyan-800 text-center font-mono space-y-2 flex flex-col justify-between">
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest block">Durante a Travessia</span>
                <div className="py-1 space-y-0.5">
                  <div className="text-2xl text-emerald-400" aria-label="Figura humana caminhando">🚶‍♂️</div>
                  <div className="text-3xl font-black text-white tracking-tight">25<span className="text-xs text-slate-400 ml-1">s</span></div>
                  <div className="text-[11px] text-emerald-400 font-bold">ATRAVESSE</div>
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  Caminhada animada + <strong>números grandes</strong> regressivos.
                </div>
              </div>

            </div>

            {/* Regra de Interface */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-800 block">Fila exclusivamente no painel web:</strong>
              <p>
                O visor OLED nunca polui a tela do pedestre com a contagem de pessoas ou listas de espera. As informações de pedidos pendentes pertencem ao painel de administração da maquete.
              </p>
            </div>
          </div>

          {/* Coluna 2: Aviso Sonoro e Buzzer */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 space-y-6 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-inner">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Comunicação Sonora</span>
                <h3 className="text-xl font-bold text-slate-900">Buzzer Piezoelétrico Passivo</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Opera com sinal oscilante do microcontrolador (frequência de 2 kHz). O som de travessia <strong>não toca em todos os ciclos</strong>: toca exclusivamente quando solicitado por quem precisa do canal auditivo.
            </p>

            {/* Quando o som toca */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700">
              <strong className="text-slate-900 block font-semibold">Condições para o som de travessia tocar:</strong>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Por uma tag RFID previamente configurada com a opção de som ligada.</li>
                <li>Por um QR Code configurado com a opção de aviso sonoro.</li>
                <li>Pelo botão físico pressionado e segurado continuamente por 2 segundos.</li>
              </ul>
              <p className="text-slate-500 text-[11px] pt-1">
                Se ninguém do grupo atendido solicitou som, a passagem ocorre em silêncio para evitar poluição sonora urbana desnecessária.
              </p>
            </div>

            {/* Linha do Tempo da Cadência Progressiva */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Cadência Sonora Progressiva Durante a Abertura
              </span>
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Início da travessia:</span>
                  <span className="text-amber-400 font-semibold">Bipes espaçados (~900 ms)</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-300">A partir dos 10 segundos:</span>
                  <span className="text-amber-300 font-semibold">Bipes aceleram progressivamente</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Abaixo de 3 segundos:</span>
                  <span className="text-amber-200 font-semibold">Bipes muito rápidos (~250 ms)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">Últimos 2 segundos:</span>
                  <span className="text-rose-400 font-bold">TOM CONTÍNUO (aviso final)</span>
                </div>

              </div>
              <p className="text-[11px] text-slate-500">
                Ao terminar a travessia, o buzzer desliga imediatamente durante o intervalo de segurança de 1 segundo.
              </p>
            </div>

          </div>

        </div>

        {/* Alerta de Diferenciação Crucial */}
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <BellRing className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-sm font-bold text-amber-950 block">
                Atenção à diferença entre os dois tipos de som:
              </strong>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                • <strong>Bip curto de reconhecimento:</strong> Toca na hora do toque no botão ou leitura do RFID para avisar que a solicitação foi gravada na memória.<br />
                • <strong>Aviso sonoro de travessia:</strong> Toca apenas minutos depois, durante a fase vermelha veicular (passagem de pedestres liberada), com a cadência progressiva.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
