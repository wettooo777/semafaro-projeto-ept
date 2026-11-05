import React from 'react';
import { HeartHandshake, ShieldCheck, MapPin, AlertCircle, Compass, FileCheck } from 'lucide-react';

export const InclusionAndUrbanRoute: React.FC = () => {
  return (
    <section id="inclusao-e-rota" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded-md mb-3">
            <span>Inclusão Responsável & Engenharia Viária</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recursos de inclusão e alcance real
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            O termo <em>inclusivo</em> descreve a proposta de combinar recursos e canais para aproximar o equipamento das necessidades humanas. Esta seção detalha o que o protótipo alcança, suas limitações honestas e como a tecnologia só faz sentido integrada a uma rota física acessível.
          </p>
        </div>

        {/* Tabela / Cards de Públicos com Honestidade Científica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Autismo / Neurodiversidade */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
              Pessoas Autistas
            </span>
            <h3 className="text-lg font-bold text-slate-900">Previsibilidade e Simplicidade</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A tela com poucos elementos gráficos, figura humana direta e contagem clara busca facilitar a compreensão cognitiva e reduzir a ansiedade de espera.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              <strong>Limite ético:</strong> Não afirmamos que cores ou animações específicas beneficiem todas as pessoas autistas. A compreensão e o conforto sensorial precisam de avaliação individual com usuários.
            </div>
          </div>

          {/* Pessoas Surdas */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Pessoas Surdas ou Ensurdecidas
            </span>
            <h3 className="text-lg font-bold text-slate-900">Comunicação Visual Plena</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apresentação completa do ciclo por figuras gráficas (AGUARDE estático / caminhada animada) e contagem regressiva em números grandes no OLED, além das luzes veiculares.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              <strong>Autonomia:</strong> A compreensão do estado de travessia não depende de nenhum aviso acústico.
            </div>
          </div>

          {/* Pessoas Cegas ou Baixa Visão */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
              Pessoas Cegas ou com Baixa Visão
            </span>
            <h3 className="text-lg font-bold text-slate-900">Aviso Sonoro Progressivo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O aviso sonoro opcional é ativado por cartão, chaveiro RFID, QR ou toque longo no botão, acelerando os bipes nos 10s finais até o tom contínuo.
            </p>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              <strong>Importante:</strong> O som informa apenas o tempo da travessia. O protótipo <strong>não localiza o trajeto físico nem detecta obstáculos na pista</strong>.
            </div>
          </div>

          {/* Mobilidade Reduzida, Cadeirantes e Idosos */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded">
              Idosos e Mobilidade Reduzida
            </span>
            <h3 className="text-lg font-bold text-slate-900">Tempo de Travessia Sob Medida</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Permite configurar um tempo maior (ex: 20s, 25s ou 30s) de acordo com o ritmo do pedestre, além de oferecer o botão físico e o QR Code no celular como opções.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              <strong>Observação técnica:</strong> O semáforo aplica o tempo solicitado previamente, mas <strong>não mede a velocidade instantânea da pessoa na via</strong>.
            </div>
          </div>

          {/* Pessoas com Daltonismo */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">
              Pessoas com Daltonismo
            </span>
            <h3 className="text-lg font-bold text-slate-900">Tela Azul e Fundo Escuro</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dificuldade comum na distinção entre vermelho e verde. A tela OLED do semáforo exibe textos e contagem em azul sobre fundo escuro de alto contraste.
            </p>
            <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200 text-[11px] text-cyan-950">
              <strong>Alto Contraste:</strong> Leitura segura e independente do vermelho e verde, aliada à posição vertical padronizada das lentes e aviso sonoro.
            </div>
          </div>

          {/* Privacidade e LGPD */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
              Privacidade e LGPD
            </span>
            <h3 className="text-lg font-bold text-slate-900">Zero Diagnóstico Médico</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O sistema armazena apenas um identificador (UID/código), uma quantidade de segundos solicitada e a opção de ligar o som.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              <strong>Sem dados sensíveis:</strong> O cartão não grava prontuário, CID ou condição médica, preservando a intimidade e a dignidade do usuário.
            </div>
          </div>

        </div>

        {/* Bloco em Destaque: Acessibilidade no Ambiente Urbano */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Acessibilidade Além da Eletrônica
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                A tecnologia depende de uma rota física acessível
              </h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Nenhum equipamento eletrônico resolve a travessia urbana isoladamente. Uma implantação real na via pública exige a integração com uma <strong>cadeia completa de acessibilidade</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>Piso Tátil de Alerta e Direcional</span>
              </div>
              <p className="text-slate-300">
                O piso tátil orienta a localização do cruzamento e adverte sobre o fim da calçada, mas <strong>não informa sozinho se o semáforo está verde ou vermelho</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Rampas e Rebaixamentos</span>
              </div>
              <p className="text-slate-300">
                Pessoas cadeirantes ou com mobilidade reduzida dependem de calçadas rebaixadas, piso regular, trajeto desobstruído e livre de degraus para atravessar com segurança.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <FileCheck className="w-4 h-4" />
                <span>Ergonomia e Autorização Viária</span>
              </div>
              <p className="text-slate-300">
                Botoeiras e leitores precisam de altura adequada ao alcance manual e sinalização em relevo. Qualquer instalação em via pública exige estudo do órgão de trânsito (CONTRAN/SENATRAN).
              </p>
            </div>

          </div>

          <div className="text-xs text-slate-400 border-t border-slate-800 pt-4">
            * <em>Aviso importante:</em> O limite de 30 segundos e o intervalo de 1 segundo foram dimensionados para a <strong>maquete educacional</strong>. Em uma rua real, o cálculo de tempo de verde e fases de desocupação segue o Manual Brasileiro de Sinalização de Trânsito (Volume V).
          </div>
        </div>

      </div>
    </section>
  );
};
