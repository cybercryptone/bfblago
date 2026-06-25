'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle } from 'lucide-react';
import type { Campaign } from '@/types';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';
import DonationModal from '@/components/ui/DonationModal';

interface Props {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const progress = calculateProgress(campaign.collectedAmount, campaign.goalAmount);
  const remaining = Math.max(campaign.goalAmount - campaign.collectedAmount, 0);

  const imageSrc = (!campaign.image || campaign.image.startsWith('/uploads/') || imgError)
    ? `https://picsum.photos/seed/${campaign.id}/400/300`
    : campaign.image;

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={campaign.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
          {campaign.isClosed && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 bg-[#22c55e] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                <CheckCircle className="w-3.5 h-3.5" />
                Сбор закрыт
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-[#0c2461] text-base leading-tight">{campaign.name}</h3>
              <span className="text-slate-400 text-xs font-medium whitespace-nowrap shrink-0">
                {campaign.age} {getAgeLabel(campaign.age)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <MapPin className="w-3 h-3" />
              {campaign.city}
            </div>
          </div>

          {/* Story */}
          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
            {campaign.shortStory}
          </p>

          {/* Progress */}
          <div className="space-y-2.5 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Собрано</span>
              <span className="font-bold text-[#0c2461]">{progress}%</span>
            </div>
            <ProgressBar value={progress} />
            <div className="flex justify-between text-xs">
              <div>
                <span className="text-[#22c55e] font-bold">{formatCurrency(campaign.collectedAmount)}</span>
                <span className="text-slate-400 ml-1">из {formatCurrency(campaign.goalAmount)}</span>
              </div>
              {!campaign.isClosed && remaining > 0 && (
                <span className="text-slate-400">
                  осталось {formatCurrency(remaining)}
                </span>
              )}
            </div>
          </div>

          {/* Button */}
          {campaign.isClosed ? (
            <div className="w-full py-3 text-center text-[#22c55e] font-semibold text-sm bg-green-50 rounded-full">
              ✓ Помощь оказана
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Помочь
            </button>
          )}
        </div>
      </div>

      <DonationModal
        campaignId={campaign.id}
        campaignName={campaign.name}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function getAgeLabel(age: number): string {
  if (age >= 11 && age <= 14) return 'лет';
  const last = age % 10;
  if (last === 1) return 'год';
  if (last >= 2 && last <= 4) return 'года';
  return 'лет';
}
