// Mongoose Models and TypeScript Database Interfaces for Heymand International
import mongoose, { Schema, Document } from 'mongoose';

// 1. User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  company?: string;
  role: 'customer' | 'admin';
  addresses?: Array<{
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    isDefault?: boolean;
  }>;
  createdAt: Date;
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    isDefault: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

// 2. Admin Schema
export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'admin';
  permissions: string[];
  createdAt: Date;
}

export const AdminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, default: 'admin' },
  permissions: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// 3. Product Schema
export interface IProduct extends Document {
  title: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  thumbnail: string;
  images: string[];
  description: string;
  shortDescription: string;
  material: string;
  leatherType: string;
  hardware: string;
  dimensions: string;
  weight?: string;
  colors: Array<{ name: string; hex: string; inStock?: boolean; image?: string }>;
  features: string[];
  specifications: Record<string, string>;
  careInstructions: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isMonogrammable?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  moq?: number;
  wholesalePrice?: number;
  createdAt: Date;
}

export const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 25 },
  thumbnail: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  material: { type: String, default: 'Genuine Full-Grain Cowhide / Buffalo Leather' },
  leatherType: { type: String, default: 'Full-Grain Leather' },
  hardware: { type: String, default: 'Antiqued Brass / Nickel Free' },
  dimensions: { type: String, default: '' },
  weight: { type: String, default: '' },
  colors: [{
    name: String,
    hex: String,
    inStock: { type: Boolean, default: true },
    image: String
  }],
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  careInstructions: { type: String, default: 'Condition every 6 months with beeswax or natural leather balm.' },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isMonogrammable: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  moq: { type: Number, default: 20 },
  wholesalePrice: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// 4. Category Schema
export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  startingPrice?: number;
  featured?: boolean;
}

export const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  itemCount: { type: Number, default: 0 },
  startingPrice: { type: Number, default: 1500 },
  featured: { type: Boolean, default: false }
});

// 5. Order Item Sub-schema & Interface
export interface IOrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  sku: string;
  selectedColor?: string;
  price: number;
  quantity: number;
  total: number;
  personalization?: {
    initials: string;
    foilType: string;
  };
}

export const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  sku: { type: String, required: true },
  selectedColor: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  personalization: {
    initials: String,
    foilType: String
  }
});

// 6. Order Schema
export interface IOrder extends Document {
  orderNumber: string;
  userId?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country?: string;
  };
  items: IOrderItem[];
  shippingMethod: 'standard' | 'express_multan' | 'store_pickup';
  shippingFee: number;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
  paymentStatus: 'pending' | 'paid' | 'verified';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, default: '60000' },
    country: { type: String, default: 'Pakistan' }
  },
  items: [OrderItemSchema],
  shippingMethod: { type: String, enum: ['standard', 'express_multan', 'store_pickup'], default: 'standard' },
  shippingFee: { type: Number, default: 250 },
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'bank_transfer', 'card'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'verified'], default: 'pending' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  trackingNumber: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 7. Cart Schema (for logged-in user cart synchronization)
export interface ICart extends Document {
  userId: string;
  items: Array<{
    productId: string;
    productTitle: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
    selectedColor?: any;
    personalization?: {
      initials: string;
      foilType: string;
    };
  }>;
  updatedAt: Date;
}

export const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true, unique: true },
  items: [{
    productId: String,
    productTitle: String,
    sku: String,
    price: Number,
    quantity: Number,
    image: String,
    selectedColor: Schema.Types.Mixed,
    personalization: {
      initials: String,
      foilType: String
    }
  }],
  updatedAt: { type: Date, default: Date.now }
});

// 8. Wishlist Schema
export interface IWishlist extends Document {
  userId: string;
  products: string[]; // product IDs
  updatedAt: Date;
}

export const WishlistSchema = new Schema<IWishlist>({
  userId: { type: String, required: true, unique: true },
  products: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

// 9. Review Schema
export interface IReview extends Document {
  productId: string;
  productTitle: string;
  author: string;
  city?: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: Date;
}

export const ReviewSchema = new Schema<IReview>({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  author: { type: String, required: true },
  city: { type: String, default: 'Multan' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// 10. Inquiry (B2B Wholesale Inquiry) Schema
export interface IInquiry extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: number;
  requirements: string;
  message: string;
  status: 'New' | 'Reviewing' | 'Quoted' | 'Accepted' | 'Rejected' | 'Completed';
  createdAt: Date;
}

export const InquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, default: 'Pakistan' },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  requirements: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Reviewing', 'Quoted', 'Accepted', 'Rejected', 'Completed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

// 11. Quote Request Schema (Custom Products & OEM Manufacturing)
export interface IQuoteRequest extends Document {
  name: string;
  company?: string;
  email: string;
  phone: string;
  country?: string;
  productType: string;
  quantity: number;
  materialPreference?: string;
  color?: string;
  brandingRequirements?: string;
  requirements?: string;
  message: string;
  referenceFileUrl?: string;
  status: 'New' | 'Reviewing' | 'Quoted' | 'Accepted' | 'Rejected' | 'Completed';
  internalNotes?: string;
  quotedPrice?: number;
  createdAt: Date;
}

export const QuoteRequestSchema = new Schema<IQuoteRequest>({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, default: 'Pakistan' },
  productType: { type: String, required: true },
  quantity: { type: Number, required: true },
  materialPreference: { type: String },
  color: { type: String },
  brandingRequirements: { type: String },
  requirements: { type: String },
  message: { type: String, required: true },
  referenceFileUrl: { type: String },
  status: { type: String, enum: ['New', 'Reviewing', 'Quoted', 'Accepted', 'Rejected', 'Completed'], default: 'New' },
  internalNotes: { type: String },
  quotedPrice: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// 12. Contact Message Schema
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'replied' | 'archived';
  createdAt: Date;
}

export const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, default: 'General Manufacturer Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'replied', 'archived'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
});

// 13. Coupon Schema
export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export const CouponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  expiryDate: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  description: { type: String, default: '' }
});

// 14. Newsletter Subscriber Schema
export interface INewsletterSubscriber extends Document {
  email: string;
  subscribedAt: Date;
}

export const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now }
});

// Export Mongoose Models safely
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const AdminModel = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
export const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export const OrderItemModel = mongoose.models.OrderItem || mongoose.model<IOrderItem>('OrderItem', OrderItemSchema);
export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export const CartModel = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
export const WishlistModel = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);
export const ReviewModel = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
export const InquiryModel = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
export const QuoteRequestModel = mongoose.models.QuoteRequest || mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);
export const ContactMessageModel = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
export const CouponModel = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export const NewsletterSubscriberModel = mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);
