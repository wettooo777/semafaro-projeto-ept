import React, { useState } from 'react';
import { Wifi, Server, Sliders, BarChart3, Wrench, ShieldAlert, KeyRound, ExternalLink, Printer, ChevronDown } from 'lucide-react';

export const PanelAndAccess: React.FC = () => {
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  const toggleDetail = (key: string) => {
    setOpenDetail(openDetail === key ? null : key);
  };

  return (
    <section id="painel-e-acesso" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            <span>Operação Local & Configuração</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Painel de controle embarcado e acesso à rede
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            O microcontrolador ESP32 executa um servidor web local completo, permitindo que operadores configurem e monitorem o semáforo através do navegador do celular ou computador.
          </p>
        </div>

        {/* Alerta de Separação: Este site vs Painel da Placa */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start space-x-3 text-xs sm:text-sm">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-blue-950 block font-semibold">Distinção Importante:</strong>
            <p className="text-blue-900 leading-relaxed">
              Esta página que você está visualizando é o <strong>site explicativo público</strong> do projeto. O <strong>painel de controle real</strong> é servido diretamente pelo hardware físico do ESP32 na rede local da demonstração. Ele não requer internet e funciona via conexão Wi-Fi direta com a maquete.
            </p>
          </div>
        </div>

        {/* Grade: Como Conectar (Esquerda) vs Recursos do Painel (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda: Instruções de Acesso Wi-Fi */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-5 shadow-lg border border-slate-800">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <Wifi className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Como acessar o painel na maquete</h3>
                  <span className="text-xs text-slate-400">Durante uma demonstração presencial</span>
                </div>
              </div>

              {/* Modo 1: Rede Própria */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-amber-300 uppercase tracking-wider block text-[11px]">
                  Cenário 1: Na Rede Própria da Placa (Padrão)
                </span>
                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1.5 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400">Nome da Rede Wi-Fi:</span>{' '}
                    <strong className="text-emerald-300">Semaforo-Inclusivo</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Senha:</span>{' '}
                    <span className="text-amber-300 italic">Solicite ao responsável pela demonstração</span>
                  </div>
                  <div className="pt-1 text-slate-300">
                    <span className="text-slate-400">Endereço no navegador:</span><br />
                    <code className="text-white bg-slate-950 px-2 py-0.5 rounded">http://192.168.4.1/</code>
                    <span className="text-slate-500 block text-[10px] mt-0.5">ou http://semaforo.reni/</span>
                  </div>
                </div>
              </div>

              {/* Modo 2: Roteador */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-blue-300 uppercase tracking-wider block text-[11px]">
                  Cenário 2: Placa Conectada ao Roteador
                </span>
                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1.5 font-mono text-[11px]">
                  <p className="text-slate-300 font-sans">
                    O celular precisa estar conectado ao <strong>mesmo roteador</strong> que a placa.
                  </p>
                  <div>
                    <span className="text-slate-400">Endereço:</span>{' '}
                    <code className="text-white bg-slate-950 px-2 py-0.5 rounded">http://semaforo.local/</code>
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    ou o número IP exibido na tela do painel.
                  </div>
                </div>
              </div>

              {/* Observações de Rede */}
              <div className="p-3 rounded-lg bg-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>• Digite <code>http://</code> (sem "s"), pois o ESP32 não utiliza SSL local.</div>
                <div>• Não há portal cativo automático: abra o navegador e digite o endereço.</div>
                <div>• O painel demonstrativo atual <strong>não possui senha ou login administrativo</strong>.</div>
              </div>

            </div>

          </div>

          {/* Coluna Direita: O que o Painel Permite Fazer */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Módulos e Recursos do Painel Embarcado
            </h3>

            {/* Módulo 1: Monitoramento ao Vivo */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <Server className="w-4 h-4 text-blue-600" />
                <h4>Acompanhamento ao Vivo</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mostra as 3 luzes dos veículos em tempo real, contagem regressiva da fase, estado do pedestre (Pode passar / Não atravesse), contagem de toques na fila (até 3) e número de pedidos acumulados para a próxima abertura.
              </p>
            </div>

            {/* Módulo 2: Gestão de Cartões RFID */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <h4>Cadastro e Edição de Cartões e Chaveiros RFID</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Captura remota de UID (espera até 60s pela aproximação da tag no teto), atribuição de nome amigável, ajuste do tempo desejado (de 1 a 30s) e flag de aviso sonoro. Permite editar e excluir cadastros (capacidade para até 40 tags).
              </p>
            </div>

            {/* Módulo 3: Criação e Impressão de QR Codes */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <Printer className="w-4 h-4 text-emerald-600" />
                <h4>Criação e Impressão de QR Codes</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gera QR codes personalizados (até 20 registros) com tempo específico e som opcional. Inclui recurso para impressão em folhas A4 (diagramação de 2 ou 4 cartazes por folha) com instruções para os visitantes.
              </p>
            </div>

            {/* Módulo 4: Configuração de Tempos e Ciclo */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <Sliders className="w-4 h-4 text-purple-600" />
                <h4>Ajuste de Parâmetros de Tempo</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permite configurar: passagem normal (padrão 15s), acréscimo por toque do botão (padrão 5s), tempo verde dos carros (padrão 15s), amarelo veicular (padrão 3s) e intervalos dos bipes sonoros (250ms a 900ms).
              </p>
            </div>

            {/* Módulo 5: Teste de Componentes */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <Wrench className="w-4 h-4 text-slate-700" />
                <h4>Diagnóstico de Bancada com Timeout</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pausa o ciclo normal e testa individualmente cada elemento físico: texto no OLED, tom de 2 kHz no buzzer, luzes vermelha, amarela e verde por 2s e leitura de RFID. <strong>Encerra automaticamente após 120 segundos</strong> caso a tela seja fechada.
              </p>
            </div>

            {/* Módulo 6: Métricas e Exportação JSON */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <h4>Métricas e Exportação de Dados</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contabiliza ciclos concluídos, solicitações por canal (botão, RFID, QR), tempo mais frequente, agrupamento por horário e histórico dos últimos 60 ciclos. Permite baixar o arquivo estruturado <code>metricas-semaforo.json</code>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
