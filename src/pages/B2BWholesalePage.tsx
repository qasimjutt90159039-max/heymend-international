import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Package,
  Globe,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Send,
  Building,
  Phone,
  Mail,
  HelpCircle,
  Truck,
  Award
} from 'lucide-react';
import { siteConfig, formatPKR } from '../config/siteConfig';

interface B2BWholesalePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const B2BWholesalePage: React.FC<B2BWholesalePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    product: 'Leather Wallets',
    quantity: 100,
    requirements: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const tiers = [
    {
      name: 'Pilot / Boutique Tier',
      moq: '20 - 49 Units',
      discount: '30% - 35% off retail',
      leadTime: '10 - 14 Days',
      bestFor: 'Emerging luxury brands, corporate gift orders, boutique retail testing'
    },
    {
      name: 'Wholesale Commercial Tier',
      moq: '50 - 249 Units',
      discount: '40% - 48% off retail',
      leadTime: '15 - 20 Days',
      bestFor: 'Specialty leather shops, departmental chains, private label collections',
      popular: true
    },
    {
      name: 'Export & Volume Contract',
      moq: '250+ Units',
      discount: '50%+ Custom FOB Pricing',
      leadTime: '21 - 30 Days',
      bestFor: 'International distributors, promotional companies, large institutions'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.product) {
      setError('Please fill in your name, company, email, phone, and product selection.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/b2b/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network connection error. Please contact us via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#19100B] font-sans pb-20">
      {/* Header Banner */}
      <section className="bg-[#19100B] text-white py-16 sm:py-24 relative overflow-hidden border-b border-[#382216]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-xs text-[#D8CCA8]">
              <Briefcase className="w-3.5 h-3.5 text-[#BFA054]" />
              <span className="font-semibold tracking-wider uppercase">B2B & Wholesale Partnerships</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Direct Manufacturer Wholesale & Private Label Supply.
            </h1>

            <p className="text-sm sm:text-base text-[#D0C3B0] leading-relaxed">
              Partner directly with <span className="text-[#D8BA73] font-semibold">{siteConfig.businessName}</span> for genuine leather goods production without middlemen markups. We supply leather retailers, luxury labels, corporate enterprises, and overseas importers with flexible MOQs, competitive pricing, and guaranteed leather quality.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#D8BA73]">
                <CheckCircle2 className="w-4 h-4" /> Export Quality Full-Grain Leather
              </span>
              <span className="flex items-center gap-1.5 text-[#D8BA73]">
                <CheckCircle2 className="w-4 h-4" /> Custom Logo Debossing Included
              </span>
              <span className="flex items-center gap-1.5 text-[#D8BA73]">
                <CheckCircle2 className="w-4 h-4" /> Multan Factory Direct
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
            Volume Advantages
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#19100B]">
            Transparent B2B Pricing Structure
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5C]">
            Whether you need a test run of 25 wallets or 5,000 branded belts, our production schedule accommodates your order size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-6 space-y-5 flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'bg-white border-2 border-[#8C522F] shadow-lg relative'
                  : 'bg-white border border-[#EAE3D9] shadow-xs'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8C522F] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  Most Requested
                </span>
              )}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#19100B]">{tier.name}</h3>
                <div className="p-3 bg-[#FAF3EA] rounded-md space-y-1">
                  <div className="text-xs text-[#7A6B5C]">Minimum Order:</div>
                  <div className="font-serif text-xl font-bold text-[#8C522F]">{tier.moq}</div>
                  <div className="text-xs font-semibold text-[#19100B]">{tier.discount}</div>
                </div>
                <div className="text-xs space-y-2 pt-2 text-[#4A3B30]">
                  <p><strong className="text-[#19100B]">Estimated Lead Time:</strong> {tier.leadTime}</p>
                  <p><strong className="text-[#19100B]">Suited for:</strong> {tier.bestFor}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, quantity: idx === 0 ? 25 : idx === 1 ? 100 : 500 }));
                  document.getElementById('b2b-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors ${
                  tier.popular
                    ? 'bg-[#19100B] text-white hover:bg-[#382216]'
                    : 'bg-[#FAF3EA] text-[#8C522F] border border-[#DCD3C5] hover:bg-[#EAE0D2]'
                }`}
              >
                Inquire For This Tier
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Main Form & Benefits */}
      <section id="b2b-form-section" className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#19100B] mb-2">
              Submit Wholesale or Private Label Inquiry
            </h3>
            <p className="text-xs text-[#7A6B5C] mb-6">
              Fill out your company requirements below. Our Multan commercial desk responds within 24 hours with product catalogs and wholesale rate sheets.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#FAF6EE] border border-[#BFA054] rounded-lg text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#8C522F] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#19100B]">Thank You for Your Inquiry!</h4>
                <p className="text-xs text-[#6A5B4C] max-w-md mx-auto">
                  Your wholesale inquiry has been submitted to Heymand International. A commercial representative will review your request and reach out to {formData.email} or {formData.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#19100B] text-white text-xs font-semibold rounded-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. SilkRoute Goods Ltd."
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0322XXXXXXX or international"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Target Product *
                    </label>
                    <select
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    >
                      <option value="Leather Wallets">Leather Wallets</option>
                      <option value="Leather Belts">Leather Belts</option>
                      <option value="Briefcases & Laptop Bags">Briefcases & Laptop Bags</option>
                      <option value="Handbags & Totes">Handbags & Totes</option>
                      <option value="Travel Bags & Duffles">Travel Bags & Duffles</option>
                      <option value="Cardholders & Small Goods">Cardholders & Small Goods</option>
                      <option value="Corporate Gift Sets">Corporate Gift Sets</option>
                      <option value="Custom OEM Design">Custom OEM Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Estimated Quantity *
                    </label>
                    <input
                      type="number"
                      min={20}
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Pakistan, UAE, UK, US..."
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Branding & Material Specifications
                  </label>
                  <input
                    type="text"
                    value={formData.requirements}
                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="e.g. Debossed company logo on inside, vegetable tanned leather in Cognac"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Additional Message or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any additional specifications, required delivery timeline, or sample requests..."
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Wholesale Inquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#BFA054]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Information / Contact Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF3EA] rounded-lg border border-[#EAE0D2] p-6 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#19100B]">Why Partner with Heymand International?</h4>
              <ul className="space-y-3 text-xs text-[#4A3B30]">
                <li className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#8C522F] shrink-0 mt-0.5" />
                  <span><strong>Direct Manufacturer:</strong> No commercial agents or trading firm commissions. You deal with the artisans and factory directly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8C522F] shrink-0 mt-0.5" />
                  <span><strong>Export Quality Guaranteed:</strong> Every batch is manufactured from selected hides with consistent dye lots and durable bonded stitching.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#8C522F] shrink-0 mt-0.5" />
                  <span><strong>Domestic & Overseas Dispatch:</strong> Nationwide insured delivery via TCS/Leopards in Pakistan, and DHL/FedEx/Air Freight for international shipments.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#19100B] text-white rounded-lg p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#D8CCA8]">Direct Factory Desk</h4>
              <p className="text-xs text-[#D0C3B0] leading-relaxed">
                Need urgent consultation or wanting to review physical samples at our Multan premises?
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <a
                  href={`tel:${siteConfig.contactNumber}`}
                  className="flex items-center gap-2 text-white hover:text-[#BFA054]"
                >
                  <Phone className="w-4 h-4 text-[#BFA054]" />
                  <span>Direct: {siteConfig.contactNumber}</span>
                </a>
                <p className="text-[11px] text-[#A3927B]">
                  Tareen Rd, near DCS Office, Mohalla Qadirabad, Multan, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
