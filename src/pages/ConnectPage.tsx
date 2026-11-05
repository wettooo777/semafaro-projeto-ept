import React from 'react';
import { PageId } from '../types';
import { Wifi, Smartphone, Globe, Lock, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ConnectPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConnectPage: React.FC<ConnectPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      
      {/* Cabeçalho */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-md">
          <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guia para Demonstração Presencial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Como conectar o celular ao semáforo real
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Se você está em frente à maquete física do Semáforo Reni no colégio ou em uma apresentação, siga estes passos fáceis para abrir o painel da placa no seu próprio celular.
        </p>
      </div>

      {/* Alerta de Diferenciação */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start space-x-3 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-blue-950 font-bold mb-0.5">Lembrete amigável:</strong>
          Este site aqui é o <strong>guia explicativo na internet</strong>. O painel verdadeiro do semáforo fica guardado dentro da plaquinha da maquete e funciona mesmo sem internet!
        </div>
      </div>

      {/* Passo a Passo Ilustrado */}
      <div className="space-y-4">
        
        {/* Passo 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0 text-base">
            1
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <strong className="text-slate-900 text-base block font-bold">Ligue o Wi-Fi do seu celular</strong>
            <p>
              Procure na lista de redes disponíveis o nome:
            </p>
            <div className="p-2.5 bg-slate-100 rounded-lg font-mono text-sm font-bold text-slate-900 inline-block">
              📶 Semaforo-Inclusivo
            </div>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0 text-base">
            2
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <strong className="text-slate-900 text-base block font-bold">Digite a senha da rede</strong>
            <p>
              Por segurança, não publicamos a senha aberta na internet.
            </p>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-xs font-semibold">
              🔑 Peça a senha diretamente para a equipe de alunos ou professor que está apresentando a maquete!
            </div>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0 text-base">
            3
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <strong className="text-slate-900 text-base block font-bold">Se aparecer o aviso "Sem Internet", não se preocupe!</strong>
            <p>
              Muitos celulares avisam que essa rede não tem internet. <strong>Escolha "Continuar conectado"</strong>. A placa funciona como uma rede local independente.
            </p>
          </div>
        </div>

        {/* Passo 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0 text-base">
            4
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <strong className="text-slate-900 text-base block font-bold">Abra seu navegador de internet e digite o endereço</strong>
            <p>
              Abra o Chrome ou Safari e digite exatamente:
            </p>
            <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-sm rounded-xl inline-block font-bold">
              http://192.168.4.1/
            </div>
            <p className="text-slate-500 text-xs pt-1">
              (Dica: digite <code>http://</code> sem o "s" no final). Também funciona digitando <code>http://semaforo.reni/</code>.
            </p>
          </div>
        </div>

      </div>

      {/* O que tem dentro do painel da placa */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          O que você pode fazer depois de abrir o painel da placa?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-800 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ver o tempo do semáforo contando ao vivo</span>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cadastrar cartões e chaveiros novos</span>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ajustar os segundos de cada travessia</span>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Baixar as estatísticas dos últimos ciclos em JSON</span>
          </div>
        </div>
      </section>

    </div>
  );
};
