import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, Award, ShieldCheck, MapPin, Factory } from 'lucide-react';
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface FaqPageProps {
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenMonogramModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: `Is all ${siteConfig.businessName} leather 100% genuine?`,
      a: 'Yes, without exception. We manufacture our goods exclusively from top-grade full-grain cowhide, vegetable-tanned bovine leathers, buffalo hide, and supple calfskins. We never use artificial faux leather, PU, or bonded leather scraps. Each hide is selected for optimal grain structure and durability.'
    },
    {
      q: 'Where is your manufacturing facility located in Multan?',
      a: `Our physical production facility is located at ${siteConfig.address.fullAddress}. Clients, wholesale buyers, and corporate delegations are welcome to visit our premises to inspect raw hides, review stitching lines, or discuss custom production orders. Our contact number is ${siteConfig.contactNumber}.`
    },
    {
      q: 'Do you offer B2B wholesale and private label (OEM/ODM) production?',
      a: 'Yes. We are a direct manufacturer equipped with precision pattern cutting, industrial walking-foot stitching machines, and hot-stamping embossing presses. We provide private label manufacturing with custom brass dies of your brand logo, custom interior linings, and bespoke packaging.'
    },
    {
      q: 'What are your Minimum Order Quantities (MOQs)?',
      a: 'To accommodate growing brands and corporate gifting clients, our initial pilot MOQ starts from 20 to 50 units per design. For established retail and export distributors, we accommodate production runs up to thousands of units with tiered volume discounts.'
    },
    {
      q: 'How can I request a formal manufacturing quotation?',
      a: 'You can submit your technical specifications, required quantities, material preferences, and target deadlines through our online "Request a Quote" desk or by calling our Multan commercial desk at 03226685582. Quotations with unit pricing are usually provided within 24 to 48 hours.'
    },
    {
      q: 'Do you provide Cash on Delivery (COD) across Pakistan?',
      a: 'Yes. For our retail e-commerce catalog, we deliver nationwide via reliable couriers (TCS / Leopards) with Cash on Delivery across all cities in Pakistan, including Multan, Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and Peshawar. Standard orders over Rs. 5,000 enjoy free delivery.'
    },
    {
      q: 'Can I customize products with custom initials or company logos?',
      a: 'Absolutely. We offer hot-foil stamping (in antique gold or silver foil) as well as subtle blind debossing. For bulk corporate clients, we manufacture dedicated brass embossing dies bearing your exact company crest or emblem.'
    },
    {
      q: 'How do you handle international export shipments?',
      a: 'For international clients, we coordinate air cargo (DHL, FedEx) or sea container freight (FOB Karachi Port) along with complete commercial export documentation, invoices, and certificates of origin.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Multan Manufacturing Knowledge Base
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#19100B]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#7A6B5C]">
          Learn about our leather sourcing, manufacturing process, custom orders, B2B wholesale rates, and nationwide delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-[#EAE3D9] rounded-xl bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif text-sm sm:text-base font-bold text-[#19100B]">
                  {faq.q}
                </span>
                <span className="text-[#8C522F] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4D3E] leading-relaxed border-t border-stone-100 bg-[#FAF8F5]/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Multan Facility Direct Contact Callout */}
      <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#19100B]">
            Have a custom requirement or question?
          </h3>
          <p className="text-xs text-[#6A5B4C] mt-0.5">
            Speak directly with our Multan facility team or submit a bespoke product quotation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('quote-request')}
            className="px-4 py-2.5 bg-[#8C522F] hover:bg-[#6B3B1E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Request a Quote
          </button>
          <a
            href={getWhatsAppUrl("Hello Heymand International Multan, I have a question regarding your leather products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xs flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
