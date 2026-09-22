import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Package } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { initialProducts } from '../data/seedData';
import { formatPKR } from '../config/siteConfig';

interface WishlistPageProps {
  products?: Product[];
  onNavigate: (page: string, param?: string) => void;
  onQuickView?: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products = initialProducts,
  onNavigate,
  onQuickView
}) => {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans pb-24">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E8E1D5] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
            Curated Leather Goods
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#19100B] mt-1">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs text-[#7A6B5C] mt-1">
            Saved handcrafted leather pieces from Heymand International.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-[#8C522F] hover:text-[#19100B] font-semibold self-start sm:self-center"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-12 text-center space-y-4 max-w-md mx-auto my-8">
          <div className="w-14 h-14 rounded-full bg-[#FAF3EA] text-[#8C522F] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#19100B]">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#7A6B5C]">
            Explore our collection of handcrafted leather wallets, belts, briefcases, and travel bags to save your favorite pieces.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2.5 bg-[#19100B] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#382216] transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#BFA054]" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => {
            const price = product.discountPrice || product.price;
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#EAE3D9] overflow-hidden group hover:border-[#8C522F] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F3EFEA]">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 hover:bg-white text-stone-600 hover:text-red-600 rounded-full flex items-center justify-center shadow-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-[#8C522F] font-bold">
                      {product.category}
                    </p>
                    <h4
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="font-serif text-sm font-bold text-[#19100B] hover:text-[#8C522F] cursor-pointer line-clamp-1"
                    >
                      {product.title}
                    </h4>
                    <p className="text-xs font-bold text-[#19100B]">
                      {formatPKR(price)}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      addToCart(product, product.colors[0], 1);
                      removeFromWishlist(product.id);
                    }}
                    className="w-full py-2 bg-[#FAF3EA] text-[#8C522F] hover:bg-[#8C522F] hover:text-white border border-[#DCD3C5] rounded-xs text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
