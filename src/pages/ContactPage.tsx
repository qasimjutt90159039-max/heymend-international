import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Building,
  Factory,
  ArrowRight
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenMonogramModal
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Leather Goods Manufacturing Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Multan Manufacturing Facility & Commercial Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#19100B]">
          Contact Heymand International
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C]">
          Direct factory consultations, bulk wholesale rate sheets, prototype requests, and customer support. Visit our facility or reach out online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Facility Coordinates & Timings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-6 shadow-xs">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#19100B]">
                Factory & Commercial Desk Coordinates
              </h3>
              <p className="text-xs text-[#7A6B5C] mt-0.5">
                Tareen Road, Mohalla Qadirabad, Multan
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#5C4D3E]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Facility Address:</strong>
                  <p className="mt-0.5 leading-relaxed">{siteConfig.address.fullAddress}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Location: Near DCS Office, Multan 60000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Direct Contact Line:</strong>
                  <a
                    href={`tel:${siteConfig.contactNumber}`}
                    className="hover:text-[#8C522F] font-bold text-sm text-[#19100B]"
                  >
                    {siteConfig.contactNumber}
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Direct phone & WhatsApp inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Operating Hours:</strong>
                  <p className="mt-0.5">{siteConfig.operatingHours.display}</p>
                  <p className="text-stone-600">Production Facility & Commercial Dispatch</p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
              >
                <MapPin className="w-4 h-4 text-[#D8BA73]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={getWhatsAppUrl("Hello Heymand International Multan, I would like to inquire regarding leather products and manufacturing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#136630] text-xs font-bold rounded-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Heymand Desk</span>
              </a>
            </div>
          </div>

          {/* Manufacturing Services */}
          <div className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E8E1D5] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#19100B] flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-[#8C522F]" /> Direct Manufacturer Services
            </h4>
            <ul className="text-xs text-[#6A5B4C] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>OEM / ODM Private Label Production (Low MOQs from 20-50 pcs)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Custom Hot-Foil & Blind Logo Debossing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>B2B Volume Rate Sheets & Export Consignments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Nationwide COD Delivery Across Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Message / Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#EAE3D9] p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
              Direct Inquiry
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#19100B] mt-0.5">
              Send a Message to Heymand International
            </h2>
            <p className="text-xs text-[#7A6B5C] mt-1">
              Have a question regarding custom orders, wholesale pricing, or product availability? Our Multan team responds promptly.
            </p>
          </div>

          {sent ? (
            <div className="p-8 text-center bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#19100B]">Message Received</h3>
              <p className="text-xs text-[#6A5B4C] max-w-sm mx-auto">
                Thank you for contacting Heymand International. Our Multan commercial desk will reach out to you shortly at {phone}.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-5 py-2 bg-[#19100B] text-white text-xs font-semibold rounded-xs"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Siddiqui"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0322XXXXXXX"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  >
                    <option value="Leather Goods Manufacturing Inquiry">Leather Goods Manufacturing Inquiry</option>
                    <option value="B2B Wholesale / Export Order">B2B Wholesale / Export Order</option>
                    <option value="Custom OEM / Private Labeling">Custom OEM / Private Labeling</option>
                    <option value="Retail Order & Delivery Support">Retail Order & Delivery Support</option>
                    <option value="Multan Facility Visit Request">Multan Facility Visit Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19100B] mb-1">
                  Message / Requirements *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your inquiry, requested quantities, or specifications..."
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message to Heymand International</span>
                    <Send className="w-3.5 h-3.5 text-[#BFA054]" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
