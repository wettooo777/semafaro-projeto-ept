import React from 'react';
import { ToggleLeft, Radio, QrCode, CheckCircle2, AlertTriangle, Smartphone } from 'lucide-react';

export const RequestMethods: React.FC = () => {
  return (
    <section id="formas-de-pedido" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded-md mb-3">
            <span>Guia Passo a Passo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Como solicitar a passagem de pedestres
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            O protótipo oferece três canais complementares para atender diferentes perfis de usuários. Conheça as regras exatas de funcionamento de cada um.
          </p>
        </div>

        {/* Os 3 Cards Detalhados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Botão Físico */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shadow-inner">
                  <ToggleLeft className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Canal 01</span>
                  <h3 className="text-xl font-bold text-slate-900">Botão Físico Tátil</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Instalado na parede frontal da caixa (chave tátil com capa mecânica de 4 terminais). Possui dois modos de acionamento bem definidos:
              </p>

              {/* Toques curtos */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <strong className="text-slate-900 text-sm block">A. Toque Curto (ao soltar)</strong>
                <p>
                  Confirmado ao soltar o botão. Cada toque aceito produz um <strong>bip curto de reconhecimento</strong> no buzzer.
                </p>
                <ul className="space-y-1 pt-1 font-mono text-[11px] text-slate-800">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span><strong>1º toque aceito:</strong> 20 segundos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span><strong>2º toque aceito:</strong> 25 segundos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span><strong>3º toque aceito:</strong> 30 segundos (teto)</span>
                  </li>
                </ul>
                <p className="text-slate-500 text-[11px] pt-1">
                  * O limite de três toques pertence à <strong>fila inteira</strong>, não a cada pessoa individualmente. Toques curtos extras não aumentam o tempo.
                </p>
              </div>

              {/* Toque longo de 2s */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs text-slate-700">
                <strong className="text-blue-950 text-sm block">B. Segurar por 2 Segundos</strong>
                <p>
                  Pressionar e segurar por 2 segundos solicita <strong>30 segundos com aviso sonoro habilitado</strong> para a próxima abertura.
                </p>
                <div className="flex items-center space-x-2 text-blue-900 font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Um bip longo confirma a solicitação.</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Manter o botão pressionado além dos 2s não repete o pedido. Soltar após o toque longo não registra outro clique.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Ideal para quem prefere ou precisa de acionamento puramente físico sem smartphone ou tag RFID.
            </div>
          </div>

          {/* 2. RFID (Cartão e Chaveiro) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shadow-inner">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Canal 02</span>
                  <h3 className="text-xl font-bold text-slate-900">Cartão & Chaveiro RFID</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Leitor RC522 instalado no teto da caixa (antena voltada para o topo, sob o símbolo RFID). Reconhece tags de rádio frequência de 13,56 MHz:
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cadastro individual prévio:</strong> Cartão e chaveiro possuem identificadores únicos (UIDs) distintos e precisam ser cadastrados separadamente no painel.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Parâmetros por tag:</strong> Cada registro define o nome/identificação, o tempo fixo desejado (1 a 30s) e a opção de ativar ou não o aviso sonoro.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bip de reconhecimento:</strong> Ao aceitar uma tag cadastrada, emite um <em>bip curto de reconhecimento</em> (independente do aviso de travessia).
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Comportamento na Antena</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Manter a tag parada sobre o teto conta apenas uma vez. Se a pessoa afastar o cartão por aproximadamente <strong>300 milissegundos</strong> e reapresentar, um novo pedido pode ser gerado. Não há bloqueio permanente de repetições.
                  </p>
                </div>

                <div className="text-slate-500 text-[11px]">
                  * Tags desconhecidas (não salvas na memória) são lidas pelo hardware, mas não solicitam tempo nem alteram a fila.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Capacidade de até 40 cartões e chaveiros salvos na memória não volátil da placa.
            </div>
          </div>

          {/* 3. QR Code */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-inner">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Canal 03</span>
                  <h3 className="text-xl font-bold text-slate-900">QR Code no Smartphone</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Permite a qualquer pessoa com celular solicitar travessia sem tocar em componentes físicos compartilhados:
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Conexão à rede:</strong> O visitante precisa estar conectado à rede Wi-Fi onde o protótipo está acessível (seja a rede própria da placa ou o roteador compartilhado).
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Escanear com a câmera:</strong> O QR Code abre diretamente a <em>Página do Pedestre</em>. <strong>Não é necessário abrir o painel administrativo</strong>.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>Tocar para confirmar:</strong> Somente escanear ou recarregar a página <strong>NÃO envia pedido</strong>. O pedestre precisa tocar explicitamente no botão <em>"Pedir travessia de X segundos"</em> na tela.
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-xs">
                    <Smartphone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Opção de Som no QR</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Assim como o RFID, cada QR Code criado no painel pode ter o aviso sonoro pré-habilitado pelo administrador para atender pessoas que necessitem do alerta acústico.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              O painel gera folhas A4 para impressão com 2 ou 4 QR Codes por página.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
