import React, { useState, useEffect, useRef } from 'react';
import { TrafficLightState, PendingRequest } from '../types';
import { 
  playRecognitionBeep, 
  playLongConfirmationBeep, 
  playCadencePulse, 
  subscribeSoundActivity 
} from '../utils/sound';
import { Volume2, VolumeX, Smartphone, Radio, HelpCircle, Check, ArrowRight } from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  // Estado do Semáforo
  const [phase, setPhase] = useState<TrafficLightState>('CAR_GREEN');
  const [currentSecondsLeft, setCurrentSecondsLeft] = useState<number>(15);
  const [currentCrossingTotal, setCurrentCrossingTotal] = useState<number>(15);
  const [currentWithSound, setCurrentWithSound] = useState<boolean>(false);

  // Fila de pedidos para a PRÓXIMA travessia
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [buttonClicksInQueue, setButtonClicksInQueue] = useState<number>(0);

  // Estados de interação física simulada
  const [buttonHolding, setButtonHolding] = useState<boolean>(false);
  const [longPressTriggered, setLongPressTriggered] = useState<boolean>(false);
  const buttonHoldTimer = useRef<NodeJS.Timeout | null>(null);

  // Indicador visual de som ativo
  const [buzzerVisual, setBuzzerVisual] = useState<boolean>(false);
  const [buzzerType, setBuzzerType] = useState<string>('off');

  // Pedestre animado (quadro 0 ou 1)
  const [walkFrame, setWalkFrame] = useState<number>(0);

  // Mensagem temporária de feedback do leitor/botão
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Sistema pronto. Experimente solicitar passagem.');

  // Subscrição ao observador de som
  useEffect(() => {
    const unsub = subscribeSoundActivity((active: boolean, type: string) => {
      setBuzzerVisual(active);
      setBuzzerType(type);
    });
    return unsub;
  }, []);

  // Animação de caminhada no OLED durante passagem
  useEffect(() => {
    if (phase !== 'PED_PASSING') return;
    const interval = setInterval(() => {
      setWalkFrame((prev) => (prev === 0 ? 1 : 0));
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Loop principal do semáforo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSecondsLeft((prev) => {
        // Se ainda há tempo na fase atual
        if (prev > 1) {
          const nextSec = prev - 1;

          // Se estiver na travessia de pedestre com som habilitado
          if (phase === 'PED_PASSING' && currentWithSound) {
            if (nextSec <= 2) {
              // Som contínuo nos últimos 2 segundos
              playCadencePulse(950, true);
            } else if (nextSec <= 3) {
              // Bipes rápidos (cadência acelerada)
              playCadencePulse(250);
            } else if (nextSec <= 10) {
              // Bipes intermediários
              playCadencePulse(350);
            } else {
              // Bipes espaçados no início (~900ms)
              playCadencePulse(150);
            }
          }

          return nextSec;
        }

        // Transição de Fases ao zerar o tempo:
        if (phase === 'CAR_GREEN') {
          // Passa de Verde para Amarelo (3 segundos)
          setPhase('CAR_YELLOW');
          return 3;
        }

        if (phase === 'CAR_YELLOW') {
          // Passa de Amarelo para Vermelho dos carros (Travessia Pedestre Liberada)
          setPhase('PED_PASSING');

          // Calcula a duração da travessia com base na fila acumulada
          let calculatedDuration = 15; // padrão
          let calculatedSound = false;

          if (pendingRequests.length > 0) {
            // Regra: Maior tempo solicitado vence (teto 30s)
            const maxReq = Math.max(...pendingRequests.map((r) => r.requestedSeconds));
            calculatedDuration = Math.min(30, Math.max(15, maxReq));
            calculatedSound = pendingRequests.some((r) => r.withSound);
          }

          setCurrentCrossingTotal(calculatedDuration);
          setCurrentWithSound(calculatedSound);

          // Esvazia a fila de pedidos (foram atendidos nesta abertura)
          setPendingRequests([]);
          setButtonClicksInQueue(0);

          setFeedbackMessage(`Travessia iniciada: ${calculatedDuration}s ${calculatedSound ? '(com aviso sonoro)' : ''}.`);
          return calculatedDuration;
        }

        if (phase === 'PED_PASSING') {
          // Ao terminar a travessia: Intervalo de segurança de 1 segundo
          setPhase('SAFETY_INTERVAL');
          setFeedbackMessage('Intervalo de segurança: 1s com carros ainda no vermelho.');
          return 1;
        }

        if (phase === 'SAFETY_INTERVAL') {
          // Retorna para o verde dos veículos (15s)
          setPhase('CAR_GREEN');
          setCurrentCrossingTotal(15);
          setCurrentWithSound(false);
          setFeedbackMessage('Sinal verde aberto para os veículos.');
          return 15;
        }

        return 15;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, currentWithSound, pendingRequests]);

  // AÇÃO 1: Toque curto no Botão
  const handleButtonClick = () => {
    if (longPressTriggered) {
      // Se acabou de soltar de um toque longo de 2s, não conta clique curto
      setLongPressTriggered(false);
      return;
    }

    if (buttonClicksInQueue >= 3) {
      playRecognitionBeep();
      setFeedbackMessage('Limite de 3 toques atingido na fila atual (máximo de 30s). Toque adicional não aumenta tempo.');
      return;
    }

    const nextCount = buttonClicksInQueue + 1;
    setButtonClicksInQueue(nextCount);

    // Na config padrão: 1 clique = 20s, 2 = 25s, 3 = 30s
    const targetSeconds = 15 + nextCount * 5;

    playRecognitionBeep();

    setPendingRequests((prev) => {
      // Remove pedido anterior de botão para substituir pelo novo valor
      const filtered = prev.filter((r) => r.source !== 'button');
      return [
        ...filtered,
        {
          id: `btn-${Date.now()}`,
          source: 'button',
          label: `Botão Físico (${nextCount}º toque)`,
          requestedSeconds: targetSeconds,
          withSound: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];
    });

    setFeedbackMessage(`Toque ${nextCount} aceito: próxima travessia terá ${targetSeconds}s.`);
  };

  // AÇÃO 1.B: Toque Longo de 2s no Botão
  const handleButtonMouseDown = () => {
    setButtonHolding(true);
    setLongPressTriggered(false);

    buttonHoldTimer.current = setTimeout(() => {
      setLongPressTriggered(true);
      playLongConfirmationBeep();

      setPendingRequests((prev) => {
        const filtered = prev.filter((r) => r.source !== 'button');
        return [
          ...filtered,
          {
            id: `btn-long-${Date.now()}`,
            source: 'button',
            label: 'Botão Físico (Pressionado 2s)',
            requestedSeconds: 30,
            withSound: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ];
      });

      setButtonClicksInQueue(3);
      setFeedbackMessage('Botão segurado por 2s: 30 segundos com aviso sonoro solicitados para a próxima abertura!');
    }, 2000);
  };

  const handleButtonMouseUp = () => {
    setButtonHolding(false);
    if (buttonHoldTimer.current) {
      clearTimeout(buttonHoldTimer.current);
      buttonHoldTimer.current = null;
    }
  };

  // AÇÃO 2: Apresentar Tag RFID
  const handleRfidScan = (label: string, seconds: number, withSound: boolean, isValid: boolean) => {
    if (!isValid) {
      setFeedbackMessage('Cartão não cadastrado: lido pelo leitor, mas não altera tempo.');
      return;
    }

    playRecognitionBeep();

    setPendingRequests((prev) => {
      // Evita duplicação exata imediata
      const existing = prev.find((r) => r.label === label);
      if (existing) {
        setFeedbackMessage(`Tag "${label}" reapresentada. Pedido mantido para a próxima fila.`);
        return prev;
      }
      return [
        ...prev,
        {
          id: `rfid-${Date.now()}`,
          source: 'rfid',
          label,
          requestedSeconds: seconds,
          withSound,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];
    });

    setFeedbackMessage(`Tag "${label}" reconhecida: solicitou ${seconds}s ${withSound ? 'com aviso sonoro' : ''} para a próxima travessia.`);
  };

  // AÇÃO 3: Pedir via QR Code (Celular)
  const handleQrRequest = (seconds: number, withSound: boolean) => {
    playRecognitionBeep();

    setPendingRequests((prev) => [
      ...prev,
      {
        id: `qr-${Date.now()}`,
        source: 'qr',
        label: `QR Code Celular (${seconds}s)`,
        requestedSeconds: seconds,
        withSound,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setFeedbackMessage(`Pedido pelo celular via QR Code: ${seconds}s ${withSound ? 'com aviso sonoro' : ''} registrado para a próxima fila.`);
  };

  // Cálculo da próxima travessia com base na fila
  const calculatedNextDuration = pendingRequests.length > 0
    ? Math.min(30, Math.max(15, Math.max(...pendingRequests.map((r) => r.requestedSeconds))))
    : 15;

  const nextWillHaveSound = pendingRequests.some((r) => r.withSound);

  return (
    <section id="simulador" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Cabeçalho da Simulação Educativa */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Simulação Educativa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Gêmeo Digital do Semáforo Reni
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Teste interativamente o comportamento do protótipo físico: acione o botão com toques curtos ou longos, aproxime cartões RFID simulados e envie solicitações por QR Code para observar as regras da fila.
            </p>
          </div>

          {/* Indicador de Buzzer e Áudio */}
          <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 shrink-0">
            <div className="flex items-center space-x-2">
              {buzzerVisual ? (
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {buzzerType === 'continuous' ? 'Tom Contínuo' : buzzerType === 'cadence' ? 'Bip Travessia' : 'Bip Reconhecimento'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-slate-400">
                  <VolumeX className="w-5 h-5" />
                  <span className="text-xs font-mono">Buzzer em silêncio</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grade Principal: A Caixa Física + Controles de Interação */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda: A Caixa Física do Semáforo (Renderização Fiel) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-xs bg-slate-950 p-6 rounded-3xl border-4 border-slate-700 shadow-2xl relative flex flex-col items-center space-y-6">
              
              {/* Topo: Zona RFID */}
              <div className="w-full py-2 px-3 rounded-lg bg-slate-900 border-2 border-dashed border-amber-500/60 text-center flex flex-col items-center space-y-0.5 shadow-inner">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                  Área do Leitor RFID (Topo)
                </span>
                <span className="text-[11px] text-slate-400">
                  Aproxime o cartão na área superior
                </span>
              </div>

              {/* Bloco Central dos 3 LEDs Veiculares com Chapéus/Visores */}
              <div className="w-24 bg-slate-900 p-3.5 rounded-2xl border-2 border-slate-800 flex flex-col items-center space-y-3.5 shadow-2xl">
                
                {/* LED Vermelho dos Veículos */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-[11px] ${
                      phase === 'PED_PASSING' || phase === 'SAFETY_INTERVAL'
                        ? 'bg-rose-600 border-rose-300 text-white shadow-[0_0_20px_rgba(244,63,94,0.9)]'
                        : 'bg-rose-950/60 border-rose-900/40 text-rose-800'
                    }`}
                  >
                    PARE
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Carros</span>
                </div>

                {/* LED Amarelo dos Veículos */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-[11px] ${
                      phase === 'CAR_YELLOW'
                        ? 'bg-amber-400 border-amber-200 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.9)]'
                        : 'bg-amber-950/60 border-amber-900/40 text-amber-800'
                    }`}
                  >
                    ATENÇÃO
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Carros</span>
                </div>

                {/* LED Verde dos Veículos */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-[11px] ${
                      phase === 'CAR_GREEN'
                        ? 'bg-emerald-500 border-emerald-200 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.9)]'
                        : 'bg-emerald-950/60 border-emerald-900/40 text-emerald-800'
                    }`}
                  >
                    SIGA
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Carros</span>
                </div>

              </div>

              {/* Display OLED 0,96 polegadas (128x64) */}
              <div className="w-full bg-black p-4 rounded-xl border-2 border-cyan-700/80 shadow-inner flex flex-col items-center justify-center min-h-[110px] text-center font-mono">
                <div className="text-[9px] text-cyan-500 font-bold tracking-widest uppercase mb-1">
                  OLED 128×64 • Sinal do Pedestre
                </div>

                {phase === 'PED_PASSING' ? (
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                      <span className="text-xl">{walkFrame === 0 ? '🚶' : '🚶‍♂️'}</span>
                      <span className="tracking-wider">ATRAVESSE</span>
                    </div>
                    <div className="text-4xl font-black text-white tracking-tight">
                      {currentSecondsLeft}
                      <span className="text-xs font-normal text-slate-400 ml-1">s</span>
                    </div>
                    {currentWithSound && (
                      <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                        🔊 Aviso sonoro ativo
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-2xl text-rose-500 font-bold">
                      🧍
                    </div>
                    <div className="text-lg font-black text-rose-400 tracking-wider">
                      AGUARDE
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {phase === 'SAFETY_INTERVAL' ? 'Intervalo de 1s' : 'Carros em trânsito'}
                    </span>
                  </div>
                )}
              </div>

              {/* Painel Inferior: Botão Físico e Buzzer */}
              <div className="w-full flex items-center justify-between px-3 pt-1">
                
                {/* Botão Físico com Capa */}
                <div className="flex flex-col items-center space-y-1">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onTouchStart={handleButtonMouseDown}
                    onTouchEnd={handleButtonMouseUp}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      buttonHolding
                        ? 'bg-blue-400 border-white text-slate-950 scale-95 shadow-inner'
                        : 'bg-blue-600 hover:bg-blue-500 border-blue-300 text-white'
                    }`}
                    aria-label="Pressionar botão físico do semáforo"
                    title="Clique para toque curto (adiciona tempo) ou segure por 2s (pede 30s + som)"
                  >
                    🔘
                  </button>
                  <span className="text-[10px] text-slate-300 font-medium">Botão Físico</span>
                </div>

                {/* Buzzer com Saída de Som */}
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                      buzzerVisual
                        ? 'bg-amber-500/30 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                    title="Buzzer Piezoelétrico Passivo (Furo frontal de 3mm)"
                  >
                    🔊
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">Buzzer 2 kHz</span>
                </div>

              </div>

              <div className="w-full text-center pt-1 border-t border-slate-800 text-[11px] text-slate-400">
                Fase atual: <span className="font-mono text-slate-200 font-bold">{phase}</span> ({currentSecondsLeft}s restantes)
              </div>
            </div>
          </div>

          {/* Coluna Direita: Os 3 Meios de Solicitação e Painel de Fila */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mensagem de Feedback em Tempo Real */}
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
              <span><strong>Status:</strong> {feedbackMessage}</span>
            </div>

            {/* Abas dos 3 Meios de Solicitação */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Experimente os 3 Canais de Pedido de Travessia
              </h3>

              {/* Canal 1: Botão Físico */}
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="text-sm font-bold text-white">Botão Físico (Na caixa à esquerda)</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Toques aceitos: {buttonClicksInQueue} / 3</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Toque curto (soltar):</strong> 1º toque pede 20s; 2º pede 25s; 3º pede 30s. Toques seguintes não aumentam.<br />
                  • <strong>Toque longo (segurar por 2 segundos):</strong> pede 30s com aviso sonoro para a próxima abertura.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    Simular Toque Curto
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playLongConfirmationBeep();
                      setPendingRequests((prev) => [
                        ...prev.filter((r) => r.source !== 'button'),
                        {
                          id: `btn-long-${Date.now()}`,
                          source: 'button',
                          label: 'Botão Físico (Segurado 2s)',
                          requestedSeconds: 30,
                          withSound: true,
                          timestamp: new Date().toLocaleTimeString(),
                        },
                      ]);
                      setButtonClicksInQueue(3);
                      setFeedbackMessage('Botão segurado por 2s: 30s com som solicitados para a próxima abertura!');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    Simular Toque Longo de 2s (30s + Som)
                  </button>
                </div>
              </div>

              {/* Canal 2: Tags RFID */}
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <Radio className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Cartões e Chaveiros RFID</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tags cadastradas no sistema. Cada uma tem tempo e opção de som independentes. Tags desconhecidas não solicitam tempo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleRfidScan('Chaveiro João (20s)', 20, false, true)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left text-xs space-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <span className="font-bold text-slate-200 block">Chaveiro 1</span>
                    <span className="text-[11px] text-slate-400 block">Tempo: 20s (sem som)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRfidScan('Cartão Maria (25s + Som)', 25, true, true)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-700 border border-amber-500/50 text-left text-xs space-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <span className="font-bold text-amber-300 block">Cartão 2 (Com Som)</span>
                    <span className="text-[11px] text-slate-400 block">Tempo: 25s + 🔊 Som</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRfidScan('Cartão Desconhecido', 0, false, false)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-700 border border-rose-800/60 text-left text-xs space-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <span className="font-bold text-rose-400 block">Cartão Não Cadastrado</span>
                    <span className="text-[11px] text-slate-400 block">Ignorado pelo semáforo</span>
                  </button>
                </div>
              </div>

              {/* Canal 3: QR Code Smartphone */}
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">QR Code (Página do Pedestre no Celular)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O pedestre lê o QR Code com a câmera. <strong>Apenas abrir o link não envia pedido</strong>; é necessário tocar no botão da tela móvel.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleQrRequest(23, false)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    Pedir QR de 23s (sem som)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQrRequest(29, true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-500 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    Pedir QR de 29s (com 🔊 som)
                  </button>
                </div>
              </div>

            </div>

            {/* Painel da Fila Atual vs Próxima Fila */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Estado da Fila na Placa ESP32
                </h4>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400">Próxima Travessia calculada:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {calculatedNextDuration}s {nextWillHaveSound && '(🔊 com som)'}
                  </span>
                </div>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="text-xs text-slate-500 py-3 text-center italic">
                  Nenhum pedido pendente. A próxima travessia usará a duração padrão de 15 segundos.
                </div>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {pendingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-slate-200 font-medium">{req.label}</span>
                        {req.withSound && (
                          <span className="text-[10px] text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800">
                            🔊 Som
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-slate-300">
                        Pede <strong>{req.requestedSeconds}s</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                <span>Total de solicitações aguardando: <strong>{pendingRequests.length}</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setPendingRequests([]);
                    setButtonClicksInQueue(0);
                    setFeedbackMessage('Fila de pedidos limpa manualmente.');
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 underline focus:outline-none"
                >
                  Limpar fila
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
