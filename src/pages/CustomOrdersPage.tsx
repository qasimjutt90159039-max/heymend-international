import React, { useState } from 'react';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Phone,
  FileCheck,
  Award
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface CustomOrdersPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenMonogramModal?: () => void;
}

export const CustomOrdersPage: React.FC<CustomOrdersPageProps> = ({ onNavigate, onOpenMonogramModal }) => {
  const [selectedLeather, setSelectedLeather] = useState('full-grain');
  const [selectedHardware, setSelectedHardware] = useState('brass');
  const [customInitials, setCustomInitials] = useState('');
  const [stampStyle, setStampStyle] = useState('gold');

  const customServices = [
    {
      title: 'Bespoke Dimension & Architecture',
      desc: 'Need a laptop briefcase tailored to an exact 16-inch workstation with dedicated charger sleeves, or a long wallet sized for multi-currency travel? Our pattern masters draft custom blueprints.',
      icon: Scissors
    },
    {
      title: 'Artisan Leather & Colorway Selection',
      desc: 'Choose from vegetable-tanned Italian-style leathers, natural pull-up cowhide, smooth nappa, or structured saffiano in classic or custom-dyed shades.',
      icon: Layers
    },
    {
      title: 'Hot Foil & Blind Debossing',
      desc: 'Personalize with precision heated brass dies in antique gold foil, mirror silver foil, or subtle blind debossing for timeless distinction.',
      icon: Sparkles
    },
    {
      title: 'Signature Hardware Finishes',
      desc: 'Select solid brass buckles, gunmetal rivets, satin nickel push-locks, and smooth-gliding YKK metal zippers tested for over 50,000 cycles.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#19100B] font-sans pb-20">
      {/* Hero Banner */}
      <section className="bg-[#19100B] text-white py-16 sm:py-24 relative overflow-hidden border-b border-[#382216]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-xs text-[#D8CCA8]">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" />
              <span className="font-semibold tracking-wider uppercase">Bespoke Atelier & Custom Goods</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Crafted Exclusively to Your Exact Blueprint.
            </h1>

            <p className="text-sm sm:text-base text-[#D0C3B0] leading-relaxed">
              At <span className="text-[#D8BA73] font-semibold">{siteConfig.businessName}</span>, custom leather making is our heritage. Whether you are commissioning a bespoke briefcase, personalized monogrammed gift sets, or a prototype production batch, our Multan master artisans bring your vision to life.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('quote-request')}
                className="px-6 py-3 bg-[#BFA054] text-[#19100B] font-semibold text-xs uppercase tracking-wider rounded-xs hover:bg-[#D8BA73] transition-all flex items-center gap-2"
              >
                <span>Request Custom Blueprint Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenMonogramModal && (
                <button
                  onClick={onOpenMonogramModal}
                  className="px-6 py-3 bg-[#25160E] text-[#D8CCA8] border border-[#BFA054]/40 font-semibold text-xs uppercase tracking-wider rounded-xs hover:bg-[#382216] transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" />
                  <span>Interactive Monogram Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
            Tailored Excellence
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#19100B]">
            Customization Possibilities
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5C]">
            Every stitch, edge, pocket, and hardware fixture can be customized to your lifestyle or brand identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-4 hover:border-[#8C522F] transition-all shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF3EA] text-[#8C522F] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#19100B]">{service.title}</h3>
                <p className="text-xs text-[#6A5B4C] leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Visual Preview Box */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
              Interactive Customization Preview
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#19100B] mt-1">
              Select Your Specifications
            </h3>
            <p className="text-xs text-[#7A6B5C]">
              Preview how different leathers, hardware, and personalized foil stamping look before submitting your custom request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#19100B] mb-2">1. Leather Type</label>
              <div className="space-y-2">
                {[
                  { id: 'full-grain', name: 'Full-Grain Vintage Cowhide', desc: 'Develops rich patina' },
                  { id: 'veg-tan', name: 'Vegetable Tanned Leather', desc: 'Firm artisan burnished' },
                  { id: 'nappa', name: 'Smooth Nappa Calfskin', desc: 'Ultra-supple touch' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedLeather(item.id)}
                    className={`p-3 rounded-xs border text-xs cursor-pointer transition-all ${
                      selectedLeather === item.id
                        ? 'bg-[#FAF3EA] border-[#8C522F] text-[#19100B]'
                        : 'bg-[#FAF8F5] border-[#DCD3C5] text-[#6A5B4C]'
                    }`}
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-[10px] text-[#8A7969]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#19100B] mb-2">2. Hardware Finish</label>
              <div className="space-y-2">
                {[
                  { id: 'brass', name: 'Antiqued Solid Brass', desc: 'Classic golden warm look' },
                  { id: 'nickel', name: 'Satin Brushed Nickel', desc: 'Contemporary executive' },
                  { id: 'matte-black', name: 'Matte Black Anodized', desc: 'Modern stealth aesthetic' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedHardware(item.id)}
                    className={`p-3 rounded-xs border text-xs cursor-pointer transition-all ${
                      selectedHardware === item.id
                        ? 'bg-[#FAF3EA] border-[#8C522F] text-[#19100B]'
                        : 'bg-[#FAF8F5] border-[#DCD3C5] text-[#6A5B4C]'
                    }`}
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-[10px] text-[#8A7969]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#19100B] mb-2">3. Hot-Stamp Personalization</label>
              <div className="space-y-3">
                <input
                  type="text"
                  maxLength={5}
                  value={customInitials}
                  onChange={e => setCustomInitials(e.target.value.toUpperCase())}
                  placeholder="Enter Initials (e.g. H.T)"
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs font-serif font-bold tracking-widest uppercase focus:outline-none focus:border-[#8C522F]"
                />

                <div className="flex gap-2 text-xs">
                  {[
                    { id: 'gold', name: 'Gold Foil' },
                    { id: 'silver', name: 'Silver Foil' },
                    { id: 'blind', name: 'Blind Deboss' }
                  ].map(style => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setStampStyle(style.id)}
                      className={`flex-1 py-1.5 rounded-xs text-[11px] font-semibold border ${
                        stampStyle === style.id
                          ? 'bg-[#19100B] text-white border-[#19100B]'
                          : 'bg-[#FAF8F5] border-[#DCD3C5] text-[#6A5B4C]'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-[#25160E] rounded-md text-center border border-[#BFA054]/30">
                  <p className="text-[10px] text-[#A3927B] uppercase tracking-wider">Live Stamping Preview</p>
                  <div
                    className={`font-serif text-2xl font-bold tracking-[0.25em] py-2 ${
                      stampStyle === 'gold'
                        ? 'text-[#E5C378]'
                        : stampStyle === 'silver'
                        ? 'text-[#E0E0E0]'
                        : 'text-[#5A3825]'
                    }`}
                  >
                    {customInitials || 'H.I'}
                  </div>
                  <p className="text-[10px] text-[#D8CCA8]">
                    {selectedLeather.toUpperCase()} • {selectedHardware.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#7A6B5C]">
              Ready to submit this custom configuration to our Multan pattern desk?
            </p>
            <button
              onClick={() => onNavigate('quote-request')}
              className="px-6 py-2.5 bg-[#19100B] hover:bg-[#382216] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2"
            >
              <span>Transfer to Quote Request</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#BFA054]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
