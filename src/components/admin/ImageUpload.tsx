'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Изображение' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Ошибка загрузки');
        return;
      }
      onChange(json.url);
    } catch {
      setError('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const previewSrc = value && !value.startsWith('/uploads/placeholder')
    ? value
    : null;

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>

      {previewSrc ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 group">
          <Image
            src={previewSrc.startsWith('http') ? previewSrc : previewSrc}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg"
            >
              Заменить
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-[#22c55e] bg-slate-50 hover:bg-green-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 text-sm">Загрузка...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-slate-600 text-sm font-medium">Перетащите файл или нажмите</p>
                <p className="text-slate-400 text-xs mt-1">PNG, JPG, WebP до 5 МБ</p>
              </div>
            </>
          )}
        </div>
      )}

      {value && !previewSrc && (
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <ImageIcon className="w-4 h-4" />
          <span className="truncate">{value}</span>
          <button type="button" onClick={() => onChange('')} className="text-red-500 hover:text-red-700 ml-auto shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
