import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Check,
  Eye,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR } from '../config/siteConfig';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  onQuickView
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: 'Espresso', hex: '#2B1A12', image: product.thumbnail }
  );

  const [added, setAdded] = useState(false);
  const favorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      onNavigate('product-detail', product.slug);
    }
  };

  const activeImage = selectedColor.image || product.thumbnail;
  const isSale = product.discountPrice && product.discountPrice < product.price;

  return (
    <div
      onClick={() => onNavigate('product-detail', product.slug)}
      className="group bg-white rounded-lg border border-[#DCE6D6] hover:border-[#4B6447] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-xl relative"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F2F6ED]">
        <img
          src={activeImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#182318] text-[#D4DFC7] shadow-xs">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-[#3D5239] text-[#E8F0E2] shadow-xs">
              Atelier Pick
            </span>
          )}
          {isSale && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#8C3A36] text-white">
              Privilege Offer
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-sm ${
              favorited
                ? 'bg-red-50 text-red-600'
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-stone-900'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuickViewClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#384C35] backdrop-blur-xs transition-colors shadow-sm"
            title="Quick View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Leather Type Tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-medium bg-[#182318]/85 backdrop-blur-xs text-[#FAFBF7]">
            {product.leatherType}
          </span>
          {(product.monogramEligible || product.isMonogrammable) && (
            <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold bg-[#D4DFC7] text-[#182318] flex items-center gap-1 shadow-xs border border-[#B6C7A1]">
              <Sparkles className="w-2.5 h-2.5 text-[#384C35]" /> Monogrammable
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Palette Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  className={`w-4 h-4 rounded-full border-2 transition-transform ${
                    selectedColor.name === c.name
                      ? 'border-[#384C35] scale-125 shadow-xs'
                      : 'border-white hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} Leather`}
                />
              ))}
              <span className="text-[10px] text-stone-500 font-sans ml-1">
                {selectedColor.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-[#182318] leading-snug line-clamp-2 group-hover:text-[#384C35] transition-colors mb-1">
            {product.title}
          </h3>

          {/* Specs & Hardware */}
          <p className="text-[11px] text-[#5C7058] mb-2.5">
            SKU: {product.sku} • {product.hardware}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-[#4B6447]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-stone-500 font-sans">
              ({product.reviewsCount || 8})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-2 border-t border-[#EAEFE4]">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-[#182318]">
                {formatPKR(product.discountPrice || product.price)}
              </span>
              {isSale && (
                <span className="ml-2 text-xs text-stone-400 line-through font-sans">
                  {formatPKR(product.price)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-[#2D4428] bg-[#E5EEDD] px-1.5 py-0.5 rounded border border-[#CCD8C4]">
              Multan Showroom
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 rounded-xs text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              added
                ? 'bg-[#2E4528] text-white'
                : 'bg-[#182318] hover:bg-[#253523] text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D4DFC7]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4DFC7]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
