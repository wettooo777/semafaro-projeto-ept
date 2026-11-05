/**
 * ============================================================================
 * ARQUIVO: src/pages/CardRegisterPage.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * - HTML: Formulário com <input>, <select> e <button> acessíveis.
 * - CSS: Cartões estilizados com Tailwind (bordas, sombras suaves, cores de status).
 * - JAVASCRIPT:
 *   1. useState(): armazena os campos digitados pelo usuário.
 *   2. Validação: verifica se o nome não está vazio e se o tempo está entre 15 e 30s.
 *   3. Integração: ao clicar em "Aproximar do Semáforo", envia o pedido direto para a fila!
 * ============================================================================
 */

import React, { useState } from 'react';
import { RfidCard, PageId } from '../types';
import { playBeepShort } from '../utils/sound';
import { 
  CreditCard, 
  PlusCircle, 
  Trash2, 
  Radio, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw 
} from 'lucide-react';

interface CardRegisterPageProps {
  cards: RfidCard[];
  onAddCard: (card: Omit<RfidCard, 'id' | 'createdAt'>) => void;
  onDeleteCard: (id: string) => void;
  onTapCard: (card: RfidCard) => void;
  onNavigate: (page: PageId) => void;
}

export const CardRegisterPage: React.FC<CardRegisterPageProps> = ({
  cards,
  onAddCard,
  onDeleteCard,
  onTapCard,
  onNavigate,
}) => {
  // Campos do formulário
  const [name, setName] = useState('');
  const [uid, setUid] = useState('66 46 96 04');
  const [timeSeconds, setTimeSeconds] = useState(25);
  const [withSound, setWithSound] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Gera um UID aleatório simulando uma tag física nova
  const generateRandomUid = () => {
    const hex = () => Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
    setUid(`${hex()} ${hex()} ${hex()} ${hex()}`);
  };

  // Envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, informe o nome do cartão ou da pessoa.');
      return;
    }

    onAddCard({
      name: name.trim(),
      uid: uid.trim(),
      timeSeconds: Number(timeSeconds),
      withSound,
    });

    playBeepShort();
    setSuccessMsg(`Cartão "${name}" cadastrado com sucesso!`);
    setName('');
    generateRandomUid();

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      
      {/* Cabeçalho Curto e Direto */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Gestão de Identificadores</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cadastro de Cartões e Tags RFID
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Cadastre cartões com o tempo desejado (15 a 30s) e teste-os diretamente no semáforo.
        </p>
      </div>

      {/* Mensagem de Sucesso */}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grade: Formulário (Esquerda) e Lista de Cartões (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Formulário de Cadastro */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-bold text-sm text-slate-900">
            <PlusCircle className="w-4 h-4 text-amber-500" />
            <h2>Novo Cadastro</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            
            {/* Nome */}
            <div className="space-y-1">
              <label htmlFor="card-name" className="font-bold text-slate-700 block">
                Nome do Cartão ou Usuário:
              </label>
              <input
                id="card-name"
                type="text"
                placeholder="Ex: Cartão da Vovó, Chaveiro João"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Código UID */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="card-uid" className="font-bold text-slate-700 block">
                  Código UID (4 bytes):
                </label>
                <button
                  type="button"
                  onClick={generateRandomUid}
                  className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Gerar novo</span>
                </button>
              </div>
              <input
                id="card-uid"
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 uppercase"
                required
              />
            </div>

            {/* Tempo Solicitado (15 a 30s) */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label htmlFor="card-time" className="font-bold text-slate-700 block">
                  Tempo de Travessia:
                </label>
                <span className="font-mono font-bold text-amber-600 text-xs">
                  {timeSeconds} segundos
                </span>
              </div>
              <input
                id="card-time"
                type="range"
                min="15"
                max="30"
                step="1"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>15s (Normal)</span>
                <span>20s</span>
                <span>25s</span>
                <span>30s (Teto)</span>
              </div>
            </div>

            {/* Toggle de Som */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-xs text-slate-900 block">Aviso Sonoro (Buzzer):</strong>
                <span className="text-[11px] text-slate-500">Bipes progressivos na abertura</span>
              </div>
              <button
                type="button"
                onClick={() => setWithSound(!withSound)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                  withSound
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {withSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{withSound ? 'Com Som' : 'Sem Som'}</span>
              </button>
            </div>

            {/* Botão de Salvar */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              Salvar Cartão no Sistema
            </button>

          </form>
        </div>

        {/* Lista de Cartões Cadastrados */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-sm font-bold text-slate-900">
              Cartões Salvos na Memória ({cards.length})
            </h2>
            <span className="text-xs text-slate-500">
              Clique em "Aproximar" para testar
            </span>
          </div>

          {cards.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
              Nenhum cartão cadastrado ainda. Use o formulário ao lado para cadastrar seu primeiro cartão!
            </div>
          ) : (
            <div className="space-y-2.5">
              {cards.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <strong className="text-xs sm:text-sm font-bold text-slate-900">
                        {c.name}
                      </strong>
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {c.uid}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span><strong>{c.timeSeconds}s</strong> de travessia</span>
                      </span>

                      <span className="flex items-center space-x-1">
                        {c.withSound ? (
                          <span className="text-emerald-700 font-semibold flex items-center space-x-0.5">
                            <Volume2 className="w-3 h-3" />
                            <span>Com bipes</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center space-x-0.5">
                            <VolumeX className="w-3 h-3" />
                            <span>Silencioso</span>
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onTapCard(c);
                        onNavigate('simulador');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 transition-transform active:scale-95 shadow-xs"
                      title="Simula encostar este cartão no semáforo agora"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Aproximar da Caixa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteCard(c.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir este cartão"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
            💡 <strong>Dica de Estudo:</strong> No semáforo real com ESP32, os cartões são gravados na memória permanente (flash). Quando alguém aproxima a tag, o código confere se o UID bate com a lista antes de aceitar.
          </div>
        </div>

      </div>

    </div>
  );
};
