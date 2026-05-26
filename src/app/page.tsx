"use client";
import { CldUploadWidget } from "next-cloudinary";

export default function UploadForm() {
  return (
    <CldUploadWidget
      uploadPreset="seu-upload-preset" // Crie um preset no painel do Cloudinary
      onSuccess={(result) => {
        console.log("Upload concluído!", result);
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => open()}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Carregar Imagem
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
