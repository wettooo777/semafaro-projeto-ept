/**
 * ============================================================================
 * ARQUIVO: src/types.ts
 * COMENTÁRIO DE ESTUDO:
 * Aqui definimos as interfaces e tipos que organizam os dados do nosso site.
 * No TypeScript, criar tipos ajuda a evitar erros e deixa o código fácil de ler.
 * ============================================================================
 */

// Páginas disponíveis para navegação no site
export type PageId = 'inicio' | 'simulador' | 'cadastro' | 'como-usar' | 'inclusao' | 'sobre';

// Estados possíveis das luzes do semáforo dos veículos
export type TrafficLightState = 
  | 'CAR_GREEN'       // Carros passam no verde (Pedestres aguardam)
  | 'CAR_YELLOW'      // Carros em atenção (Pedestres continuam aguardando)
  | 'PED_PASSING'     // Carros no vermelho (Pedestres podem atravessar)
  | 'SAFETY_INTERVAL'; // 1 segundo de segurança antes dos carros voltarem a andar

// Modelo de um Cartão ou Chaveiro RFID cadastrado
export interface RfidCard {
  id: string;             // Identificador interno (ex: "card-1")
  uid: string;            // Código do chip RFID (ex: "A1 B2 C3 D4")
  name: string;           // Nome do usuário ou cartão (ex: "Vovó Maria", "João")
  timeSeconds: number;    // Quantos segundos esse cartão pede (ex: 20s, 25s, 30s)
  withSound: boolean;     // Se ativa ou não o aviso sonoro de bipes
  createdAt: string;      // Data em que foi cadastrado
}

// Pedido que está aguardando na fila da próxima abertura
export interface PendingRequest {
  id: string;
  source: 'button' | 'rfid' | 'qr';
  label: string;
  requestedSeconds: number;
  withSound: boolean;
}

// Interfaces auxiliares para compatibilidade
export interface ComponentItem {
  id?: string;
  name: string;
  category: string;
  quantity?: string;
  role?: string;
  description: string;
  technicalSpecs?: string;
  technicalNote?: string;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
  tag?: string;
}
