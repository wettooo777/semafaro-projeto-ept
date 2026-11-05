import React from 'react';
import { Clock, ShieldCheck, ArrowRightCircle, AlertCircle, Users2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            <span>Ciclo Operacional & Lógica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Como funciona o ciclo do semáforo
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Uma das características mais importantes para o visitante compreender é que as três luzes coloridas da caixa indicam a condição <strong>dos veículos</strong>. O pedestre acompanha seu estado diretamente pelo display gráfico OLED e pelo som do buzzer.
          </p>
        </div>

        {/* As 4 Fases do Ciclo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Fase 1: Verde dos Carros */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  Fase 1 • Verde Veicular
                </span>
                <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Veículos em movimento
              </h3>
              <p className="text-sm text-slate-600">
                Luz verde acesa para os carros. <strong>Pedestres devem aguardar na calçada</strong>.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs space-y-1.5 font-mono text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Duração padrão:</span>
                <span className="font-bold">15 segundos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tela OLED:</span>
                <span className="font-semibold text-rose-700">AGUARDE (estático)</span>
              </div>
            </div>
          </div>

          {/* Fase 2: Amarelo dos Carros */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                  Fase 2 • Amarelo Veicular
                </span>
                <span className="w-4 h-4 rounded-full bg-amber-400 shadow-sm" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Atenção veicular
              </h3>
              <p className="text-sm text-slate-600">
                Transição antes do fechamento veicular. <strong>Pedestres continuam aguardando</strong>.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs space-y-1.5 font-mono text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Duração padrão:</span>
                <span className="font-bold">3 segundos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tela OLED:</span>
                <span className="font-semibold text-rose-700">AGUARDE (estático)</span>
              </div>
            </div>
          </div>

          {/* Fase 3: Vermelho dos Carros (Pedestres Liberados) */}
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/40 p-6 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded">
                  Fase 3 • Vermelho Veicular
                </span>
                <span className="w-4 h-4 rounded-full bg-rose-500 shadow-sm" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Passagem liberada
              </h3>
              <p className="text-sm text-slate-700">
                Carros parados no sinal vermelho. <strong>A travessia demonstrativa de pedestres é liberada</strong>.
              </p>
            </div>
            <div className="pt-4 border-t border-rose-200 text-xs space-y-1.5 font-mono text-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-600">Duração:</span>
                <span className="font-bold">15 s a 30 s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tela OLED:</span>
                <span className="font-semibold text-emerald-800">Boneco andando + Tempo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Aviso sonoro:</span>
                <span className="font-semibold text-blue-900">Se solicitado (bipes)</span>
              </div>
            </div>
          </div>

          {/* Fase 4: Intervalo de Segurança */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 bg-slate-200 px-2.5 py-1 rounded">
                  Fase 4 • Entretempo Seguro
                </span>
                <span className="w-4 h-4 rounded-full bg-slate-400 shadow-sm" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Intervalo de 1 segundo
              </h3>
              <p className="text-sm text-slate-600">
                Ao terminar a travessia, os carros ainda continuam em vermelho por 1 segundo antes de liberar o verde.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs space-y-1.5 font-mono text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Duração fixa:</span>
                <span className="font-bold">1 segundo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tela OLED:</span>
                <span className="font-semibold text-slate-700">Volta para AGUARDE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Buzzer:</span>
                <span className="font-semibold text-slate-600">Desligado imediatamente</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bloco de Regras Cruciais (Callouts Explicativos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <ArrowRightCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>1. Pedidos são para a PRÓXIMA abertura</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Qualquer solicitação (botão, RFID ou QR Code) entra na <strong>fila da próxima passagem</strong>. Se o pedestre solicitar enquanto o sinal já estiver vermelho para os carros, o tempo daquela travessia que já iniciou <strong>não é esticado</strong>. O grupo aguardará a próxima abertura.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Clock className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>2. O Maior Tempo Vence (Sem Soma)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Se uma pessoa aciona o botão pedindo 20 s, outra aproxima um cartão RFID de 25 s e uma terceira envia um QR de 30 s, a próxima abertura terá <strong>30 segundos</strong> (o maior pedido), e não 75 segundos. Os tempos <strong>nunca são somados</strong> cumulativamente.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Users2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>3. Solicitações vs. Pessoas Reais</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O contador e as métricas do semáforo contabilizam <strong>número de solicitações registradas</strong> e ciclos programados. O protótipo <strong>não detecta presença física nem quantas pessoas realmente cruzaram a faixa</strong>.
            </p>
          </div>

        </div>

        {/* Nota técnica sobre o teto de 30s */}
        <div className="p-4 rounded-lg bg-amber-50 border-l-4 border-amber-500 text-slate-800 flex items-start space-x-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <strong className="text-amber-950 block">Nota sobre o teto de 30 segundos:</strong>
            <p className="text-slate-700">
              O limite de 30 segundos por passagem e o tempo normal de 15 segundos são escolhas dimensionadas para a <strong>maquete educacional de bancada</strong>. Em uma implantação viária real, os tempos dependem da largura da via, volume de tráfego, velocidade média e normas técnicas oficiais (como o Manual Brasileiro de Sinalização de Trânsito).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
