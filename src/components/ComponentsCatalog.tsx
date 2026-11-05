import React, { useState } from 'react';
import { Cpu, Radio, CreditCard, Tv, Sun, ToggleLeft, Volume2, BatteryCharging, Box, AlertOctagon, Info } from 'lucide-react';
import { ComponentItem } from '../types';

export const ComponentsCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const components: ComponentItem[] = [
    {
      name: 'ESP32 DEVKIT V1 (ESP-WROOM-32)',
      category: 'Controle e Comunicação',
      quantity: '1 placa',
      description: 'Microcontrolador principal de 32 bits com Wi-Fi embutido. Executa o programa em máquina de estados, gerencia entradas (botão e RFID), saídas (LEDs, OLED e buzzer) e fornece o servidor web local com o painel de controle.',
      technicalNote: 'Montado diretamente na estrutura interna sem protoboard, com conector micro-USB voltado para a abertura inferior.',
    },
    {
      name: 'Leitor RFID RC522 (13,56 MHz)',
      category: 'Controle e Comunicação',
      quantity: '1 módulo leitor',
      description: 'Comunica-se com o ESP32 via barramento SPI (pinos GPIO18, 19, 23, 26, 27). Lê o identificador único (UID) dos cartões e chaveiros aproximados do topo da caixa.',
      technicalNote: 'Alimentado rigorosamente em 3,3 V. Instalado na bandeja superior sob o teto da caixa 3D.',
    },
    {
      name: 'Cartões e Chaveiros Mifare RFID',
      category: 'Controle e Comunicação',
      quantity: '1 cartão + 1 chaveiro',
      description: 'Identificadores passivos por radiofrequência. Cada peça possui seu próprio UID de fábrica e é cadastrada individualmente no painel web com tempo e preferência de som.',
      technicalNote: 'Cadastrados separadamente; não transmitem nem guardam dados pessoais médicos.',
    },
    {
      name: 'Display Gráfico OLED 0,96" (SSD1306)',
      category: 'Sinalização e Saídas',
      quantity: '1 display (128 × 64 pixels)',
      description: 'Comunicação I²C (endereço 0x3C, GPIO21 e GPIO22). Exibe AGUARDE com figura humana parada durante o sinal verde/amarelo veicular e o pedestre em caminhada com números grandes durante a passagem.',
      technicalNote: 'Alimentado em 3,3 V. Não exibe filas ou listas de pessoas durante a travessia.',
    },
    {
      name: 'LEDs Difusos de 5 mm (Vermelho, Amarelo e Verde)',
      category: 'Sinalização e Saídas',
      quantity: '3 unidades (1 de cada cor)',
      description: 'Representam a sinalização luminosa DOS VEÍCULOS. Cada LED possui seu próprio resistor em série de 330 Ω (não compartilham resistor comum).',
      technicalNote: 'Conectados aos pinos GPIO25 (vermelho), GPIO32 (amarelo) e GPIO33 (verde).',
    },
    {
      name: 'Botão Tátil / Push Button com Capa',
      category: 'Controle e Comunicação',
      quantity: '1 chave de 4 terminais',
      description: 'Permite a solicitação física direta de travessia. Conectado ao pino GPIO13 e GND, utilizando o resistor de pull-up interno do ESP32.',
      technicalNote: 'Diferencia clique curto (adiciona 5s, até 3 toques) e pressão longa contínua de 2s (30s + som).',
    },
    {
      name: 'Buzzer Piezoelétrico Passivo',
      category: 'Sinalização e Saídas',
      quantity: '1 transdutor acústico',
      description: 'Gera os sinais audíveis através de pulsos oscilantes de 2 kHz emitidos pelo GPIO14. Emite bipes curtos de confirmação de cadastro e o aviso progressivo de travessia.',
      technicalNote: 'Recomendado resistor limitador em série de 1 kΩ. Furo frontal de 3 mm na caixa.',
    },
    {
      name: 'Bateria de 9 V com Conversor DC-DC XL4015',
      category: 'Alimentação e Estrutura',
      quantity: '1 bateria + 1 módulo regulador step-down',
      description: 'Permite demonstrações sem fio conectado à tomada. O módulo conversor XL4015 reduz a tensão da bateria para 5,0 V regulados e alimenta o pino VIN do ESP32.',
      technicalNote: 'A autonomia da bateria sob carga não foi medida. Desconectar o conversor ao usar alimentação por cabo USB.',
    },
    {
      name: 'Resistores, Fios Dupont e Caixa em PLA (V11)',
      category: 'Alimentação e Estrutura',
      quantity: 'Conjunto mecânico completo',
      description: 'Estrutura impressa em 3D com travas sob medida para prender placas e periféricos sem cola. Inclui chapéus com recuo de 3 mm para sombreamento dos LEDs e suporte para fixação tipo poste.',
      technicalNote: 'Montada com parafusos M2,5 e M3 métricos, com guias internos para cabeamento.',
    },
  ];

  const categories = ['todos', 'Controle e Comunicação', 'Sinalização e Saídas', 'Alimentação e Estrutura'];

  const filteredComponents = activeCategory === 'todos' 
    ? components 
    : components.filter((c) => c.category === activeCategory);

  return (
    <section id="componentes" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded-md mb-3">
            <span>Hardware & Montagem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Componentes utilizados no protótipo
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Visão detalhada de cada peça eletrônica e mecânica que compõe o demonstrador de bancada do Semáforo Reni (versão V6.1 / Caixa V11).
          </p>
        </div>

        {/* ALERTA DE TRANSPARÊNCIA: O que NÃO existe no protótipo */}
        <div className="p-6 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2.5 text-amber-900 font-bold text-sm">
            <AlertOctagon className="w-5 h-5 text-amber-700 shrink-0" />
            <span>O que NÃO existe no protótipo atual (Esclarecimentos Importantes)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 text-xs text-amber-900">
            <div className="p-3 rounded-lg bg-white/80 border border-amber-200">
              <strong className="block text-slate-900 mb-1">Tela de Alto Contraste:</strong>
              A tela OLED azul em fundo escuro é pensada para leitura sem erro por pessoas com daltonismo.
            </div>
            <div className="p-3 rounded-lg bg-white/80 border border-amber-200">
              <strong className="block text-slate-900 mb-1">Sem Câmera ou Visão:</strong>
              Não há câmera de vídeo, leitor de imagem ou reconhecimento facial operando no sistema.
            </div>
            <div className="p-3 rounded-lg bg-white/80 border border-amber-200">
              <strong className="block text-slate-900 mb-1">Lentes PIR são Ópticas:</strong>
              As 3 cúpulas frontais são apenas lentes difusoras de luz; <strong>não há sensor PIR eletrônico</strong> lendo presença humana.
            </div>
            <div className="p-3 rounded-lg bg-white/80 border border-amber-200">
              <strong className="block text-slate-900 mb-1">Autonomia Não Medida:</strong>
              A duração da bateria de 9 V sob uso contínuo com Wi-Fi ativo não foi aferida em laboratório.
            </div>
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar componentes por categoria">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'todos' ? 'Todos os Componentes' : cat}
            </button>
          ))}
        </div>

        {/* Grade de Componentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    {item.quantity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.technicalNote && (
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  <span className="text-slate-400 block mb-0.5 font-sans font-bold text-[10px] uppercase">Detalhe de montagem:</span>
                  {item.technicalNote}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
