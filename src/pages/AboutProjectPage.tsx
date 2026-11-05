/**
 * ============================================================================
 * ARQUIVO: src/pages/AboutProjectPage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + IMAGENS):
 * - Imagens locais: usamos a tag <img> com o caminho local "/assets/aistudio/...".
 * - CSS Flexbox e Grid: organiza o layout responsivo entre texto explicativo e imagem 3D.
 * - Semântica: seções <section>, títulos <h2> e listas claras com poucas palavras.
 * ============================================================================
 */

import React from 'react';
import { PageId } from '../types';
import { 
  GraduationCap, 
  Users, 
  History, 
  Sparkles, 
  FileText, 
  Download, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface AboutProjectPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutProjectPage: React.FC<AboutProjectPageProps> = ({ onNavigate }) => {
  const pdfs = [
    {
      title: 'Manual de Operação (V6.1)',
      desc: 'Como funciona o código e o painel',
      url: '/assets/aistudio/MANUAL_SEMAFORO_INTELIGENTE_INCLUSIVO_6442d05f.pdf',
    },
    {
      title: 'Manual de Montagem (Caixa V11)',
      desc: 'Encaixes de travas e parafusos no 3D',
      url: '/assets/aistudio/MANUAL_MONTAGEM_SEMAFORO_V11_68a6c2fd.pdf',
    },
    {
      title: 'Pitch e Viabilidade Técnica',
      desc: 'Custos das peças e respostas da banca',
      url: '/assets/aistudio/Pitch_e_viabilidade_do_Sem_foro_Reni_9567fb7b.pdf',
    },
    {
      title: 'Monografia Original ABNT',
      desc: 'Primeira versão feita em Arduino',
      url: '/assets/aistudio/Projeto_Semaforo_Inteligente_ABNT_VERSAO_FINAL_ee8dfd88.pdf',
    },
  ];

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      
      {/* Cabeçalho */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-700 bg-purple-100/70 px-2.5 py-1 rounded-md">
          <History className="w-3.5 h-3.5" />
          <span>Histórico & Construção</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Como o Semáforo Reni foi construído
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          A história da maquete, o modelo 3D final e os créditos dos estudantes que desenvolveram o projeto.
        </p>
      </div>

      {/* Destaque Principal: A Foto/Render da Caixa 3D Real com a Base e Nomes */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Imagem do Semáforo */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group max-w-xs w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl">
            <img
              src="/assets/aistudio/IMG_1391_d97d48af.jpeg"
              alt="Modelo 3D final do Semáforo Reni mostrando a caixa preta com chapéus dourados, botão vermelho com escrita em Braille e o poste com os nomes Ana Julia, Bianca, Henrique e Welliton gravados na base."
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-2.5 bg-slate-900/95 border-t border-slate-800 text-[11px] text-slate-300 text-center font-mono">
              Unidade Demonstradora • Caixa V11 + Poste
            </div>
          </div>
        </div>

        {/* Detalhes do Modelo 3D */}
        <div className="md:col-span-7 space-y-4 text-xs sm:text-sm">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Engenharia & Impressão 3D</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            O Design da Maquete Física
          </h2>

          <p className="text-slate-300 leading-relaxed">
            A estrutura foi modelada em CAD e impressa em plástico PLA preto. O projeto traz detalhes pensados especialmente para acessibilidade e ergonomia:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">1.</span>
              <span><strong>Chapéus Dourados:</strong> protegem as 3 lentes contra reflexos solares para facilitar a visualização das luzes dos carros.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">2.</span>
              <span><strong>Escrita em Braille e Seta Tátil:</strong> gravados em alto-relevo acima do botão vermelho para que pessoas cegas localizem o ponto de acionamento pelo tato.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">3.</span>
              <span><strong>Visor OLED com Azul em Fundo Escuro:</strong> tela digital com cor azul sobre fundo escuro para facilitar a leitura por pessoas com daltonismo, além de furo de 3 mm para o buzzer.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">4.</span>
              <span><strong>Base com os Nomes da Equipe:</strong> a base do poste traz gravados os nomes dos 4 estudantes em cores individuais: <em>Ana Julia, Bianca, Henrique e Welliton</em>.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Histórico em 3 Etapas Rápidas */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          A Evolução do Projeto em 3 Fases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Fase 1 • Início</span>
            <strong className="text-slate-900 text-sm block">Arduino Uno</strong>
            <p className="text-slate-600 leading-relaxed">
              Primeira maquete com placa de testes (protoboard). Lia apenas 2 cartões fixos no código (10s e 18s).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-2xs space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-blue-700 block">Fase 2 • Evolução</span>
            <strong className="text-blue-950 text-sm block">Migração para ESP32</strong>
            <p className="text-slate-700 leading-relaxed">
              Criação de rede Wi-Fi local própria, cadastro dinâmico de até 40 cartões, botão com modos e bipes sonoros.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-2xs space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 block">Fase 3 • Versão Atual</span>
            <strong className="text-emerald-950 text-sm block">Caixa V11 e Impressão 3D</strong>
            <p className="text-slate-700 leading-relaxed">
              Montagem limpa sem fios soltos, relevo Braille, QR Code pelo celular e poste desmontável com a base da equipe.
            </p>
          </div>

        </div>
      </div>

      {/* Créditos Oficiais Discretos */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <h2>Créditos Escolares</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
          <div className="space-y-1">
            <strong>Colégio Estadual Prof. Reni Correia Gamper</strong>
            <p className="text-slate-500">2º Técnico em Desenvolvimento de Sistemas • Manoel Ribas - PR</p>
            <p className="text-slate-500">Orientação: <strong>Prof. Richardson</strong></p>
          </div>

          <div className="space-y-1">
            <strong>Equipe de Alunos Desenvolvedores:</strong>
            <div className="grid grid-cols-2 gap-2 pt-1 font-semibold text-slate-800">
              <span className="p-2 bg-slate-50 rounded border border-slate-100">Ana Julia</span>
              <span className="p-2 bg-slate-50 rounded border border-slate-100">Bianca</span>
              <span className="p-2 bg-slate-50 rounded border border-slate-100">Henrique</span>
              <span className="p-2 bg-slate-50 rounded border border-slate-100">Welliton</span>
            </div>
          </div>
        </div>
      </div>

      {/* Downloads dos Documentos em PDF e Código-Fonte em ZIP */}
      <div className="space-y-4 pt-2">
        
        {/* Banner de Download do Projeto Completo em ZIP */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-blue-800 shadow-md">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold font-mono">
              <span>ARQUIVO COMPACTADO (.ZIP)</span>
            </div>
            <strong className="text-sm sm:text-base font-bold text-white block">
              Baixar Código-Fonte e Arquivos do Projeto Completo
            </strong>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inclui todo o código HTML, CSS, TypeScript/React, componentes, manuais e a foto 3D oficial para você estudar ou rodar offline.
            </p>
          </div>

          <a
            href="/semaforo-inteligente-inclusivo.zip"
            download="semaforo-inteligente-inclusivo.zip"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-transform active:scale-95 shadow-md shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Projeto (.ZIP)</span>
          </a>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Documentos Originais para Estudo e Consulta
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {pdfs.map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-colors flex flex-col justify-between"
              >
                <div>
                  <strong className="text-slate-900 block font-bold text-xs">{p.title}</strong>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{p.desc}</span>
                </div>
                <span className="text-blue-600 font-bold text-[11px] mt-2 flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>Abrir PDF</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
