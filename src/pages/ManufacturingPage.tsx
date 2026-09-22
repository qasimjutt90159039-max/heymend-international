import React from 'react';
import {
  Layers,
  Scissors,
  CheckCircle2,
  ShieldCheck,
  Award,
  Cpu,
  Factory,
  ArrowRight,
  Package,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ManufacturingPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Leather Selection & Grading',
      desc: 'We source only export-grade full-grain cowhide, vegetable-tanned hides, buffalo leather, and supple calfskins. Every hide undergoes rigorous grading for grain density, tensile strength, and minimal surface blemishes.',
      icon: Layers,
      highlight: 'Full-Grain & Veg-Tan Leathers'
    },
    {
      num: '02',
      title: 'Precision Pattern & Die Cutting',
      desc: 'Expert pattern masters digitize designs and create hardened steel cutting dies. Components are precision-clicked with hydraulic presses alongside meticulous hand-clicking for fine luxury details.',
      icon: Scissors,
      highlight: 'Micron-Level Tolerance'
    },
    {
      num: '03',
      title: 'Skiving, Edge Splitting & Beveling',
      desc: 'Automated skiving machines taper edges so folded seams remain sleek without adding unnecessary bulk. Edges are beveled, burnished with natural waxes, or hand-painted with multiple layers of Italian edge dye.',
      icon: Compass,
      highlight: 'Multi-Coat Italian Edge Paint'
    },
    {
      num: '04',
      title: 'Heavy-Duty & Hand Assembly',
      desc: 'Craftsmen utilize German high-tensile Serafil threads on synchronized walking-foot and cylinder-arm industrial sewing machines, combined with saddle-stitch finishing on stress points.',
      icon: Factory,
      highlight: 'Reinforced Stress Anchors'
    },
    {
      num: '05',
      title: 'Hardware & Custom Branding',
      desc: 'Solid brass, antiqued nickel, and matte black alloy hardware are riveted and anchored with tear-resistant interlinings. Custom metal plates, debossed logos, and gold foil stamping are applied.',
      icon: Sparkles,
      highlight: 'High-Tonnage Hot Stamping'
    },
    {
      num: '06',
      title: 'Quality Assurance & Export Packing',
      desc: 'Every item passes a 12-point inspection check for seam alignment, zipper glide, hardware seating, and leather condition before being packed in protective cotton dustbags and export cartons.',
      icon: ShieldCheck,
      highlight: '12-Point Inspection Protocol'
    }
  ];

  const capabilities = [
    {
      title: 'OEM & ODM Leather Production',
      description: 'Send us your technical specification sheets, 3D renderings, or physical samples, and our pattern makers will engineer production prototypes within 7-10 business days.',
      features: ['Full custom pattern engineering', 'Material sourcing & custom dyeing', 'Physical pre-production samples']
    },
    {
      title: 'Private Label & Custom Branding',
      description: 'Complete branding solutions including deep debossing, gold/silver foil stamping, branded woven or satin linings, custom metal logo plates, and bespoke presentation boxes.',
      features: ['Custom brass & steel embossing dies', 'Bespoke zipper pulls & rivets', 'Luxury packaging & barcode labeling']
    },
    {
      title: 'Flexible Minimum Order Quantities (MOQs)',
      description: 'We support emerging luxury labels, established retailers, and corporate clients with tiered MOQs starting from 20 to 50 units per design, scaling up to 10,000+ units monthly.',
      features: ['Low pilot-run MOQs (20-50 units)', 'Scaled volume pricing discounts', 'FOB Karachi or Multan dispatch']
    },
    {
      title: 'Corporate & Institutional Gifting',
      description: 'Custom-designed executive leather gifts for multinational enterprises, banks, chambers of commerce, and government delegations with personalized names and corporate logos.',
      features: ['Personalized executive gift sets', 'Bulk custom presentation boxes', 'Fast turnaround timelines']
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#19100B] font-sans pb-20">
      {/* Hero Banner */}
      <section className="bg-[#19100B] text-white py-16 sm:py-24 relative overflow-hidden border-b border-[#382216]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D8BA73_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-xs text-[#D8CCA8]">
              <Factory className="w-3.5 h-3.5 text-[#BFA054]" />
              <span className="font-semibold tracking-wider uppercase">Multan Production Facility</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Industrial Precision Meets Heritage Leather Craftsmanship.
            </h1>

            <p className="text-sm sm:text-base text-[#D0C3B0] leading-relaxed">
              Based at Tareen Road in Multan, Pakistan, <span className="text-[#D8BA73] font-semibold">{siteConfig.businessName}</span> operates a dedicated leather goods manufacturing facility. We engineer export-grade leather wallets, belts, briefcases, handbags, and travel luggage for luxury brands, wholesale distributors, and corporate partners worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('quote-request')}
                className="px-6 py-3 bg-[#BFA054] text-[#19100B] font-semibold text-xs uppercase tracking-wider rounded-xs hover:bg-[#D8BA73] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Request Manufacturing Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('b2b')}
                className="px-6 py-3 bg-[#25160E] text-[#D8CCA8] border border-[#BFA054]/40 font-semibold text-xs uppercase tracking-wider rounded-xs hover:bg-[#382216] transition-all flex items-center gap-2"
              >
                <span>B2B & Wholesale Program</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Highlights Bar */}
      <section className="bg-[#FAF3EA] border-b border-[#EAE0D2] py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C522F]">100%</span>
            <p className="text-xs font-semibold text-[#19100B] uppercase tracking-wider">Export Grade Leather</p>
            <p className="text-[11px] text-[#7A6B5C]">Full-Grain, Veg-Tan & Top-Grain</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C522F]">20 - 50 Pcs</span>
            <p className="text-xs font-semibold text-[#19100B] uppercase tracking-wider">Low Initial MOQs</p>
            <p className="text-[11px] text-[#7A6B5C]">Accessible for growing brands</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C522F]">7 - 10 Days</span>
            <p className="text-xs font-semibold text-[#19100B] uppercase tracking-wider">Rapid Sample Making</p>
            <p className="text-[11px] text-[#7A6B5C]">Technical pattern development</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C522F]">Tareen Rd, Multan</span>
            <p className="text-xs font-semibold text-[#19100B] uppercase tracking-wider">Physical Facility</p>
            <p className="text-[11px] text-[#7A6B5C]">Near DCS Office, Mohalla Qadirabad</p>
          </div>
        </div>
      </section>

      {/* Manufacturing Workflow */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
            End-to-End Production Process
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#19100B]">
            From Raw Hide to Finished Luxury Piece
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5C] leading-relaxed">
            Our Multan workshop balances modern leather machinery with skilled bench craftsmanship, ensuring structural integrity and refined aesthetics in every piece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-4 hover:border-[#8C522F] hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#D4C3A3] group-hover:text-[#8C522F] transition-colors">
                    {step.num}
                  </span>
                  <div className="p-2.5 rounded-full bg-[#FAF3EA] text-[#8C522F]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#19100B]">{step.title}</h3>
                <p className="text-xs text-[#6A5B4C] leading-relaxed">{step.desc}</p>

                <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#8C522F] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA054]" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities & OEM / ODM Services */}
      <section className="bg-[#FAF3EA] py-16 border-y border-[#EAE0D2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
              Contract Manufacturing
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#19100B]">
              Manufacturing Capabilities & Services
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B5C]">
              We work with fashion brands, e-commerce retailers, and corporate buyers seeking dependable quality and honest manufacturing partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-4 shadow-xs hover:border-[#8C522F] transition-all"
              >
                <h3 className="font-serif text-xl font-bold text-[#19100B]">{cap.title}</h3>
                <p className="text-xs text-[#6A5B4C] leading-relaxed">{cap.description}</p>
                <ul className="space-y-2 pt-2 border-t border-stone-100">
                  {cap.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-[#19100B]">
                      <CheckCircle2 className="w-4 h-4 text-[#8C522F] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Visit & Multan Address Callout */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-[#19100B] text-white rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-[11px] text-[#D8CCA8]">
              <MapPin className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>Multan Facility Visits Welcomed</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Schedule a Factory Meeting or Sample Review
            </h3>
            <p className="text-xs sm:text-sm text-[#D0C3B0] leading-relaxed">
              Are you planning a bulk production run or looking to audit our facility? You are welcome to visit our premises at Tareen Road, near DCS Office, Mohalla Qadirabad, Multan. Contact our administration to reserve an appointment.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <a
                href={`tel:${siteConfig.contactNumber}`}
                className="px-5 py-2.5 bg-[#BFA054] text-[#19100B] font-bold rounded-xs flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {siteConfig.contactNumber}</span>
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 bg-[#25160E] border border-[#BFA054]/40 text-[#D8CCA8] font-bold rounded-xs flex items-center gap-2 hover:bg-[#382216]"
              >
                <span>Get Driving Directions</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
