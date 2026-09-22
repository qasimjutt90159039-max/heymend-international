import React, { useState, useMemo } from 'react';
import {
  Filter,
  X,
  SlidersHorizontal,
  Search,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Product, Category } from '../types';
import { initialProducts, initialCategories } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface ShopPageProps {
  products?: Product[];
  categories?: Category[];
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
  initialCategory?: string;
  onOpenMonogramModal?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products = initialProducts,
  categories = initialCategories,
  onNavigate,
  onQuickView,
  initialCategory,
  onOpenMonogramModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedLeatherType, setSelectedLeatherType] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [monogramOnly, setMonogramOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const leatherTypes = [
    'Full-Grain Cowhide',
    'Nappa Calfskin',
    'Vegetable Tanned Leather',
    'Suede & Nubuck',
    'Textured Saffiano',
    'Bridle Leather'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCat =
          p.category.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categorySlug === selectedCategory.toLowerCase();
        if (!matchesCat) return false;
      }

      // Leather type filter
      if (selectedLeatherType !== 'all') {
        if (!p.leatherType.toLowerCase().includes(selectedLeatherType.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice < minPrice || effectivePrice > maxPrice) {
        return false;
      }

      // In Stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Monogrammable filter
      if (monogramOnly && !p.isMonogrammable) {
        return false;
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.leatherType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'popularity') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    selectedCategory,
    selectedLeatherType,
    minPrice,
    maxPrice,
    inStockOnly,
    monogramOnly,
    searchQuery,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLeatherType('all');
    setMinPrice(0);
    setMaxPrice(35000);
    setInStockOnly(false);
    setMonogramOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedLeatherType !== 'all' ||
    minPrice > 0 ||
    maxPrice < 35000 ||
    inStockOnly ||
    monogramOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Header & Subtitle */}
      <div className="mb-6 pb-4 border-b border-[#DCE6D6]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#384C35] font-bold">
              Heymand International • Multan Leather Goods Manufacturer
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#182318] mt-0.5">
              Genuine Leather Goods Collection
            </h1>
            <p className="text-xs text-[#526B4D] mt-1">
              Showing {filteredProducts.length} handcrafted leather creations available for immediate dispatch or nationwide COD delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenMonogramModal && (
              <button
                onClick={onOpenMonogramModal}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F6ED] text-[#182318] border border-[#C5D4BD] rounded-xs text-xs font-semibold hover:bg-[#E2ECD9]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#384C35]" />
                <span>Monogram Atelier</span>
              </button>
            )}

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 rounded-xs bg-[#182318] text-[#D4DFC7] flex items-center gap-1.5 text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5 text-[#D4DFC7]" />
              <span>Filters ({filteredProducts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block bg-white rounded-lg border border-[#DCE6D6] p-5 space-y-6 sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFE4]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#384C35]" />
              <h3 className="font-serif text-sm font-bold text-[#182318]">Filter Leather Goods</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#384C35] hover:text-[#182318] font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-bold text-[#182318] mb-1.5 uppercase tracking-wider text-[10px]">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Wallet, belt, briefcase, cognac..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-[#F2F6ED] border border-[#C5D4BD] rounded-xs focus:outline-none focus:border-[#384C35] text-[#182318]"
              />
              <Search className="w-3.5 h-3.5 text-[#73886F] absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-xs font-bold text-[#182318] mb-2 uppercase tracking-wider text-[10px]">
              Product Category
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#182318] text-[#D4DFC7] font-semibold'
                    : 'text-[#2D4428] hover:bg-[#F2F6ED]'
                }`}
              >
                <span>All Collections</span>
                <span className="text-[10px] opacity-70">{products.length}</span>
              </button>

              {categories.map((c) => {
                const count = products.filter(p => p.category === c.name || p.categorySlug === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors flex items-center justify-between ${
                      selectedCategory.toLowerCase() === c.name.toLowerCase()
                        ? 'bg-[#182318] text-[#D4DFC7] font-semibold'
                        : 'text-[#2D4428] hover:bg-[#F2F6ED]'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leather Type Filter */}
          <div>
            <label className="block text-xs font-bold text-[#182318] mb-2 uppercase tracking-wider text-[10px]">
              Leather Tannage & Type
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedLeatherType('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors flex items-center justify-between ${
                  selectedLeatherType === 'all'
                    ? 'bg-[#384C35] text-white font-semibold'
                    : 'text-[#2D4428] hover:bg-[#F2F6ED]'
                }`}
              >
                <span>All Leather Types</span>
              </button>
              {leatherTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedLeatherType(type)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors flex items-center justify-between ${
                    selectedLeatherType === type
                      ? 'bg-[#384C35] text-white font-semibold'
                      : 'text-[#2D4428] hover:bg-[#F2F6ED]'
                  }`}
                >
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <label className="block text-xs font-bold text-[#182318] mb-2 uppercase tracking-wider text-[10px]">
              Maximum Price: <strong>{formatPKR(maxPrice)}</strong>
            </label>
            <input
              type="range"
              min="1000"
              max="35000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#384C35] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1">
              <span>Rs. 1,000</span>
              <span>Rs. 35,000</span>
            </div>
          </div>

          {/* Checkboxes: Monogrammable & In Stock */}
          <div className="pt-2 border-t border-[#EAEFE4] space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={monogramOnly}
                onChange={(e) => setMonogramOnly(e.target.checked)}
                className="w-4 h-4 rounded-xs text-[#384C35] border-stone-300 focus:ring-[#384C35]"
              />
              <span className="text-[#182318] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#384C35]" /> Monogrammable Only
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded-xs text-[#384C35] border-stone-300 focus:ring-[#384C35]"
              />
              <span className="text-[#182318] font-medium">In Multan Store Stock</span>
            </label>
          </div>

          {/* Multan Store Quick Badge */}
          <div className="p-3 bg-[#F2F6ED] rounded-sm border border-[#DCE6D6] text-[11px] text-[#4A5D45] space-y-1">
            <div className="font-semibold text-[#182318] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#384C35]" />
              <span>Tareen Rd Facility</span>
            </div>
            <p>Order online for express delivery or pick up directly from our Multan facility.</p>
          </div>
        </aside>

        {/* Products Grid & Sorting Header */}
        <main className="lg:col-span-3 space-y-4">
          {/* Sorting toolbar */}
          <div className="p-3 bg-white rounded-lg border border-[#DCE6D6] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#526B4D]">Sort Collection:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F2F6ED] border border-[#C5D4BD] rounded-xs px-2.5 py-1 text-xs font-semibold text-[#182318] focus:outline-none focus:border-[#384C35]"
              >
                <option value="featured">Featured Atelier Picks</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Inquired</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-[#526B4D]">Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F2F6ED] text-[#182318] text-[10px] font-bold flex items-center gap-1 border border-[#C5D4BD]">
                    {selectedCategory}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {monogramOnly && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F2F6ED] text-[#182318] text-[10px] font-bold flex items-center gap-1 border border-[#C5D4BD]">
                    Monogram Eligible
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setMonogramOnly(false)} />
                  </span>
                )}
                {selectedLeatherType !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F2F6ED] text-[#182318] text-[10px] font-bold flex items-center gap-1 border border-[#C5D4BD]">
                    {selectedLeatherType}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedLeatherType('all')} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#DCE6D6] space-y-3 shadow-xs">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#182318]">No leather goods match your filters</h3>
              <p className="text-xs text-[#526B4D] max-w-sm mx-auto">
                Try widening your price range or clearing keyword search to view our full Multan showroom inventory.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#182318] text-[#D4DFC7] rounded-xs text-xs font-semibold hover:bg-[#253723] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FAF8F5] p-5 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-serif text-base font-bold text-[#19100B]">Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-stone-500" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div>
                  <label className="block text-xs font-bold text-[#19100B] mb-2 uppercase">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded-xs"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Leather Types */}
                <div>
                  <label className="block text-xs font-bold text-[#19100B] mb-2 uppercase">
                    Leather Type
                  </label>
                  <select
                    value={selectedLeatherType}
                    onChange={(e) => setSelectedLeatherType(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded-xs"
                  >
                    <option value="all">All Leather Types</option>
                    {leatherTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Monogram & Stock */}
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={monogramOnly}
                      onChange={(e) => setMonogramOnly(e.target.checked)}
                      className="w-4 h-4 text-[#8C522F]"
                    />
                    <span>Monogrammable Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-[#8C522F]"
                    />
                    <span>In Multan Stock Only</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#19100B] text-white text-xs font-bold uppercase rounded-xs"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
