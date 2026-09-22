import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Package,
  Factory,
  FileText,
  Send,
  CheckCircle2
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      setStatus('loading');
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-[#141E14] text-[#D4DFC7] border-t border-[#263724] pt-14 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Manufacturing & Craft Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#263724]/80 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#1D2B1C] text-[#D4DFC7] border border-[#D4DFC7]/30 shrink-0">
              <Award className="w-5 h-5 text-[#D4DFC7]" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">100% Genuine Leather</h4>
              <p className="text-[#A2B69C] mt-0.5">Export-grade full-grain cowhide, veg-tan and supple calfskin</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#1D2B1C] text-[#D4DFC7] border border-[#D4DFC7]/30 shrink-0">
              <Factory className="w-5 h-5 text-[#D4DFC7]" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Direct Manufacturer</h4>
              <p className="text-[#A2B69C] mt-0.5">Multan facility production with flexible MOQs & OEM private labeling</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#1D2B1C] text-[#D4DFC7] border border-[#D4DFC7]/30 shrink-0">
              <Package className="w-5 h-5 text-[#D4DFC7]" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Domestic & Export Supply</h4>
              <p className="text-[#A2B69C] mt-0.5">Nationwide COD across Pakistan & worldwide air/sea cargo</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#1D2B1C] text-[#D4DFC7] border border-[#D4DFC7]/30 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#D4DFC7]" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Quality Guarantee</h4>
              <p className="text-[#A2B69C] mt-0.5">Tested brass hardware, reinforced bonded seams & inspection protocols</p>
            </div>
          </div>
        </div>

        {/* Primary Footer Links & Manufacturing Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand & Multan Facility Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center gap-3 select-none"
            >
              <div className="w-10 h-10 rounded-sm bg-[#1D2B1C] text-[#D4DFC7] flex flex-col items-center justify-center border border-[#D4DFC7]/40">
                <span className="font-serif text-lg font-bold">H</span>
                <span className="text-[7px] text-[#D4DFC7] font-sans -mt-1">INTL</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-wider text-white leading-none">
                  HEYMAND INTERNATIONAL
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#D4DFC7] mt-1">
                  Leather Goods Manufacturer • Multan, Pakistan
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A2B69C] leading-relaxed max-w-sm">
              Heymand International is a specialized leather goods manufacturer based in Multan, Pakistan. We engineer handcrafted leather wallets, belts, executive briefcases, handbags, and corporate gift collections for retail and global B2B clients.
            </p>

            <div className="space-y-2 text-xs text-[#A2B69C]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4DFC7] shrink-0 mt-0.5" />
                <span>{siteConfig.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4DFC7] shrink-0" />
                <a
                  href={`tel:${siteConfig.contactNumber}`}
                  className="text-white hover:text-[#D4DFC7] font-semibold"
                >
                  {siteConfig.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4DFC7] shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4DFC7] shrink-0" />
                <span>{siteConfig.operatingHours.display}</span>
              </div>
            </div>
          </div>

          {/* Manufacturing & B2B Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Manufacturing & B2B
            </h4>
            <ul className="space-y-2 text-xs text-[#A2B69C]">
              <li>
                <button
                  onClick={() => onNavigate('manufacturing')}
                  className="hover:text-white transition-colors"
                >
                  Factory Capabilities & Workflow
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-white transition-colors"
                >
                  B2B Wholesale Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="hover:text-white transition-colors"
                >
                  Custom OEM / Private Label
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote-request')}
                  className="text-[#D4DFC7] font-semibold hover:underline"
                >
                  Request a Quotation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corporate-gifting')}
                  className="hover:text-white transition-colors"
                >
                  Corporate Gifting Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Product Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Leather Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A2B69C]">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'leather-wallets')}
                  className="hover:text-white transition-colors"
                >
                  Handcrafted Wallets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'leather-belts')}
                  className="hover:text-white transition-colors"
                >
                  Artisan Leather Belts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'bags-briefcases')}
                  className="hover:text-white transition-colors"
                >
                  Briefcases & Laptop Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'handbags-totes')}
                  className="hover:text-white transition-colors"
                >
                  Women's Handbags & Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'travel-luggage')}
                  className="hover:text-white transition-colors"
                >
                  Travel & Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-[#D4DFC7] font-semibold hover:underline"
                >
                  View Complete Catalog →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Newsletter & Inquiries
            </h4>
            <p className="text-[11px] text-[#A2B69C] leading-relaxed">
              Subscribe for new leather batch releases, volume catalog updates, and manufacturing announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your business email..."
                  className="bg-[#1D2B1C] border border-[#2E422C] text-white text-xs px-3 py-2 rounded-l-xs flex-1 focus:outline-none focus:border-[#D4DFC7]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#141E14] px-3 py-2 rounded-r-xs text-xs font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {status === 'success' && (
                <p className="text-[10px] text-emerald-400">{message}</p>
              )}
              {status === 'error' && (
                <p className="text-[10px] text-red-400">{message}</p>
              )}
            </form>

            <div className="pt-2 space-y-1 text-xs">
              <button
                onClick={() => onNavigate('track-order')}
                className="block text-[#D4DFC7] hover:underline"
              >
                Track Your Shipment
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className="block text-[#D4DFC7] hover:underline"
              >
                Frequently Asked Questions
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="block text-[#D4DFC7] hover:underline"
              >
                Multan Facility Location
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Quick Policy Links */}
        <div className="pt-8 border-t border-[#263724] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A9175] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved. Multan, Pakistan.</p>
          <div className="flex flex-wrap gap-4 text-[#A2B69C]">
            <button onClick={() => onNavigate('legal', 'shipping')} className="hover:text-white">Shipping Policy</button>
            <button onClick={() => onNavigate('legal', 'returns')} className="hover:text-white">Return & Refund Policy</button>
            <button onClick={() => onNavigate('legal', 'terms')} className="hover:text-white">Terms of Service</button>
            <button onClick={() => onNavigate('legal', 'privacy')} className="hover:text-white">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
