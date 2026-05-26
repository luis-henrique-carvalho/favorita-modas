import Link from "next/link";
import { Shield, ArrowRight, LayoutDashboard, Database } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-8">
        {/* Decorative lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        {/* Header */}
        <div className="relative mb-8 text-center sm:text-left border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" /> Painel Restrito
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Favorita Modas — Admin
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Esta área será protegida por Better Auth. Aqui você poderá gerenciar produtos, categorias e visualizar leads de interesse.
          </p>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/80">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 self-start">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-200">Gerenciador de Peças</h3>
              <p className="text-xs text-neutral-400 mt-0.5">CRUD completo de produtos com variantes de cor, tamanho e controle de estoque.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/80">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 self-start">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-200">Lead e Conversão</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Visualize a lista de interesses de peças sem estoque e inicie contato via WhatsApp com um clique.</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl text-sm font-medium border border-neutral-800 hover:bg-neutral-800 text-neutral-300 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            Voltar ao Catálogo
          </Link>
          <button
            disabled
            className="flex-1 py-3 px-4 rounded-xl text-sm font-medium bg-neutral-800 text-neutral-500 border border-neutral-800 cursor-not-allowed transition-all flex items-center justify-center gap-1.5"
          >
            Entrar (Better Auth) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
