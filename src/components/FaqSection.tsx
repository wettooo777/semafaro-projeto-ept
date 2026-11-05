import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Operação',
      question: 'Se eu passar meu cartão enquanto a travessia já está aberta, o tempo atual aumenta?',
      answer: 'Não. Um princípio fundamental de segurança no trânsito é a previsibilidade: uma travessia já iniciada nunca altera a sua duração. A sua solicitação é registrada com sucesso para a PRÓXIMA abertura do sinal vermelho veicular.',
    },
    {
      category: 'Operação',
      question: 'Se várias pessoas solicitarem tempo diferente, os segundos são somados?',
      answer: 'Não. Os tempos nunca são somados cumulativamente. O sistema atende o grupo com o MAIOR tempo solicitado aplicável (respeitando o teto de 30 segundos da maquete). Por exemplo, se houver pedidos de 20s, 25s e 30s, a próxima travessia terá 30 segundos.',
    },
    {
      category: 'Acessibilidade',
      question: 'Quem não tem cartão RFID nem celular com internet fica sem conseguir pedir tempo?',
      answer: 'Não. O botão físico instalado na caixa permite que qualquer pessoa solicite acréscimo de tempo (1 a 3 toques curtos pedem até 30s) ou solicite 30s com aviso sonoro (segurando o botão por 2 segundos). Celular e RFID são canais complementares.',
    },
    {
      category: 'Acessibilidade',
      question: 'O som de travessia toca em todas as aberturas do semáforo?',
      answer: 'Não. O aviso sonoro toca exclusivamente quando foi solicitado por um dos pedestres do grupo (via tag configurada com som, QR com som ou segurando o botão por 2s). Se ninguém solicitou som, a travessia ocorre em silêncio para evitar poluição sonora.',
    },
    {
      category: 'Técnico',
      question: 'Qual a diferença entre o bip curto e o som da travessia?',
      answer: 'O bip curto de reconhecimento toca no instante exato em que você aproxima o cartão ou aperta o botão, apenas para confirmar que o pedido foi gravado na memória. Já o aviso sonoro de travessia toca depois, durante a fase vermelha veicular, com bipes progressivos que indicam a passagem do tempo.',
    },
    {
      category: 'Técnico',
      question: 'O semáforo detecta se a pessoa já terminou a travessia ou se alguém ficou para trás?',
      answer: 'Não. O protótipo atual não possui sensores de presença na faixa nem câmeras de detecção de ocupação. As cúpulas no painel frontal são lentes PIR utilizadas como peças ópticas para difusão luminosa, e não sensores eletrônicos ativos.',
    },
    {
      category: 'Geral',
      question: 'Este equipamento pode ser instalado amanhã em uma rua da minha cidade?',
      answer: 'Não. Este é um protótipo educacional de bancada desenvolvido para estudo e demonstração. Uma aplicação em via pública depende de engenharia especializada, conformidade com as normas do CONTRAN/SENATRAN, testes ambientais, integração com controladores viários e autorização do órgão de trânsito.',
    },
    {
      category: 'Geral',
      question: 'O cadastro do cartão grava dados de saúde ou laudos médicos?',
      answer: 'Não. Em estrita conformidade com a privacidade e a LGPD, o cadastro relaciona apenas o código físico da tag (UID) a uma quantidade de segundos e à opção de som. Não há gravação de nomes completos, prontuários ou diagnósticos médicos.',
    },
    {
      category: 'Técnico',
      question: 'As métricas do painel comprovam quantas pessoas atravessaram?',
      answer: 'As métricas contabilizam o número de solicitações registradas por canal (botão, RFID, QR) e ciclos executados. Como uma mesma pessoa pode acionar mais de uma vez ou o semáforo pode abrir sem ninguém na faixa, os dados representam estatísticas de chamadas, não contagem física de pedestres.',
    },
    {
      category: 'Técnico',
      question: 'Por que o Wi-Fi da placa não abre uma tela de login automaticamente no celular?',
      answer: 'O firmware atual não implementa portal cativo automático. O visitante deve se conectar à rede Wi-Fi indicada pelo demonstrador e abrir o navegador manualmente digitando o endereço http://192.168.4.1/ ou http://semaforo.reni/.',
    },
  ];

  return (
    <section id="faq" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dúvidas mais comuns sobre o projeto
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Respostas diretas e esclarecedoras para visitantes, estudantes e pesquisadores que estão conhecendo a maquete.
          </p>
        </div>

        {/* Acordeão de Perguntas */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center space-x-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0 mt-0.5 sm:mt-0">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
