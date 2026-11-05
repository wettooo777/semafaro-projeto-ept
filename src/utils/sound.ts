/**
 * ============================================================================
 * ARQUIVO: src/utils/sound.ts
 * COMENTÁRIO DE ESTUDO (Áudio no Navegador com JavaScript puro):
 * Usamos a "Web Audio API", que permite criar sons matemáticos sem precisar
 * de arquivos MP3 pesados. O som de 2000 Hz simula exatamente o buzzer piezo
 * passivo do microcontrolador ESP32!
 * ============================================================================
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

// Observadores para avisar a tela quando o som está tocando (acessibilidade para pessoas surdas)
type SoundListener = (isPlaying: boolean, toneType: string) => void;
const listeners: Set<SoundListener> = new Set();

export function subscribeSound(callback: SoundListener): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// Aliases para compatibilidade
export const subscribeSoundActivity = subscribeSound;
export const isSoundEnabled = isSoundActive;
export const setSoundEnabled = toggleAudioSystem;
export const playRecognitionBeep = playBeepShort;
export const playLongConfirmationBeep = playBeepLong;
export const playCadencePulse = playCrossingPulse;

function notifyListeners(isPlaying: boolean, toneType: string = 'normal') {
  listeners.forEach((fn) => fn(isPlaying, toneType));
}

// Inicia o motor de áudio quando o usuário interage
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundActive(): boolean {
  return soundEnabled;
}

export function toggleAudioSystem(enabled: boolean): boolean {
  soundEnabled = enabled;
  if (enabled) getAudioContext();
  return soundEnabled;
}

/**
 * COMENTÁRIO DE ESTUDO:
 * Bip curto (~80 milissegundos):
 * Toca quando um cartão é reconhecido ou quando apertamos o botão.
 */
export function playBeepShort(): void {
  notifyListeners(true, 'short');
  setTimeout(() => notifyListeners(false, 'off'), 100);

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2000, ctx.currentTime); // 2 kHz

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Evita travar se o navegador bloquear autoplay
  }
}

/**
 * COMENTÁRIO DE ESTUDO:
 * Bipe longo (~400 milissegundos):
 * Toca quando seguramos o botão por 2 segundos.
 */
export function playBeepLong(): void {
  notifyListeners(true, 'long');
  setTimeout(() => notifyListeners(false, 'off'), 420);

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2000, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {}
}

/**
 * COMENTÁRIO DE ESTUDO:
 * Pulso da travessia:
 * Toca em bipes periódicos durante a travessia, virando tom contínuo nos últimos 2s.
 */
export function playCrossingPulse(durationMs: number = 100, isContinuous: boolean = false): void {
  notifyListeners(true, isContinuous ? 'continuous' : 'cadence');
  setTimeout(() => {
    if (!isContinuous) notifyListeners(false, 'off');
  }, durationMs);

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2000, ctx.currentTime);

    const durSec = durationMs / 1000;
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.setValueAtTime(0.07, ctx.currentTime + durSec * 0.85);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durSec);
  } catch {}
}
