import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

interface TestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  message: string;
  timestamp: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

// In-memory state for verification purposes
let lastTestResult: TestResult | null = null;
let lastUploadResult: UploadResult | null = null;

export default async function TestCloudinaryPage() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
  const apiKey = process.env.CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  const isConfigured = cloudName !== "" && apiKey !== "" && apiSecret !== "";

  // Server Action to test connection (ping)
  async function handleTestConnection() {
    "use server";
    try {
      if (!isConfigured) {
        lastTestResult = {
          success: false,
          message: "Credenciais ausentes ou vazias no arquivo .env",
          timestamp: new Date().toLocaleTimeString("pt-BR"),
        };
        revalidatePath("/");
        return;
      }

      const result = await cloudinary.api.ping();
      lastTestResult = {
        success: result.status === "ok",
        message:
          result.status === "ok"
            ? "Conexão estabelecida com sucesso! O SDK do Cloudinary está autenticado."
            : `Resposta inesperada: ${JSON.stringify(result)}`,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
      };
    } catch (error: unknown) {
      lastTestResult = {
        success: false,
        message: `Falha na conexão: ${getErrorMessage(error)}`,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
      };
    }
    revalidatePath("/");
  }

  // Server Action to upload image
  async function handleUploadImage(formData: FormData) {
    "use server";
    try {
      if (!isConfigured) {
        lastUploadResult = {
          success: false,
          message: "Credenciais do Cloudinary não estão configuradas.",
          timestamp: new Date().toLocaleTimeString("pt-BR"),
        };
        revalidatePath("/");
        return;
      }

      const file = formData.get("image") as File | null;
      if (!file || file.size === 0) {
        lastUploadResult = {
          success: false,
          message: "Por favor, selecione um arquivo de imagem válido.",
          timestamp: new Date().toLocaleTimeString("pt-BR"),
        };
        revalidatePath("/");
        return;
      }

      // Convert File stream into Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert Buffer to Base64 URI
      const base64Data = buffer.toString("base64");
      const fileUri = `data:${file.type};base64,${base64Data}`;

      // Upload to Cloudinary under 'favorita-modas-test' directory
      const uploadResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "favorita-modas-test",
      });

      lastUploadResult = {
        success: true,
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
        message: "Imagem carregada com sucesso para o Cloudinary!",
        timestamp: new Date().toLocaleTimeString("pt-BR"),
      };
    } catch (error: unknown) {
      lastUploadResult = {
        success: false,
        message: `Falha no upload da imagem: ${getErrorMessage(error)}`,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
      };
    }
    revalidatePath("/");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-8">
        {/* Decorative lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        {/* Header */}
        <div className="relative mb-8 text-center sm:text-left border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Validação da Stack
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Favorita Modas — Cloudinary Lab
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Painel interativo para verificar a conexão e testar uploads reais para o Cloudinary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Connection Status & Diagnostic */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold text-neutral-200 mb-4">
                1. Status de Conexão
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">CLOUD_NAME</span>
                  <span className={cloudName ? "text-emerald-400" : "text-amber-400"}>
                    {cloudName ? "Preenchido" : "Ausente"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">API_KEY</span>
                  <span className={apiKey ? "text-emerald-400" : "text-amber-400"}>
                    {apiKey ? "Preenchido" : "Ausente"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">API_SECRET</span>
                  <span className={apiSecret ? "text-emerald-400" : "text-amber-400"}>
                    {apiSecret ? "Preenchido" : "Ausente"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <form action={handleTestConnection} className="w-full">
                <button
                  type="submit"
                  disabled={!isConfigured}
                  className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    isConfigured
                      ? "bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                      : "bg-neutral-800/40 text-neutral-600 cursor-not-allowed border border-neutral-800/80"
                  }`}
                >
                  Testar Ping
                </button>
              </form>

              {lastTestResult && (
                <div
                  className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${lastTestResult.success ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400" : "bg-red-500/5 border-red-500/10 text-red-400"}`}
                >
                  <div className="flex justify-between font-bold mb-1">
                    <span>{lastTestResult.success ? "ONLINE" : "FALHA"}</span>
                    <span className="opacity-60">{lastTestResult.timestamp}</span>
                  </div>
                  {lastTestResult.message}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Interactive Image Upload Form */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between">
            <h2 className="text-base font-semibold text-neutral-200 mb-3">2. Teste de Upload</h2>

            <form action={handleUploadImage} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5">
                  Escolha uma Imagem (PNG/JPG)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  disabled={!isConfigured}
                  required
                  className={`w-full text-xs text-neutral-400 border border-neutral-800 rounded-lg p-2.5 bg-neutral-900/50 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold ${
                    isConfigured
                      ? "file:bg-rose-500/10 file:text-rose-400 hover:border-neutral-700 cursor-pointer file:cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={!isConfigured}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                  isConfigured
                    ? "bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-lg shadow-rose-600/10"
                    : "bg-neutral-800/40 text-neutral-600 cursor-not-allowed border border-neutral-800/80"
                }`}
              >
                Fazer Upload
              </button>
            </form>
          </div>
        </div>

        {/* Upload Result Section */}
        {lastUploadResult && (
          <div
            className={`p-6 rounded-2xl border-2 mb-6 ${lastUploadResult.success ? "bg-emerald-950/20 border-emerald-500/20" : "bg-red-950/20 border-red-500/20"}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${lastUploadResult.success ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                >
                  {lastUploadResult.success ? "Upload Concluído" : "Erro no Upload"}
                </span>
                <p className="text-xs text-neutral-500 mt-1">{lastUploadResult.timestamp}</p>
              </div>
            </div>

            <p
              className={`text-sm ${lastUploadResult.success ? "text-emerald-300" : "text-red-300"} mb-4`}
            >
              {lastUploadResult.message}
            </p>

            {lastUploadResult.success && lastUploadResult.url && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 border border-neutral-800 rounded-xl p-4">
                <div className="flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                      Public ID
                    </span>
                    <code className="text-xs font-mono bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-rose-400 block truncate">
                      {lastUploadResult.publicId}
                    </code>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                      URL Segura
                    </span>
                    <a
                      href={lastUploadResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 underline block truncate"
                    >
                      {lastUploadResult.url}
                    </a>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 flex items-center justify-center aspect-video sm:aspect-auto sm:h-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lastUploadResult.url}
                    alt="Preview Cloudinary Upload"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!isConfigured && (
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 text-amber-300 rounded-xl text-sm leading-relaxed text-center sm:text-left">
            <span className="font-bold">Aviso:</span> O formulário de upload está desabilitado
            porque as variáveis de ambiente do Cloudinary no seu arquivo{" "}
            <code className="bg-amber-500/10 text-amber-400 px-1 py-0.5 rounded font-mono text-xs">
              .env
            </code>{" "}
            não estão preenchidas. Preencha-as para habilitar e testar uploads reais!
          </div>
        )}
      </div>
    </main>
  );
}
