/**
 * ============================================================================
 * ARQUIVO: src/App.tsx
 * COMENTÁRIO DE ESTUDO (HTML + CSS + JAVASCRIPT):
 * 
 * 1. HTML Semântico:
 *    - <div className="..."> envolve a aplicação inteira.
 *    - <main id="conteudo-principal"> abriga o conteúdo dinâmico de cada página.
 * 
 * 2. CSS (Tailwind):
 *    - Cores escuras e claras combinadas para alto contraste (slate-900 / white / amber-400).
 *    - Classes responsivas como "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8".
 * 
 * 3. JAVASCRIPT / REACT:
 *    - useState: gerencia a página ativa, a lista de cartões RFID e os pedidos pendentes.
 *    - useEffect: sincroniza a rota da URL via hash (#simulador, #cadastro, etc.)
 *      e salva os cartões cadastrados no localStorage do navegador para não perder ao recarregar!
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { PageId, RfidCard, PendingRequest } from './types';
import { HeaderNav } from './components/HeaderNav';
import { SimpleFooter } from './components/SimpleFooter';
import { HomePage } from './pages/HomePage';
import { SimulatorPage } from './pages/SimulatorPage';
import { CardRegisterPage } from './pages/CardRegisterPage';
import { HowToUsePage } from './pages/HowToUsePage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { AboutProjectPage } from './pages/AboutProjectPage';
import { playBeepShort } from './utils/sound';

// Cartões de exemplo pré-cadastrados para o visitante já testar imediatamente
const DEFAULT_CARDS: RfidCard[] = [
  {
    id: 'card-1',
    uid: '4A 88 12 B3',
    name: 'Chaveiro do João (Idoso)',
    timeSeconds: 20,
    withSound: false,
    createdAt: '2025-02-01',
  },
  {
    id: 'card-2',
    uid: 'C3 91 F4 0A',
    name: 'Cartão Vovó Maria (Cadeirante)',
    timeSeconds: 25,
    withSound: true,
    createdAt: '2025-02-02',
  },
  {
    id: 'card-3',
    uid: '88 E1 77 5C',
    name: 'Tag Prioritária (Deficiência Visual)',
    timeSeconds: 30,
    withSound: true,
    createdAt: '2025-02-03',
  },
];

export default function App() {
  // Estado da Página Ativa
  const [currentPage, setCurrentPage] = useState<PageId>('inicio');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);

  // Lista de Cartões RFID salvos no navegador (localStorage)
  const [cards, setCards] = useState<RfidCard[]>(() => {
    try {
      const saved = localStorage.getItem('semaforo_reni_cards');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignora erro de parse e carrega os padrões
    }
    return DEFAULT_CARDS;
  });

  // Salva no localStorage quando a lista mudar
  useEffect(() => {
    try {
      localStorage.setItem('semaforo_reni_cards', JSON.stringify(cards));
    } catch {
      // Fallback silencioso
    }
  }, [cards]);

  // Fila de pedidos aguardando a próxima abertura do semáforo
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  // Sincroniza com a hash da URL (#inicio, #simulador, #cadastro, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['inicio', 'simulador', 'cadastro', 'como-usar', 'inclusao', 'sobre'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funções de Gestão de Cartões
  const handleAddCard = (newCardData: Omit<RfidCard, 'id' | 'createdAt'>) => {
    const newCard: RfidCard = {
      ...newCardData,
      id: `card-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCards((prev) => [newCard, ...prev]);
  };

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  // Simula encostar o cartão no semáforo: adiciona à fila e leva para o simulador
  const handleTapCard = (card: RfidCard) => {
    playBeepShort();
    setPendingRequests((prev) => [
      ...prev,
      {
        id: `rfid-${Date.now()}`,
        source: 'rfid',
        label: `Cartão: ${card.name}`,
        requestedSeconds: card.timeSeconds,
        withSound: card.withSound,
      },
    ]);
  };

  // Funções da fila de pedidos do semáforo
  const handleAddRequest = (req: PendingRequest) => {
    setPendingRequests((prev) => [...prev, req]);
  };

  const handleClearQueue = () => {
    setPendingRequests([]);
  };

  // Ajuste do tamanho da fonte para acessibilidade
  const fontClasses = {
    '-1': 'text-[15px]',
    '0': 'text-[16px]',
    '1': 'text-[17.5px]',
    '2': 'text-[19px]',
  }[fontSizeLevel.toString()] || 'text-[16px]';

  return (
    <div className={`min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950 ${fontClasses}`}>
      
      {/* Barra de Navegação Superior */}
      <HeaderNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        fontSize={fontSizeLevel}
        onChangeFontSize={setFontSizeLevel}
        cardsCount={cards.length}
      />

      {/* Conteúdo Principal (Muda conforme a aba clicada) */}
      <main id="conteudo-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none" tabIndex={-1}>
        {currentPage === 'inicio' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'simulador' && (
          <SimulatorPage
            cards={cards}
            onNavigate={handleNavigate}
            pendingRequests={pendingRequests}
            onAddRequest={handleAddRequest}
            onClearQueue={handleClearQueue}
          />
        )}
        {currentPage === 'cadastro' && (
          <CardRegisterPage
            cards={cards}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            onTapCard={handleTapCard}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'como-usar' && <HowToUsePage onNavigate={handleNavigate} />}
        {currentPage === 'inclusao' && <AccessibilityPage onNavigate={handleNavigate} />}
        {currentPage === 'sobre' && <AboutProjectPage onNavigate={handleNavigate} />}
      </main>

      {/* Rodapé com Créditos Escolares */}
      <SimpleFooter onNavigate={handleNavigate} />

    </div>
  );
}

