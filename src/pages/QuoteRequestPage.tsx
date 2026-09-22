import React, { useState } from 'react';
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  ShieldCheck,
  Building,
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface QuoteRequestPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const QuoteRequestPage: React.FC<QuoteRequestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    productType: 'Leather Wallets',
    quantity: 50,
    materialPreference: 'Full-Grain Cowhide Leather',
    color: 'Espresso Brown & Tan Dual',
    brandingRequirements: 'Custom Debossed Logo (Blind or Gold Stamp)',
    requirements: '',
    message: '',
    referenceFileUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.productType || !formData.quantity) {
      setError('Please fill in your name, email, phone number, product type, and quantity.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setQuoteId(data.data?.id || `REQ-${Date.now().toString().slice(-6)}`);
      } else {
        setError(data.message || 'Quotation submission failed. Please try again.');
      }
    } catch {
      setError('Connection failure. Please contact us directly via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#19100B] font-sans pb-20">
      {/* Header Banner */}
      <section className="bg-[#19100B] text-white py-14 sm:py-20 relative overflow-hidden border-b border-[#382216]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-xs text-[#D8CCA8]">
              <FileText className="w-3.5 h-3.5 text-[#BFA054]" />
              <span className="font-semibold tracking-wider uppercase">Direct Factory Quotation Desk</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Request a Custom Leather Product Quotation.
            </h1>

            <p className="text-sm sm:text-base text-[#D0C3B0] leading-relaxed">
              Submit your bespoke product specifications, target volume, and branding requirements. The manufacturing estimating team at <span className="text-[#D8BA73] font-semibold">{siteConfig.businessName}</span> in Multan will calculate a comprehensive quotation including prototype, production, and shipping timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {submitted ? (
          <div className="bg-white rounded-lg border border-[#BFA054] p-8 sm:p-12 text-center space-y-5 shadow-md">
            <div className="w-16 h-16 rounded-full bg-[#FAF3EA] text-[#8C522F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
              Quotation Request Received!
            </h2>

            <div className="p-4 bg-[#FAF8F5] rounded-md max-w-md mx-auto text-xs space-y-1 border border-[#EAE3D9]">
              <p className="text-[#7A6B5C]">Your Reference Request ID:</p>
              <p className="font-mono text-base font-bold text-[#8C522F]">{quoteId}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#6A5B4C] max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our production manager in Multan is reviewing your request for <strong>{formData.quantity} units of {formData.productType}</strong>. We will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> with estimated unit pricing and material samples.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#FAF3EA] text-[#8C522F] border border-[#DCD3C5] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#EAE0D2]"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 bg-[#19100B] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#382216]"
              >
                Browse Standard Products
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 sm:p-10 shadow-xs space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#19100B]">Product & Manufacturing Specifications</h2>
              <p className="text-xs text-[#7A6B5C] mt-1">
                Please provide detailed parameters for your desired production run. Fields marked with an asterisk (*) are required.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-[#8C522F] uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center gap-2">
                  <span>1. Contact & Business Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asad Siddiqui"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Executive Lifestyle Group"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
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
                      placeholder="0322XXXXXXX or +92..."
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Destination Country / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Multan, Pakistan or UAE"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Product Specifications */}
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-sm font-bold text-[#8C522F] uppercase tracking-wider border-b border-stone-200 pb-2">
                  2. Product Requirements & Quantities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Product Category *
                    </label>
                    <select
                      value={formData.productType}
                      onChange={e => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    >
                      <option value="Leather Wallets">Leather Wallets (Bifold / Trifold / Cardholders)</option>
                      <option value="Leather Belts">Leather Belts (Dress / Casual / Reversible)</option>
                      <option value="Briefcases & Laptop Bags">Briefcases & Executive Laptop Bags</option>
                      <option value="Handbags & Totes">Handbags & Structured Totes</option>
                      <option value="Travel Bags">Travel Bags, Duffles & Luggage</option>
                      <option value="Corporate Leather Products">Corporate Leather Products (Folios, Desk sets)</option>
                      <option value="Leather Jackets">Leather Jackets</option>
                      <option value="Custom OEM / ODM Development">Custom OEM / ODM Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Estimated Production Quantity * (Units)
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                    <span className="text-[10px] text-[#7A6B5C] mt-0.5 block">Standard production MOQ is 20-50 units.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Leather Type & Grade Preference
                    </label>
                    <select
                      value={formData.materialPreference}
                      onChange={e => setFormData({ ...formData, materialPreference: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    >
                      <option value="Full-Grain Cowhide Leather">Full-Grain Cowhide (Highest durability & natural patina)</option>
                      <option value="Top-Grain Semi-Aniline Cowhide">Top-Grain Semi-Aniline (Clean uniform luxury finish)</option>
                      <option value="Vegetable Tanned Artisan Leather">Vegetable Tanned Artisan Leather (Firm, burnishable)</option>
                      <option value="Oil Pull-Up Cowhide">Oil Pull-Up Cowhide (Vintage pull-up effect)</option>
                      <option value="Nappa Calfskin">Nappa Calfskin (Ultra-soft handfeel)</option>
                      <option value="Suede & Nubuck">Suede & Nubuck</option>
                      <option value="Factory Recommended Leather">Let Factory Recommend Best Leather</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Desired Colorway(s)
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={e => setFormData({ ...formData, color: e.target.value })}
                      placeholder="e.g. Classic Black, Cognac Brown, Navy Blue..."
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Branding, Logo & Hardware Specifications
                  </label>
                  <input
                    type="text"
                    value={formData.brandingRequirements}
                    onChange={e => setFormData({ ...formData, brandingRequirements: e.target.value })}
                    placeholder="e.g. Debossed company logo on front flap, antiqued brass hardware, RFID lining"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Detailed Notes, Dimensions & Packaging Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Provide specific dimensions, pocket configurations, zipper types, custom gift box requirements, or target delivery deadline..."
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Reference File / Design URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referenceFileUrl}
                    onChange={e => setFormData({ ...formData, referenceFileUrl: e.target.value })}
                    placeholder="Link to Google Drive, Dropbox, or tech-pack image URL"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Quotation Request...</span>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <Send className="w-4 h-4 text-[#BFA054]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
