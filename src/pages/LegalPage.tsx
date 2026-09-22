import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'shipping' | 'returns';
  onNavigate: (page: string, param?: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'shipping', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'shipping' | 'returns'>(initialTab);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans pb-24">
      {/* Title */}
      <div className="pb-6 mb-8 border-b border-[#E8E1D5]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Policies & Commercial Terms
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#19100B] mt-1">
          {siteConfig.businessName} Policies
        </h1>
        <p className="text-xs text-[#7A6B5C] mt-1">
          Clear, honest policies for our domestic e-commerce shoppers and global B2B manufacturing clients.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2 mb-8">
        {[
          { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
          { id: 'returns', label: 'Returns & Exchange', icon: RotateCcw },
          { id: 'terms', label: 'Terms of Service', icon: FileText },
          { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#8C522F] text-[#8C522F] bg-[#FAF3EA]'
                  : 'border-transparent text-[#6A5B4C] hover:text-[#19100B]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 sm:p-10 shadow-xs prose prose-stone max-w-none text-xs sm:text-sm text-[#4A3B30] leading-relaxed space-y-6">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#19100B]">Shipping & Delivery Policy</h2>
            <p>
              Heymand International delivers domestic online orders nationwide across Pakistan, as well as export cargo globally via authorized air and sea logistics channels.
            </p>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Domestic Retail Orders (Pakistan)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Courier Partners:</strong> TCS, Leopards Courier, Trax, and Call Courier.</li>
              <li><strong>Delivery Timeline:</strong> Multan local deliveries: 1-2 business days. Major cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad): 2-4 business days. Regional destinations: 4-6 business days.</li>
              <li><strong>Free Shipping:</strong> Complimentary standard delivery on all domestic orders totaling Rs. 5,000 or above. Standard delivery fee of Rs. 250 applies to orders below Rs. 5,000.</li>
              <li><strong>Cash on Delivery (COD):</strong> Available throughout all serviceable postcodes in Pakistan. Please verify recipient availability before dispatch.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#19100B]">Wholesale & Export Shipments</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Commercial orders can be dispatched FOB Karachi Port, FOB Multan International Airport, or door-to-door via DHL Express / FedEx Priority.</li>
              <li>Official commercial invoices, certificate of origin, and bill of lading documents are furnished for all cross-border consignments.</li>
            </ul>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#19100B]">Returns & Exchange Guarantee</h2>
            <p>
              We stand behind the craftsmanship of every genuine leather piece produced at our Multan facility.
            </p>
            <h3 className="font-serif text-base font-bold text-[#19100B]">7-Day Return Window (Retail Orders)</h3>
            <p>
              If your retail purchase arrives with a manufacturing defect, damaged hardware, or does not match the product description, you may request an exchange or full refund within 7 days of delivery.
            </p>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Conditions for Return:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>The item must remain unused, unscratched, and in its original presentation packaging with tags intact.</li>
              <li>Custom monogrammed or personalized items with customer initials cannot be returned unless an assembly defect is evident.</li>
              <li>Wholesale contract batches are governed by pre-production sample sign-offs and master purchase agreements.</li>
            </ul>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#19100B]">Terms of Service</h2>
            <p>
              Welcome to the official online platform of <strong>Heymand International</strong>. By using this website, placing retail orders, or requesting commercial manufacturing quotations, you agree to comply with our operating terms.
            </p>
            <h3 className="font-serif text-base font-bold text-[#19100B]">1. Leather Characteristics & Variations</h3>
            <p>
              Genuine full-grain and vegetable-tanned leather is a natural material. Natural grain marks, subtle neck wrinkles, and slight tonal variations are organic proof of authenticity and not manufacturing defects.
            </p>
            <h3 className="font-serif text-base font-bold text-[#19100B]">2. Intellectual Property & Custom Tooling</h3>
            <p>
              Client logos, private label embossing dies, and proprietary design blueprints submitted for custom OEM production remain the exclusive intellectual property of the commissioning client.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#19100B]">Privacy & Data Security Policy</h2>
            <p>
              At Heymand International, we respect your privacy. We collect only the information necessary to fulfill your online orders, process quotation requests, and manage communication regarding your leather goods.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We never sell or trade your personal details or corporate procurement data to third-party advertisers.</li>
              <li>Contact details (phone and address) are shared exclusively with certified courier partners (TCS/Leopards) solely for dispatch purposes.</li>
              <li>Account passwords are encrypted using secure cryptographic hashing algorithms.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
