import React from 'react';
import { History, ArrowRight, AlertTriangle, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';

export const EvolutionAndFuture: React.FC = () => {
  return (
    <section id="evolucao" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            <span>Trajetória do Projeto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evolução, limites reais e próximos passos
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Compreender a evolução do projeto permite valorizar a contribuição original e enxergar com clareza o salto de engenharia realizado pela equipe atual.
          </p>
        </div>

        {/* Quadro Comparativo: Versão Inicial vs Versão Atual V6.1 */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <History className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold">Quadro Comparativo de Desenvolvimento</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Monografia Original → Firmware V6.1
            </span>
          </div>

          <div className="divide-y divide-slate-200 overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <th className="p-4 w-1/4">Aspecto</th>
                  <th className="p-4 w-3/8 text-slate-600">Versão Inicial (Arduino)</th>
                  <th className="p-4 w-3/8 text-blue-900 bg-blue-50/50">Versão Atual V6.1 (ESP32)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                
                <tr>
                  <td className="p-4 font-bold text-slate-900">Controlador e Montagem</td>
                  <td className="p-4 text-slate-600">Arduino Uno montado em protoboard branca externa com fiação dispersa.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">ESP32 DevKit V1 com Wi-Fi embutido, montado diretamente na caixa 3D sem protoboard.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Identificação RFID</td>
                  <td className="p-4 text-slate-600">Leitor RC522 com apenas 2 cartões fixos no código (10s e 18s). Não permitia novos cadastros sem reprogramar.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">Cadastro de até 40 tags/chaveiros pelo painel web, com tempo customizado (1 a 30s) e opção de som gravados na memória.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Canais de Solicitação</td>
                  <td className="p-4 text-slate-600">Exclusivamente cartão RFID.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">Botão físico (toque curto e longo de 2s), leitor RFID e QR Codes para leitura no celular.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Comunicação Visual no OLED</td>
                  <td className="p-4 text-slate-600">Mensagens de texto estáticas "STOP" e "ATRAVESSE" com contagem simples.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">"AGUARDE" com figura humana parada, caminhada animada na travessia e números grandes regressivos.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Sinal Sonoro</td>
                  <td className="p-4 text-slate-600">Mencionado como proposta futura.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">Buzzer piezoelétrico com cadência progressiva acelerando até tom contínuo nos últimos 2s.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Interface e Operação</td>
                  <td className="p-4 text-slate-600">Sem interface web. Tempos fixos definidos no código-fonte.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">Servidor web local com painel para gerenciar cadastros, QR codes, tempos, testes e métricas.</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900">Arquitetura de Código</td>
                  <td className="p-4 text-slate-600">Estrutura linear com funções de delay bloqueantes.</td>
                  <td className="p-4 bg-blue-50/30 text-slate-900 font-medium">Máquina de estados não bloqueante (baseada em millis) garantindo atendimento contínuo da web e dos sensores.</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Esclarecimento sobre Inteligência Artificial e Dados */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
          <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Sobre o Uso de Inteligência Artificial</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Não há inteligência artificial operando no sistema atual.</strong> O semáforo funciona estritamente com base em <strong>regras programadas determinísticas</strong> em C++ na máquina de estados do ESP32.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            A exploração de IA é uma <em>possibilidade futura de pesquisa acadêmica</em>, voltada para a análise dos relatórios anônimos de métricas (JSON) ou eventual processamento local de imagem para verificar a desocupação da pista. Não há IA tomando decisões ou controlando o ciclo na maquete atual.
          </p>
        </div>

        {/* Próximos Passos de Pesquisa */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Próximos Passos e Desafios para a Equipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2 text-xs">
              <span className="font-mono font-bold text-blue-700 uppercase tracking-wider block text-[11px]">Etapa 1</span>
              <strong className="text-slate-900 text-sm block">Ensaios Físicos de Bancada</strong>
              <p className="text-slate-600 leading-relaxed">
                Medir o consumo elétrico e a autonomia real da bateria sob carga contínua com Wi-Fi ligado, além de conferir a estabilidade mecânica do novo poste desmontável.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2 text-xs">
              <span className="font-mono font-bold text-blue-700 uppercase tracking-wider block text-[11px]">Etapa 2</span>
              <strong className="text-slate-900 text-sm block">Pesquisa com Usuários Reais</strong>
              <p className="text-slate-600 leading-relaxed">
                Submeter o protótipo à avaliação de pessoas com deficiência, idosos e especialistas em acessibilidade para medir a facilidade de acionamento do botão, alcance do RFID e conforto sensorial do som.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2 text-xs">
              <span className="font-mono font-bold text-blue-700 uppercase tracking-wider block text-[11px]">Etapa 3</span>
              <strong className="text-slate-900 text-sm block">Acessibilidade Cromática e Contraste</strong>
              <p className="text-slate-600 leading-relaxed">
                Aprimorar a interface OLED em azul sobre fundo escuro para garantir visibilidade plena para todos os tipos de daltonismo.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
