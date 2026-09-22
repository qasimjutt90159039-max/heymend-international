import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  MapPin,
  Menu,
  X,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Briefcase,
  Factory
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage?: string;
  activePage?: string;
  onOpenCart: () => void;
  onOpenMonogramModal?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage: propCurrentPage,
  activePage,
  onOpenCart,
  onOpenMonogramModal
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { totalQuantity, subtotal } = useCart();
  const { user, isAdmin } = useAuth();
  const { wishlistIds } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}`);
        const json = await res.json();
        if (json.success) {
          setSearchResults(json.data || []);
          setShowResults(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'our-story', label: 'About' },
    { id: 'shop', label: 'Products & Collections' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'b2b', label: 'B2B / Wholesale' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFBF7] border-b border-[#D8E3CE] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#182318] text-[#E8EFE0] text-[11px] sm:text-xs py-1.5 px-4 font-sans border-b border-[#2A3B28]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4DFC7] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {siteConfig.businessName} • Leather Goods Manufacturer & Exporter
            </span>
            <span className="hidden md:inline text-[#7A9374]">|</span>
            <span className="hidden md:inline text-[#D4DFC7]">
              Tareen Rd, near DCS Office, Multan, Pakistan
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <a
              href={`tel:${siteConfig.contactNumber}`}
              className="flex items-center gap-1 text-[#E8EFE0] hover:text-[#D4DFC7] transition-colors font-semibold"
            >
              <Phone className="w-3 h-3 text-[#D4DFC7]" />
              <span>{siteConfig.contactNumber}</span>
            </a>
            <button
              onClick={() => onNavigate('track-order')}
              className="hidden sm:inline hover:text-[#D4DFC7] transition-colors"
            >
              Track Order
            </button>
            <button
              onClick={() => onNavigate('quote-request')}
              className="hidden lg:inline bg-[#D4DFC7] text-[#182318] px-2 py-0.5 rounded-xs font-bold hover:bg-[#C5D5B6] transition-colors"
            >
              Fast Quote Request
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Crest & Title */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          {/* Emblem */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-[#182318] text-[#D4DFC7] flex flex-col items-center justify-center border border-[#D4DFC7]/60 group-hover:border-[#D4DFC7] transition-all shadow-xs">
            <span className="font-serif text-lg font-bold tracking-tighter leading-none">H</span>
            <span className="text-[7px] tracking-widest text-[#D4DFC7] font-sans -mt-0.5">INTL</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#182318] leading-none group-hover:text-[#384C35] transition-colors">
              HEYMAND
            </span>
            <span className="block text-[8px] sm:text-[9px] font-sans font-semibold uppercase tracking-[0.25em] text-[#4A6345] mt-1">
              Leather Goods Manufacturer • Multan
            </span>
          </div>
        </div>

        {/* Global Product Search */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-md mx-2 lg:mx-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
              placeholder="Search handcrafted leather wallets, belts, briefcases, bags..."
              className="w-full bg-[#F2F6ED] text-[#182318] placeholder-[#73886F] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#C5D4BD] focus:outline-none focus:border-[#4B6447] focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#73886F] absolute left-3.5 top-3" />
            {isSearching && (
              <span className="w-4 h-4 border-2 border-[#4B6447] border-t-transparent rounded-full animate-spin absolute right-3.5 top-3"></span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#C5D4BD] py-2 z-50 overflow-hidden">
              <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider text-[#5C7058] font-bold border-b border-stone-100 flex justify-between bg-[#F7FAF4]">
                <span>Handcrafted Leather Goods</span>
                <span>{searchResults.length} matches</span>
              </div>
              {searchResults.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('product-detail', item.slug);
                    setShowResults(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F6ED] cursor-pointer transition-colors border-b border-stone-50 last:border-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded-xs border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#182318] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#5C7058]">
                      {item.category} • <span className="text-[#384C35] font-bold">{formatPKR(item.discountPrice || item.price)}</span>
                    </p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  onNavigate('shop');
                  setShowResults(false);
                }}
                className="px-4 py-2 text-center text-xs text-[#1E2B1A] font-bold bg-[#E8EFE1] hover:bg-[#D4DFC7] cursor-pointer transition-colors"
              >
                View all manufacturing collections →
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Request a Quote Button with signature #D4DFC7 */}
          <button
            onClick={() => onNavigate('quote-request')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#182318] border border-[#B6C7A1] transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#182318]" />
            <span>Request a Quote</span>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => onNavigate('wishlist')}
            className="relative p-2 rounded-full text-[#364933] hover:text-[#182318] hover:bg-[#F2F6ED] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4B6447] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Account / Admin */}
          <button
            onClick={() => onNavigate(isAdmin ? 'admin' : 'account')}
            className="p-2 rounded-full text-[#364933] hover:text-[#182318] hover:bg-[#F2F6ED] transition-colors flex items-center gap-1"
            title={user ? user.name : 'Sign In'}
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="hidden xl:inline text-xs font-medium text-[#182318] max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#182318] hover:bg-[#253523] text-white text-xs font-medium transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4DFC7]" />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[10px] text-[#D4DFC7] font-semibold">{totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'}</span>
              <span className="font-bold text-white tracking-wide">{formatPKR(subtotal)}</span>
            </div>
            {totalQuantity > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#D4DFC7] text-[#182318] text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#182318] hover:bg-[#F2F6ED] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav className="hidden lg:block bg-[#F2F6ED] border-t border-[#D9E4CE]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6 py-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap transition-colors tracking-wider uppercase font-semibold text-[11px] pb-0.5 ${
                  currentPage === link.id
                    ? 'text-[#1E2B1A] border-b-2 border-[#384C35] font-bold'
                    : 'text-[#4A5D45] hover:text-[#182318]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[#4A5D45]">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-1.5 hover:text-[#182318] font-semibold text-[#2D3E29] transition-colors text-[11px]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#384C35]" />
              <span>Tareen Rd, Multan</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAFBF7] border-t border-[#D9E4CE] px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leather wallets, belts, bags..."
              className="w-full bg-[#F2F6ED] text-[#182318] text-xs pl-10 pr-4 py-2 rounded-lg border border-[#C5D4BD]"
            />
            <Search className="w-4 h-4 text-[#73886F] absolute left-3 top-2.5" />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
                className={`text-left px-3 py-2.5 rounded-xs font-semibold uppercase tracking-wider text-[11px] ${
                  currentPage === link.id
                    ? 'bg-[#182318] text-[#D4DFC7]'
                    : 'bg-[#F2F6ED] text-[#182318] hover:bg-[#E2ECD9]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Request a Quote CTA */}
          <button
            onClick={() => { onNavigate('quote-request'); setMobileMenuOpen(false); }}
            className="w-full py-2.5 bg-[#D4DFC7] hover:bg-[#C2D2B0] text-[#182318] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 border border-[#B6C7A1]"
          >
            <FileText className="w-4 h-4" />
            <span>Request a Quote</span>
          </button>

          {/* Multan Facility Contact Box */}
          <div className="p-3 bg-[#F2F6ED] rounded-lg border border-[#D9E4CE] space-y-2 text-xs">
            <p className="font-semibold text-[#182318] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#384C35]" />
              {siteConfig.businessName} Facility
            </p>
            <p className="text-[11px] text-[#4A5D45] leading-snug">
              Tareen Rd, near DCS Office, Mohalla Qadirabad, Multan, 60000, Pakistan
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${siteConfig.contactNumber}`}
                className="flex-1 py-1.5 bg-[#182318] text-[#D4DFC7] rounded text-center font-semibold text-[11px]"
              >
                Call: {siteConfig.contactNumber}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 bg-[#25D366] text-white rounded text-center font-semibold text-[11px]"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
