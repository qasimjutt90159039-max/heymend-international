import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Package,
  Heart,
  Eye,
  Gift,
  Briefcase,
  Factory,
  ChevronRight,
  Send,
  Scissors,
  Layers,
  FileText
} from 'lucide-react';
import { Product, Category } from '../types';
import { initialProducts, initialCategories } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface HomePageProps {
  products?: Product[];
  categories?: Category[];
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
  onOpenMonogramModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products = initialProducts,
  categories = initialCategories,
  onNavigate,
  onQuickView,
  onOpenMonogramModal
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'wallets' | 'belts' | 'bags' | 'handbags'>('all');
  const [quickQuoteProduct, setQuickQuoteProduct] = useState('Leather Wallets');
  const [quickQuoteQuantity, setQuickQuoteQuantity] = useState(50);

  const filteredProducts = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter(p => {
        if (activeTab === 'wallets') return p.categorySlug === 'leather-wallets' || p.category.includes('Wallet');
        if (activeTab === 'belts') return p.categorySlug === 'leather-belts' || p.category.includes('Belt');
        if (activeTab === 'bags') return p.categorySlug === 'bags-briefcases' || p.category.includes('Briefcase');
        if (activeTab === 'handbags') return p.categorySlug === 'handbags-totes' || p.category.includes('Handbag');
        return true;
      }).slice(0, 8);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* 1. Premier Manufacturer Hero Section */}
      <section className="relative bg-[#141E14] text-[#FAFBF7] overflow-hidden border-b border-[#263724]">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4DFC7_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D2B1C] border border-[#D4DFC7]/40 text-xs text-[#D4DFC7]">
                <span className="w-2 h-2 rounded-full bg-[#D4DFC7] animate-pulse"></span>
                <span className="font-semibold tracking-wider uppercase">
                  Multan Leather Goods Manufacturer & Exporter
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Master Leather Manufacturing & Handcrafted Goods.
              </h1>

              <p className="text-sm sm:text-base text-[#C7D7BE] max-w-xl leading-relaxed">
                Operating from Tareen Road in Multan, Pakistan, <strong className="text-[#D4DFC7]">{siteConfig.businessName}</strong> combines artisanal bench craftsmanship with modern industrial capacity. We produce export-grade leather wallets, belts, briefcases, handbags, and custom OEM collections for retail and worldwide B2B wholesale.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#141E14] font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-lg hover:translate-x-0.5 border border-[#B6C7A1]"
                >
                  <span>Explore Product Catalog</span>
                  <ArrowRight className="w-4 h-4 text-[#141E14]" />
                </button>

                <button
                  onClick={() => onNavigate('quote-request')}
                  className="px-6 py-3.5 bg-[#1D2B1C] hover:bg-[#253723] text-[#D4DFC7] border border-[#D4DFC7]/50 font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#D4DFC7]" />
                  <span>Request a Quote</span>
                </button>

                <button
                  onClick={() => onNavigate('b2b')}
                  className="px-6 py-3.5 bg-[#253723] hover:bg-[#30452D] text-white border border-[#3E563A] font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-[#D4DFC7]" />
                  <span>B2B / Wholesale</span>
                </button>
              </div>

              {/* Multan Physical Location Assurance */}
              <div className="pt-4 border-t border-[#263724] flex flex-wrap items-center gap-6 text-xs text-[#C7D7BE]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4DFC7]" />
                  <span>Tareen Rd, near DCS Office, Multan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4DFC7]" />
                  <a href={`tel:${siteConfig.contactNumber}`} className="hover:text-[#D4DFC7] font-semibold text-white">
                    {siteConfig.contactNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-[#D4DFC7]/30 bg-[#1D2B1C] shadow-2xl p-4 sm:p-6 space-y-4">
                <div className="relative aspect-4/3 rounded-md overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
                    alt="Leather Manufacturing Multan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="px-2 py-0.5 bg-[#D4DFC7] text-[#141E14] text-[10px] font-bold uppercase tracking-wider rounded-xs">
                        Direct From Workshop
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-1">
                        Executive Handcrafted Briefcase
                      </h3>
                      <p className="text-xs text-[#D4DFC7]">
                        Full-Grain Pull-Up Cowhide • Solid Brass Hardware
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                  <div className="p-3 bg-[#141E14] rounded-xs border border-[#2E422C]">
                    <span className="block font-serif text-lg font-bold text-[#D4DFC7]">20 - 50 Pcs</span>
                    <span className="text-[10px] text-[#A2B69C] uppercase tracking-wider">Flexible MOQs</span>
                  </div>
                  <div className="p-3 bg-[#141E14] rounded-xs border border-[#2E422C]">
                    <span className="block font-serif text-lg font-bold text-[#D4DFC7]">100% Genuine</span>
                    <span className="text-[10px] text-[#A2B69C] uppercase tracking-wider">Export Grade Leather</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars & Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white rounded-lg border border-[#DCE6D6] p-4 sm:p-6 shadow-md">
          <div className="flex items-start gap-3 p-3">
            <div className="p-2.5 rounded-sm bg-[#F2F6ED] text-[#384C35] shrink-0 border border-[#DCE6D6]">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#182318]">Direct Manufacturer</h4>
              <p className="text-xs text-[#526B4D] mt-0.5">Physical facility in Multan with no middlemen markups.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3">
            <div className="p-2.5 rounded-sm bg-[#F2F6ED] text-[#384C35] shrink-0 border border-[#DCE6D6]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#182318]">OEM / Custom Branding</h4>
              <p className="text-xs text-[#526B4D] mt-0.5">Debossing, custom foil stamping & bespoke metal hardware.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3">
            <div className="p-2.5 rounded-sm bg-[#F2F6ED] text-[#384C35] shrink-0 border border-[#DCE6D6]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#182318]">Domestic & Export Logistics</h4>
              <p className="text-xs text-[#526B4D] mt-0.5">Nationwide COD across Pakistan & worldwide air/sea cargo.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3">
            <div className="p-2.5 rounded-sm bg-[#F2F6ED] text-[#384C35] shrink-0 border border-[#DCE6D6]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#182318]">100% Genuine Leather</h4>
              <p className="text-xs text-[#526B4D] mt-0.5">Full-grain cowhide, vegetable-tanned & top-grain hides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#DCE6D6] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#384C35] font-bold">
              Factory Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#182318] mt-1">
              Explore Leather Goods Lines
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#384C35] hover:text-[#182318] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All 14 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.slug)}
              className="bg-white rounded-lg border border-[#DCE6D6] overflow-hidden group hover:border-[#4B6447] hover:shadow-md transition-all cursor-pointer text-center p-3 flex flex-col justify-between"
            >
              <div className="aspect-square rounded-sm overflow-hidden mb-3 bg-[#F2F6ED]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm font-bold text-[#182318] group-hover:text-[#384C35] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-[#526B4D] mt-0.5">From {formatPKR(cat.startingPrice || 0)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Product Catalog / E-commerce Grid with Tabs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#DCE6D6] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#384C35] font-bold">
              Available For Immediate Order
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#182318] mt-1">
              Handcrafted Product Catalog
            </h2>
          </div>

          <div className="flex border border-[#C5D4BD] rounded-full p-1 bg-[#F2F6ED] text-xs font-semibold overflow-x-auto">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'wallets', label: 'Wallets' },
              { id: 'belts', label: 'Belts' },
              { id: 'bags', label: 'Briefcases' },
              { id: 'handbags', label: 'Handbags' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#182318] text-[#D4DFC7] shadow-xs'
                    : 'text-[#384C35] hover:text-[#182318]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-[#F2F6ED] text-[#243522] hover:bg-[#182318] hover:text-[#D4DFC7] border border-[#C5D4BD] rounded-xs text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>View Entire Manufacturing Catalog ({products.length} Products)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. Manufacturing Capabilities Featurette */}
      <section className="bg-[#F2F6ED] border-y border-[#DCE6D6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#384C35] font-bold">
                Contract Leather Manufacturing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#182318] leading-tight">
                Specialized OEM & Private Label Production for Global Brands.
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5D45] leading-relaxed">
                From precision die-clicking to edge-burnishing and high-tonnage debossing, our Multan facility manages the entire value chain. We supply fashion brands, e-commerce labels, corporate procurement desks, and retail stores with dependable export manufacturing.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-md border border-[#DCE6D6] space-y-1">
                  <Scissors className="w-5 h-5 text-[#384C35]" />
                  <h4 className="font-serif text-sm font-bold text-[#182318]">CAD Pattern Engineering</h4>
                  <p className="text-[11px] text-[#526B4D]">Pattern drafting and physical prototypes within 7-10 days.</p>
                </div>
                <div className="p-4 bg-white rounded-md border border-[#DCE6D6] space-y-1">
                  <Sparkles className="w-5 h-5 text-[#384C35]" />
                  <h4 className="font-serif text-sm font-bold text-[#182318]">Custom Metal Hardware</h4>
                  <p className="text-[11px] text-[#526B4D]">Solid brass, brushed nickel, and custom engraved rivets.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('manufacturing')}
                  className="px-6 py-3 bg-[#182318] text-[#D4DFC7] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#253723] transition-colors flex items-center gap-2 border border-[#3E563A]"
                >
                  <span>Explore Manufacturing Facility</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4DFC7]" />
                </button>
                <button
                  onClick={() => onNavigate('quote-request')}
                  className="px-6 py-3 bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#141E14] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 border border-[#B6C7A1]"
                >
                  <span>Request Factory Quote</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-lg overflow-hidden border border-[#DCE6D6] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop"
                  alt="Heymand International Workshop Multan"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#141E14] text-white p-5 rounded-md border border-[#D4DFC7]/40 shadow-xl max-w-xs hidden sm:block">
                <p className="font-serif text-sm font-bold text-[#D4DFC7]">Multan Workshop Location</p>
                <p className="text-[11px] text-[#C7D7BE] mt-1 leading-snug">
                  Tareen Rd, near DCS Office, Mohalla Qadirabad, Multan. Facility visits available by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Instant Quote Quick Estimator Callout */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-[#141E14] text-white rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#263724]">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4DFC7] font-bold">
              Instant Quote Generator
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Planning a Custom Run or Wholesale Order?
            </h3>
            <p className="text-xs sm:text-sm text-[#C7D7BE] leading-relaxed">
              Select your product type and estimated batch size to initiate a quotation with our estimating engineers in Multan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div>
                <label className="block text-[11px] text-[#A2B69C] mb-1 font-semibold">Product Type</label>
                <select
                  value={quickQuoteProduct}
                  onChange={(e) => setQuickQuoteProduct(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#1D2B1C] border border-[#2E422C] text-white rounded-xs focus:outline-none focus:border-[#D4DFC7]"
                >
                  <option value="Leather Wallets">Leather Wallets</option>
                  <option value="Leather Belts">Leather Belts</option>
                  <option value="Briefcases & Bags">Briefcases & Bags</option>
                  <option value="Handbags & Totes">Handbags & Totes</option>
                  <option value="Travel Bags">Travel Bags</option>
                  <option value="Corporate Gifts">Corporate Gift Sets</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#A2B69C] mb-1 font-semibold">Quantity (MOQ 20)</label>
                <input
                  type="number"
                  min={20}
                  value={quickQuoteQuantity}
                  onChange={(e) => setQuickQuoteQuantity(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-[#1D2B1C] border border-[#2E422C] text-white rounded-xs focus:outline-none focus:border-[#D4DFC7]"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => onNavigate('quote-request')}
                  className="w-full py-2.5 bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#141E14] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors border border-[#B6C7A1]"
                >
                  <span>Continue Quote →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Location & Multan Facility Contact Map */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-[#DCE6D6] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#384C35] font-bold">
                Physical Presence
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#182318]">
                Visit Our Facility in Multan, Pakistan
              </h3>
              <p className="text-xs text-[#526B4D] leading-relaxed">
                We take pride in transparent operations. Domestic clients and overseas delegations are welcome to inspect leather hides, review stitching lines, and discuss customized orders directly with our technical team.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#384C35]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#384C35] shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> {siteConfig.address.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#384C35] shrink-0" />
                  <span><strong>Direct Line:</strong> {siteConfig.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#384C35] shrink-0" />
                  <span><strong>Operating Hours:</strong> {siteConfig.operatingHours.display}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${siteConfig.contactNumber}`}
                  className="px-5 py-2 bg-[#182318] text-[#D4DFC7] text-xs font-bold rounded-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Multan Desk</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xs flex items-center gap-1.5"
                >
                  <span>WhatsApp Commercial Chat</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg overflow-hidden border border-[#DCE6D6] bg-[#F2F6ED] p-6 text-center space-y-3">
                <MapPin className="w-8 h-8 text-[#384C35] mx-auto" />
                <h4 className="font-serif text-base font-bold text-[#182318]">
                  Multan Production Hub
                </h4>
                <p className="text-xs text-[#526B4D] max-w-sm mx-auto">
                  Conveniently situated near DCS Office on Tareen Road, Mohalla Qadirabad, Multan (Postal Code 60000).
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 bg-white text-[#182318] border border-[#C5D4BD] text-xs font-semibold rounded-xs hover:bg-[#FAFBF7] transition-colors"
                >
                  View Full Map & Contact Page →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
