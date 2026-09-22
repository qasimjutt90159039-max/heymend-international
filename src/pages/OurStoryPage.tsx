import React from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, Clock, Heart, Factory, ArrowRight, Layers, Scissors } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface OurStoryPageProps {
  onNavigate: (page: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
          LEATHER GOODS MANUFACTURER • MULTAN, PAKISTAN
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#19100B] leading-tight">
          Artisanal Integrity & Precision Manufacturing
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C] leading-relaxed max-w-2xl mx-auto">
          Located at Tareen Road in Multan, <strong>{siteConfig.businessName}</strong> operates a specialized leather goods manufacturing workshop. We craft export-grade leather goods combining time-honored bench techniques with modern leather machinery.
        </p>
      </div>

      {/* Visual Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-[#EAE3D9] aspect-4/3 shadow-sm bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
            alt="Handcrafting leather at Heymand International"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-serif text-white tracking-widest uppercase">
              Multan Workshop Craftsmanship
            </span>
          </div>
        </div>

        <div className="space-y-5 text-xs text-[#6A5B4C] leading-relaxed">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            Material Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Premium Leather Selection & Dedicated Workshop Bench Craft
          </h2>
          <p>
            At {siteConfig.businessName}, we focus on genuine export-quality leather. We select full-grain cowhides, vegetable-tanned artisan hides, and pull-up leathers that age gracefully, developing rich natural patinas with every year of use.
          </p>
          <p>
            Each wallet, belt, briefcase, and handbag is precision pattern-cut, edge-skived, and stitched using heavy-duty bonded threads on industrial synchronized walking-foot machines. We reinforce critical stress points and anchor hardware with durable backings.
          </p>
          <div className="pt-2 flex items-center gap-6 text-[#19100B]">
            <div>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#8C522F] block">100%</strong>
              <span className="text-[11px] text-stone-500">Genuine Leather</span>
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#8C522F] block">Direct</strong>
              <span className="text-[11px] text-stone-500">Manufacturer</span>
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#8C522F] block">Multan</strong>
              <span className="text-[11px] text-stone-500">Tareen Road</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multan Facility Chapter */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#E8E1D5] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            Our Multan Facility
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Tareen Road Workshop & Production Center
          </h2>
          <p className="text-xs text-[#6A5B4C] leading-relaxed">
            Conveniently situated near the DCS Office in Mohalla Qadirabad, Multan, our workshop serves local patrons, commercial corporate clients, and international wholesale buyers. We welcome client visits to discuss material options, examine sample batches, and review production schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E0D7C9]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#8C522F] font-bold text-xs uppercase">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <p className="text-xs text-[#19100B] font-semibold">{siteConfig.address.fullAddress}</p>
            <p className="text-[11px] text-stone-500">Near DCS Office, Multan 60000</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#8C522F] font-bold text-xs uppercase">
              <Clock className="w-4 h-4" />
              <span>Production Schedule</span>
            </div>
            <p className="text-xs text-[#19100B] font-semibold">{siteConfig.operatingHours.display}</p>
            <p className="text-[11px] text-stone-500">Direct factory consultations</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#8C522F] font-bold text-xs uppercase">
              <Factory className="w-4 h-4" />
              <span>Capabilities</span>
            </div>
            <p className="text-xs text-[#19100B] font-semibold">OEM / ODM & Private Label</p>
            <p className="text-[11px] text-stone-500">Low MOQs & custom foil debossing</p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('manufacturing')}
            className="px-6 py-2.5 bg-[#19100B] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#382216] transition-colors flex items-center gap-2"
          >
            <span>Learn More About Manufacturing</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#BFA054]" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 bg-[#FAF3EA] text-[#8C522F] border border-[#DCD3C5] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#EAE0D2] transition-colors"
          >
            Contact Facility Desk
          </button>
        </div>
      </div>
    </div>
  );
};
