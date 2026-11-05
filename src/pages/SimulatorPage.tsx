/**
 * ============================================================================
 * ARQUIVO: src/pages/SimulatorPage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - Temporizador com setInterval(): diminui 1 segundo a cada 1000 milissegundos.
 * - Máquina de Estados: transita entre 'CAR_GREEN' -> 'CAR_YELLOW' -> 'PED_PASSING' -> 'SAFETY_INTERVAL'.
 * - CSS Dinâmico: as lâmpadas acendem ou apagam aplicando classes condicionais com sombra de brilho (shadow-[0_0_16px_...]).
 * - Integração: aceita cartões cadastrados na outra aba para aproximar do semáforo com 1 clique!
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { TrafficLightState, PendingRequest, RfidCard, PageId } from '../types';
import { 
  playBeepShort, 
  playBeepLong, 
  playCrossingPulse, 
  subscribeSound 
} from '../utils/sound';
import { Volume2, VolumeX, Radio, Sparkles, CreditCard, ArrowRight } from 'lucide-react';

interface SimulatorPageProps {
  cards: RfidCard[];
  onNavigate: (page: PageId) => void;
  pendingRequests: PendingRequest[];
  onAddRequest: (req: PendingRequest) => void;
  onClearQueue: () => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({
  cards,
  onNavigate,
  pendingRequests,
  onAddRequest,
  onClearQueue,
}) => {
  // Estado da fase atual
  const [phase, setPhase] = useState<TrafficLightState>('CAR_GREEN');
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const [currentTotal, setCurrentTotal] = useState<number>(15);
  const [hasSound, setHasSound] = useState<boolean>(false);

  // Botão e toques
  const [buttonClicks, setButtonClicks] = useState<number>(0);
  const [holdingButton, setHoldingButton] = useState<boolean>(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  // Indicador visual de áudio tocando
  const [buzzerPlaying, setBuzzerPlaying] = useState<boolean>(false);

  // Boneco andando (alterna entre 0 e 1)
  const [walkFrame, setWalkFrame] = useState<number>(0);
  const [statusMsg, setStatusMsg] = useState<string>('Semáforo operando normalmente. Experimente fazer um pedido!');

  // Escuta o áudio
  useEffect(() => {
    return subscribeSound((active) => setBuzzerPlaying(active));
  }, []);

  // Animação do boneco
  useEffect(() => {
    if (phase !== 'PED_PASSING') return;
    const interval = setInterval(() => setWalkFrame((f) => (f === 0 ? 1 : 0)), 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Relógio do Semáforo (executa a cada 1 segundo)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          const next = prev - 1;

          // Se a travessia estiver liberada com som
          if (phase === 'PED_PASSING' && hasSound) {
            if (next <= 2) {
              playCrossingPulse(950, true); // Tom contínuo nos últimos 2s
            } else if (next <= 3) {
              playCrossingPulse(250); // Bipes rápidos
            } else if (next <= 10) {
              playCrossingPulse(350); // Bipes médios
            } else {
              playCrossingPulse(150); // Bipes espaçados
            }
          }

          return next;
        }

        // Transição de fases ao zerar
        if (phase === 'CAR_GREEN') {
          setPhase('CAR_YELLOW');
          setStatusMsg('Sinal amarelo dos carros. Travessia próxima.');
          return 3;
        }

        if (phase === 'CAR_YELLOW') {
          setPhase('PED_PASSING');

          let duration = 15;
          let sound = false;

          if (pendingRequests.length > 0) {
            const maxReq = Math.max(...pendingRequests.map((r) => r.requestedSeconds));
            duration = Math.min(30, Math.max(15, maxReq));
            sound = pendingRequests.some((r) => r.withSound);
          }

          setCurrentTotal(duration);
          setHasSound(sound);
          onClearQueue();
          setButtonClicks(0);

          setStatusMsg(`Carros no vermelho! Pedestres podem atravessar (${duration}s ${sound ? 'com som' : ''}).`);
          return duration;
        }

        if (phase === 'PED_PASSING') {
          setPhase('SAFETY_INTERVAL');
          setStatusMsg('Intervalo de segurança de 1 segundo antes dos carros andarem.');
          return 1;
        }

        if (phase === 'SAFETY_INTERVAL') {
          setPhase('CAR_GREEN');
          setCurrentTotal(15);
          setHasSound(false);
          setStatusMsg('Carros liberados no verde.');
          return 15;
        }

        return 15;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, hasSound, pendingRequests, onClearQueue]);

  // 1. Toque Curto no Botão
  const handleShortClick = () => {
    if (buttonClicks >= 3) {
      playBeepShort();
      setStatusMsg('Limite de 3 toques atingido na fila atual (30s).');
      return;
    }

    const next = buttonClicks + 1;
    setButtonClicks(next);
    const secs = 15 + next * 5;

    playBeepShort();
    onAddRequest({
      id: `btn-${Date.now()}`,
      source: 'button',
      label: `Botão (${next}º clique)`,
      requestedSeconds: secs,
      withSound: false,
    });

    setStatusMsg(`Clique aceito (+5s)! Próxima travessia terá ${secs} segundos.`);
  };

  // 2. Toque Longo de 2s no Botão
  const handleHoldStart = () => {
    setHoldingButton(true);
    holdTimer.current = setTimeout(() => {
      playBeepLong();
      onAddRequest({
        id: `btn-long-${Date.now()}`,
        source: 'button',
        label: 'Botão (Segurado 2s)',
        requestedSeconds: 30,
        withSound: true,
      });
      setButtonClicks(3);
      setStatusMsg('Botão segurado por 2s: 30s com bipes garantidos para a próxima abertura!');
    }, 2000);
  };

  const handleHoldEnd = () => {
    setHoldingButton(false);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  // 3. Aproximar Cartão RFID
  const handleTapCard = (card: RfidCard) => {
    playBeepShort();
    onAddRequest({
      id: `rfid-${Date.now()}`,
      source: 'rfid',
      label: card.name,
      requestedSeconds: card.timeSeconds,
      withSound: card.withSound,
    });
    setStatusMsg(`Cartão "${card.name}" reconhecido! Solicitou ${card.timeSeconds}s ${card.withSound ? 'com som' : ''}.`);
  };

  // Próxima duração calculada
  const nextDuration = pendingRequests.length > 0
    ? Math.min(30, Math.max(15, Math.max(...pendingRequests.map((r) => r.requestedSeconds))))
    : 15;
  const nextSound = pendingRequests.some((r) => r.withSound);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Interativo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Semáforo ao Vivo
          </h1>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900 text-white text-xs flex items-center space-x-2 shrink-0 border border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>{statusMsg}</span>
        </div>
      </div>

      {/* Grade: Semáforo Físico (Esquerda) e Controles Interativos (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna 1: A Caixa do Semáforo */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-xs bg-slate-950 p-6 rounded-3xl border-4 border-slate-700 shadow-2xl space-y-5 flex flex-col items-center">
            
            {/* Topo RFID */}
            <div className="w-full py-1.5 bg-slate-900 border border-dashed border-amber-500/50 rounded-xl text-center text-xs">
              <span className="font-mono font-bold text-amber-400 block text-[10px]">TOPO • ANTENA RFID</span>
              <span className="text-[11px] text-slate-400">Encoste o cartão aqui</span>
            </div>

            {/* As 3 Luzes dos Carros */}
            <div className="w-22 bg-slate-900 p-3 rounded-2xl border-2 border-slate-800 flex flex-col items-center space-y-3">
              
              {/* Vermelho */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                  phase === 'PED_PASSING' || phase === 'SAFETY_INTERVAL'
                    ? 'bg-rose-600 border-rose-300 text-white shadow-[0_0_16px_rgba(244,63,94,0.9)] scale-105'
                    : 'bg-rose-950/40 border-rose-900/30 text-rose-900'
                }`}
              >
                PARE
              </div>

              {/* Amarelo */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                  phase === 'CAR_YELLOW'
                    ? 'bg-amber-400 border-amber-200 text-slate-950 shadow-[0_0_16px_rgba(245,158,11,0.9)] scale-105'
                    : 'bg-amber-950/40 border-amber-900/30 text-amber-900'
                }`}
              >
                ATENÇÃO
              </div>

              {/* Verde */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                  phase === 'CAR_GREEN'
                    ? 'bg-emerald-500 border-emerald-200 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.9)] scale-105'
                    : 'bg-emerald-950/40 border-emerald-900/30 text-emerald-900'
                }`}
              >
                SIGA
              </div>

            </div>

            {/* Display OLED */}
            <div className="w-full bg-black p-4 rounded-2xl border-2 border-cyan-800 flex flex-col items-center justify-center min-h-[110px] font-mono text-center">
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest mb-1">
                Visor OLED • Azul em Fundo Escuro
              </span>

              {phase === 'PED_PASSING' ? (
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center space-x-1">
                    <span className="text-lg">{walkFrame === 0 ? '🚶' : '🚶‍♂️'}</span>
                    <span>ATRAVESSE</span>
                  </div>
                  <div className="text-4xl font-black text-white">
                    {secondsLeft}<span className="text-xs font-normal text-slate-400 ml-1">s</span>
                  </div>
                  {hasSound && (
                    <span className="text-[10px] text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800">
                      🔊 Bipes ativos
                    </span>
                  )}
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="text-xl text-rose-500">🧍</div>
                  <div className="text-lg font-bold text-rose-400">AGUARDE</div>
                  <span className="text-[10px] text-slate-500">
                    {phase === 'SAFETY_INTERVAL' ? 'Intervalo de 1s' : 'Carros em trânsito'}
                  </span>
                </div>
              )}
            </div>

            {/* Botão e Buzzer */}
            <div className="w-full flex items-center justify-between px-4 pt-1">
              <div className="flex flex-col items-center space-y-1">
                <button
                  type="button"
                  onClick={handleShortClick}
                  onMouseDown={handleHoldStart}
                  onMouseUp={handleHoldEnd}
                  onTouchStart={handleHoldStart}
                  onTouchEnd={handleHoldEnd}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm shadow-md transition-all active:scale-95 ${
                    holdingButton ? 'bg-blue-300 border-white text-slate-950' : 'bg-blue-600 hover:bg-blue-500 border-blue-300 text-white'
                  }`}
                  title="Clique rápido ou segure por 2s"
                >
                  🔘
                </button>
                <span className="text-[10px] text-slate-300">Botão</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                    buzzerPlaying ? 'bg-amber-400/30 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  🔊
                </div>
                <span className="text-[10px] text-slate-300">Buzzer</span>
              </div>
            </div>

            <div className="w-full text-center text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              Contagem da fase: <strong>{secondsLeft}s</strong>
            </div>

          </div>
        </div>

        {/* Coluna 2: Ações de Teste e Fila */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Teste do Botão */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 font-bold text-xs sm:text-sm flex items-center space-x-1.5">
                <span>🔘</span>
                <span>Aperte o Botão Físico:</span>
              </strong>
              <span className="text-xs text-slate-500 font-mono">Toques: {buttonClicks} / 3</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleShortClick}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-transform active:scale-95"
              >
                Clique Rápido (+5 segundos)
              </button>
              <button
                type="button"
                onClick={() => {
                  playBeepLong();
                  onAddRequest({
                    id: `btn-long-${Date.now()}`,
                    source: 'button',
                    label: 'Botão (Segurado 2s)',
                    requestedSeconds: 30,
                    withSound: true,
                  });
                  setButtonClicks(3);
                  setStatusMsg('Botão segurado por 2s: 30s com bipes garantidos para a próxima abertura!');
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700 font-bold text-xs transition-transform active:scale-95"
              >
                Segurar por 2s (30s + Bipes)
              </button>
            </div>
          </div>

          {/* Seus Cartões Cadastrados (Prontos para Encostar) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 font-bold text-xs sm:text-sm flex items-center space-x-1.5">
                <span>💳</span>
                <span>Aproximar um Cartão Cadastrado:</span>
              </strong>
              <button
                type="button"
                onClick={() => onNavigate('cadastro')}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
              >
                <span>+ Cadastrar mais</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {cards.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                Nenhum cartão cadastrado ainda. Vá na aba "Cadastrar Cartão" para criar um!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cards.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleTapCard(c)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-left transition-all active:scale-95 flex items-center justify-between"
                  >
                    <div>
                      <strong className="text-xs text-slate-900 block font-bold">{c.name}</strong>
                      <span className="text-[11px] text-slate-500">Pede {c.timeSeconds}s {c.withSound ? '🔊' : '🔇'}</span>
                    </div>
                    <Radio className="w-4 h-4 text-amber-500" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Teste Rápido de QR Code */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm flex items-center space-x-1.5">
              <span>📱</span>
              <span>Testar Pedido pelo Celular (QR Code):</span>
            </strong>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  playBeepShort();
                  onAddRequest({
                    id: `qr-${Date.now()}`,
                    source: 'qr',
                    label: 'Celular QR (23s)',
                    requestedSeconds: 23,
                    withSound: false,
                  });
                  setStatusMsg('Pedido de 23s enviado pelo celular!');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-transform active:scale-95"
              >
                Pedir 23s no Celular
              </button>
              <button
                type="button"
                onClick={() => {
                  playBeepShort();
                  onAddRequest({
                    id: `qr-${Date.now()}`,
                    source: 'qr',
                    label: 'Celular QR (29s)',
                    requestedSeconds: 29,
                    withSound: true,
                  });
                  setStatusMsg('Pedido de 29s com som enviado pelo celular!');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-500 font-bold text-xs transition-transform active:scale-95"
              >
                Pedir 29s no Celular (com bipes)
              </button>
            </div>
          </div>

          {/* Resumo da Fila da Próxima Abertura */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-amber-400 uppercase text-[11px]">
                Próxima Travessia Terá:
              </span>
              <span className="text-base font-bold font-mono text-white">
                {nextDuration} segundos {nextSound ? '(com bipes)' : ''}
              </span>
            </div>

            {pendingRequests.length === 0 ? (
              <p className="text-slate-400 italic text-[11px]">
                Nenhum pedido pendente. A próxima travessia usará 15 segundos padrão.
              </p>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {pendingRequests.map((r) => (
                  <div key={r.id} className="flex justify-between bg-slate-800 p-1.5 rounded text-[11px]">
                    <span>{r.label}</span>
                    <strong className="text-amber-300 font-mono">{r.requestedSeconds}s</strong>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-1 text-[10px] text-slate-400">
              <span>{pendingRequests.length} pedido(s) na fila</span>
              {pendingRequests.length > 0 && (
                <button
                  type="button"
                  onClick={onClearQueue}
                  className="text-rose-400 hover:text-rose-300 underline"
                >
                  Limpar fila
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
