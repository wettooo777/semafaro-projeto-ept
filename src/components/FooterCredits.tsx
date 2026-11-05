import React from 'react';
import { FileText, Download, GraduationCap, Users } from 'lucide-react';

export const FooterCredits: React.FC = () => {
  const documents = [
    {
      title: 'Manual de Operação (Firmware V6.1)',
      subtitle: 'Configurações, menus, regras e solução de problemas',
      url: '/assets/aistudio/MANUAL_SEMAFORO_INTELIGENTE_INCLUSIVO_6442d05f.pdf',
    },
    {
      title: 'Manual de Montagem Mecânica (Caixa V11)',
      subtitle: 'Guia passo a passo de encaixes, travas e parafusos no CAD',
      url: '/assets/aistudio/MANUAL_MONTAGEM_SEMAFORO_V11_68a6c2fd.pdf',
    },
    {
      title: 'Guia de Pitch e Viabilidade Técnica',
      subtitle: 'Estrutura de apresentação, custos e respostas para bancas',
      url: '/assets/aistudio/Pitch_e_viabilidade_do_Sem_foro_Reni_9567fb7b.pdf',
    },
    {
      title: 'Monografia ABNT Original (Versão Inicial)',
      subtitle: 'Artigo científico do protótipo inicial em Arduino Uno',
      url: '/assets/aistudio/Projeto_Semaforo_Inteligente_ABNT_VERSAO_FINAL_ee8dfd88.pdf',
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Bloco de Documentação Técnica */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Documentos Técnicos e Manuais do Projeto
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Consulte os arquivos documentais completos produzidos para o Semáforo Reni:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {documents.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-left transition-colors flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400/90 font-semibold uppercase">PDF Oficial</span>
                    <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <strong className="text-xs font-semibold text-slate-200 group-hover:text-white block leading-snug">
                    {doc.title}
                  </strong>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    {doc.subtitle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-slate-800/80 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-between text-xs">
          
          {/* Identidade Institucional e Créditos */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-200 font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Colégio Estadual Prof. Reni Correia Gamper</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Curso: <strong>2º Técnico em Desenvolvimento de Sistemas</strong><br />
              Município: Manoel Ribas — Paraná
            </p>
            <div className="pt-1 flex items-center space-x-2 text-slate-300">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>
                <strong>Equipe:</strong> Ana Julia, Bianca, Henrique e Welliton
              </span>
            </div>
            <div className="text-slate-400 text-[11px]">
              <strong>Orientador:</strong> Prof. Richardson
            </div>
          </div>

          {/* Declaração de Direitos e Responsabilidade Educacional */}
          <div className="space-y-2 md:text-right text-xs text-slate-400">
            <p className="text-slate-300 font-semibold">
              Semáforo Inteligente Inclusivo • Protótipo Educacional de Bancada
            </p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Desenvolvido para estudo e demonstração de conceitos de mobilidade urbana, IoT e acessibilidade. Não possui homologação para trânsito de vias públicas.
            </p>
            <div className="text-[10px] text-slate-500 pt-1 font-mono">
              Firmware V6.1 • Caixa V11 • Manoel Ribas (2026)
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
