import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { initialProducts, initialCategories, initialReviews, initialCoupons } from '../src/data/seedData';
import {
  Product,
  Category,
  Order,
  User,
  Review,
  Coupon,
  ContactMessage,
  Notification,
  QuoteRequest,
  B2BInquiry,
  NewsletterSubscriber,
  AdminDashboardMetrics
} from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
  messages: ContactMessage[];
  quoteRequests: QuoteRequest[];
  inquiries: B2BInquiry[];
  subscribers: NewsletterSubscriber[];
  notifications: Notification[];
}

const defaultAdminPasswordHash = bcrypt.hashSync('admin123', 10);
const defaultCustomerPasswordHash = bcrypt.hashSync('customer123', 10);

const initialUsers: User[] = [
  {
    id: 'user-admin-1',
    name: 'Heymand International Administration',
    email: 'admin@heymandinternational.com',
    password: defaultAdminPasswordHash,
    role: 'admin',
    phone: '03226685582',
    company: 'Heymand International',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-cust-1',
    name: 'Shahid Nadeem',
    email: 'customer@example.com',
    password: defaultCustomerPasswordHash,
    role: 'customer',
    phone: '03001234567',
    company: 'Retail Partner',
    addresses: [
      {
        id: 'addr-cust-1',
        fullName: 'Shahid Nadeem',
        phone: '03001234567',
        address: 'Tareen Road Commercial Center, Mohalla Qadirabad',
        city: 'Multan',
        postalCode: '60000',
        isDefault: true
      }
    ],
    createdAt: '2026-02-01'
  }
];

const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'HEY-2026-1001',
    customer: {
      fullName: 'Muhammad Usman',
      email: 'usman.m@example.com',
      phone: '03225554433',
      address: 'Near DCS Office, Tareen Rd, Mohalla Qadirabad',
      city: 'Multan',
      postalCode: '60000',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-w1',
        productTitle: 'Heritage Classic Bifold Leather Wallet',
        productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
        sku: 'HEY-WLT-001',
        selectedColor: 'Espresso Brown',
        price: 3200,
        quantity: 2,
        total: 6400
      },
      {
        productId: 'prod-b1',
        productTitle: 'Artisan Formal Stitched Leather Belt (35mm)',
        productImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop',
        sku: 'HEY-BLT-001',
        selectedColor: 'Classic Black',
        price: 2990,
        quantity: 1,
        total: 2990
      }
    ],
    shippingMethod: 'standard',
    shippingFee: 250,
    subtotal: 9390,
    discountAmount: 939,
    couponCode: 'HEYMAND10',
    grandTotal: 8701,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'Processing',
    trackingNumber: 'TCS-HEY-881290',
    notes: 'Please verify order via WhatsApp before dispatch.',
    createdAt: '2026-03-12T14:30:00Z',
    updatedAt: '2026-03-13T09:15:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'HEY-2026-1002',
    customer: {
      fullName: 'Ayesha Raza',
      email: 'ayesha.r@example.com',
      phone: '03129876543',
      address: 'Suit # 402, Commercial Tower, Gulgasht',
      city: 'Multan',
      postalCode: '60000',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-hb1',
        productTitle: 'The Multan Grace Structured Leather Tote',
        productImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
        sku: 'HEY-HBG-001',
        selectedColor: 'Warm Caramel',
        price: 11900,
        quantity: 1,
        total: 11900
      }
    ],
    shippingMethod: 'express_multan',
    shippingFee: 350,
    subtotal: 11900,
    discountAmount: 0,
    grandTotal: 12250,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    status: 'Confirmed',
    notes: 'Payment transferred to Meezan Bank account.',
    createdAt: '2026-03-14T10:15:00Z',
    updatedAt: '2026-03-14T11:00:00Z'
  }
];

const initialQuoteRequests: QuoteRequest[] = [
  {
    id: 'quote-1',
    name: 'Hamza Tariq',
    company: 'SilkRoute Traders UK',
    email: 'hamza@silkroutetraders.co.uk',
    phone: '+44 7911 123456',
    country: 'United Kingdom',
    productType: 'Leather Wallets',
    quantity: 500,
    materialPreference: 'Full-Grain Pull-Up Cowhide',
    color: 'Espresso & Tan',
    brandingRequirements: 'Custom debossed logo on inside flap & RFID lining',
    requirements: 'Export packaging with individual gift boxes and barcode stickers.',
    message: 'We are sourcing 500 units of premium bifold wallets for our autumn collection. Please provide FOB Karachi or Multan dispatch pricing and sample lead time.',
    status: 'Reviewing',
    quotedPrice: 950000,
    internalNotes: 'Sample prototype pattern sent to client for digital approval.',
    createdAt: '2026-03-10T11:00:00Z'
  },
  {
    id: 'quote-2',
    name: 'Zubair Al-Mansoor',
    company: 'Al-Mansoor Corporate Services Dubai',
    email: 'zubair@almansoor.ae',
    phone: '+971 50 1234567',
    country: 'United Arab Emirates',
    productType: 'Corporate Leather Products',
    quantity: 200,
    materialPreference: 'Top-Grain Leather',
    color: 'Navy Blue & Dark Brown',
    brandingRequirements: 'Gold foil hot-stamping with company emblem',
    requirements: 'A4 conference padfolios with magnetic closure and pen holder.',
    message: 'Looking for 200 custom leather folios for annual GCC executive conference in Dubai.',
    status: 'New',
    createdAt: '2026-03-15T09:30:00Z'
  }
];

const initialInquiries: B2BInquiry[] = [
  {
    id: 'inq-1',
    name: 'David Miller',
    company: 'Apex Goods Co.',
    email: 'david@apexleather.com',
    phone: '+1 415 555 2671',
    country: 'United States',
    product: 'Travel Bags',
    quantity: 150,
    requirements: '45L weekend leather duffels in oil pull-up leather.',
    message: 'Hello Heymand International, we are interested in ordering your weekend leather duffel bags under our private label.',
    status: 'Quoted',
    createdAt: '2026-03-08T16:00:00Z'
  }
];

const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Rehan Ahmed',
    email: 'rehan@multanbusiness.pk',
    phone: '03226685582',
    subject: 'Factory Visit & Bulk Leather Belts Inquiry',
    message: 'Hello Heymand International team. We are based in Multan and would like to visit your location at Tareen Rd near DCS Office to review your leather belt samples and discuss a contract.',
    status: 'unread',
    createdAt: '2026-03-14T08:00:00Z'
  }
];

const initialSubscribers: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'procurement@leathergroup.com', subscribedAt: '2026-01-10T00:00:00Z' },
  { id: 'sub-2', email: 'retailer@multangoods.pk', subscribedAt: '2026-02-15T00:00:00Z' }
];

class DatabaseService {
  private state: DatabaseState = {
    products: [],
    categories: [],
    orders: [],
    users: [],
    reviews: [],
    coupons: [],
    messages: [],
    quoteRequests: [],
    inquiries: [],
    subscribers: [],
    notifications: []
  };

  private isMongoConnected = false;

  constructor() {
    this.initLocalStore();
    this.connectMongo();
  }

  private initLocalStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      let shouldReset = false;
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        try {
          const parsed = JSON.parse(raw);
          // Check if previous database had old unrelated products or needs product sync
          if (parsed.products && parsed.products.length && (parsed.products[0].sku?.startsWith('SPC-') || parsed.products[0].sku?.startsWith('JAF-'))) {
            shouldReset = true;
          } else if (!parsed.products || parsed.products.length < initialProducts.length) {
            // Synchronize new products added to initialProducts
            shouldReset = true;
          } else {
            this.state = {
              products: parsed.products && parsed.products.length ? parsed.products : initialProducts,
              categories: parsed.categories && parsed.categories.length ? parsed.categories : initialCategories,
              orders: parsed.orders || initialOrders,
              users: parsed.users || initialUsers,
              reviews: parsed.reviews || initialReviews,
              coupons: parsed.coupons || initialCoupons,
              messages: parsed.messages || initialMessages,
              quoteRequests: parsed.quoteRequests || initialQuoteRequests,
              inquiries: parsed.inquiries || initialInquiries,
              subscribers: parsed.subscribers || initialSubscribers,
              notifications: parsed.notifications || []
            };
          }
        } catch {
          shouldReset = true;
        }
      } else {
        shouldReset = true;
      }

      if (shouldReset) {
        this.state = {
          products: initialProducts,
          categories: initialCategories,
          orders: initialOrders,
          users: initialUsers,
          reviews: initialReviews,
          coupons: initialCoupons,
          messages: initialMessages,
          quoteRequests: initialQuoteRequests,
          inquiries: initialInquiries,
          subscribers: initialSubscribers,
          notifications: []
        };
        this.persist();
      }
    } catch (e) {
      console.warn('Fallback store load notice:', e);
      this.state = {
        products: initialProducts,
        categories: initialCategories,
        orders: initialOrders,
        users: initialUsers,
        reviews: initialReviews,
        coupons: initialCoupons,
        messages: initialMessages,
        quoteRequests: initialQuoteRequests,
        inquiries: initialInquiries,
        subscribers: initialSubscribers,
        notifications: []
      };
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  private async connectMongo() {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri && mongoUri.startsWith('mongodb')) {
      try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
        this.isMongoConnected = true;
        console.log('MongoDB connected successfully for Heymand International');
      } catch (err: any) {
        console.warn('MongoDB connection note (operating on resilient local store):', err.message || err);
      }
    }
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    return this.state.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.state.products.find(p => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.state.products.find(p => p.slug === slug);
  }

  public createProduct(productData: Partial<Product>): Product {
    const id = `prod-custom-${Date.now()}`;
    const slug = productData.slug || (productData.title || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      id,
      title: productData.title || 'Untitled Leather Product',
      slug,
      sku: productData.sku || `HEY-CST-${Math.floor(100 + Math.random() * 900)}`,
      category: productData.category || 'Leather Goods',
      categorySlug: productData.categorySlug || 'leather-goods',
      price: Number(productData.price) || 3000,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
      inStock: productData.inStock !== false,
      stockQuantity: Number(productData.stockQuantity) || 20,
      stock: Number(productData.stockQuantity) || 20,
      images: productData.images && productData.images.length ? productData.images : ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'],
      thumbnail: productData.thumbnail || (productData.images && productData.images[0]) || 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
      description: productData.description || 'Premium handcrafted leather product from Heymand International.',
      shortDescription: productData.shortDescription || 'Handcrafted full-grain leather good.',
      material: productData.material || 'Genuine Full-Grain Cowhide Leather',
      leatherType: productData.leatherType || 'Full-Grain Leather',
      hardware: productData.hardware || 'Antiqued Brass Fittings',
      dimensions: productData.dimensions || 'Custom Dimensions',
      weight: productData.weight || '300g',
      colors: productData.colors && productData.colors.length ? productData.colors : [{ name: 'Espresso Brown', hex: '#2A1810', inStock: true }],
      features: productData.features || ['Premium Full-Grain Leather', 'Precision Hand-Stitched', 'Reinforced Hardware'],
      specifications: productData.specifications || { 'Origin': 'Heymand International, Multan' },
      careInstructions: productData.careInstructions || 'Clean with soft cloth and condition periodically.',
      isFeatured: !!productData.isFeatured,
      isNewArrival: !!productData.isNewArrival,
      isBestSeller: !!productData.isBestSeller,
      isMonogrammable: productData.isMonogrammable !== false,
      rating: 5.0,
      reviewCount: 0,
      tags: productData.tags || ['leather', 'handcrafted', 'multan'],
      moq: productData.moq || 20,
      wholesalePrice: productData.wholesalePrice || Math.round(Number(productData.price) * 0.6),
      createdAt: new Date().toISOString()
    };

    this.state.products.unshift(newProduct);
    this.persist();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.state.products[index] = {
      ...this.state.products[index],
      ...updates
    };
    this.persist();
    return this.state.products[index];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.state.products.length;
    this.state.products = this.state.products.filter(p => p.id !== id);
    if (this.state.products.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- CATEGORIES ---
  public getCategories(): Category[] {
    return this.state.categories;
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.state.categories.find(c => c.slug === slug);
  }

  public createCategory(data: Partial<Category>): Category {
    const slug = data.slug || (data.name || 'category').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: data.name || 'New Category',
      slug,
      description: data.description || 'Premium leather collection.',
      image: data.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      itemCount: 0,
      startingPrice: data.startingPrice || 2500,
      featured: !!data.featured
    };
    this.state.categories.push(newCategory);
    this.persist();
    return newCategory;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.state.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.state.categories[index] = { ...this.state.categories[index], ...updates };
    this.persist();
    return this.state.categories[index];
  }

  public deleteCategory(id: string): boolean {
    const prev = this.state.categories.length;
    this.state.categories = this.state.categories.filter(c => c.id !== id);
    if (this.state.categories.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    return this.state.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.state.orders.find(o => o.id === id || o.orderNumber === id);
  }

  public getOrderByNumber(orderNumber: string): Order | undefined {
    return this.state.orders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  }

  public createOrder(orderData: Partial<Order>): Order {
    const count = this.state.orders.length + 1001;
    const orderNumber = `HEY-${new Date().getFullYear()}-${count}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: orderData.userId,
      customer: {
        fullName: orderData.customer?.fullName || 'Valued Customer',
        email: orderData.customer?.email || '',
        phone: orderData.customer?.phone || '',
        address: orderData.customer?.address || '',
        city: orderData.customer?.city || 'Multan',
        postalCode: orderData.customer?.postalCode || '60000',
        country: orderData.customer?.country || 'Pakistan'
      },
      items: orderData.items || [],
      shippingMethod: orderData.shippingMethod || 'standard',
      shippingFee: orderData.shippingFee ?? 250,
      subtotal: orderData.subtotal || 0,
      discountAmount: orderData.discountAmount || 0,
      couponCode: orderData.couponCode,
      grandTotal: orderData.grandTotal || 0,
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentStatus || 'pending',
      status: 'Pending',
      trackingNumber: `TCS-HEY-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.state.orders.unshift(newOrder);

    // Add notification
    this.createNotification({
      title: `New Order Received (${orderNumber})`,
      message: `Order for ${newOrder.customer.fullName} with ${newOrder.items.length} items totaling Rs. ${newOrder.grandTotal.toLocaleString()}.`,
      type: 'order'
    });

    this.persist();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: Order['status'], trackingNumber?: string): Order | null {
    const order = this.state.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    this.persist();
    return order;
  }

  // --- QUOTE REQUESTS ---
  public getQuoteRequests(): QuoteRequest[] {
    return this.state.quoteRequests;
  }

  public getQuoteRequestById(id: string): QuoteRequest | undefined {
    return this.state.quoteRequests.find(q => q.id === id);
  }

  public createQuoteRequest(data: Partial<QuoteRequest>): QuoteRequest {
    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      name: data.name || '',
      company: data.company,
      email: data.email || '',
      phone: data.phone || '',
      country: data.country || 'Pakistan',
      productType: data.productType || 'Custom Leather Goods',
      quantity: Number(data.quantity) || 50,
      materialPreference: data.materialPreference,
      color: data.color,
      brandingRequirements: data.brandingRequirements,
      requirements: data.requirements,
      message: data.message || '',
      referenceFileUrl: data.referenceFileUrl,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    this.state.quoteRequests.unshift(newQuote);

    this.createNotification({
      title: `New B2B Quote Request: ${newQuote.productType}`,
      message: `From ${newQuote.name} (${newQuote.company || 'Private'}) for ${newQuote.quantity} units.`,
      type: 'quote'
    });

    this.persist();
    return newQuote;
  }

  public updateQuoteRequestStatus(id: string, status: QuoteRequest['status'], internalNotes?: string, quotedPrice?: number): QuoteRequest | null {
    const quote = this.state.quoteRequests.find(q => q.id === id);
    if (!quote) return null;
    quote.status = status;
    if (internalNotes !== undefined) quote.internalNotes = internalNotes;
    if (quotedPrice !== undefined) quote.quotedPrice = quotedPrice;
    this.persist();
    return quote;
  }

  // --- B2B INQUIRIES ---
  public getInquiries(): B2BInquiry[] {
    return this.state.inquiries;
  }

  public createInquiry(data: Partial<B2BInquiry>): B2BInquiry {
    const newInq: B2BInquiry = {
      id: `inq-${Date.now()}`,
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      phone: data.phone || '',
      country: data.country || 'Pakistan',
      product: data.product || '',
      quantity: Number(data.quantity) || 50,
      requirements: data.requirements || '',
      message: data.message || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };

    this.state.inquiries.unshift(newInq);
    this.persist();
    return newInq;
  }

  // --- USERS & AUTH ---
  public getUsers(): User[] {
    return this.state.users.map(({ password, ...u }) => u as User);
  }

  public getUserById(id: string): User | undefined {
    return this.state.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public createUser(userData: Partial<User>): User {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'User',
      email: userData.email!.toLowerCase(),
      password: userData.password ? bcrypt.hashSync(userData.password, 10) : undefined,
      phone: userData.phone || '',
      company: userData.company || '',
      role: userData.role || 'customer',
      addresses: userData.addresses || [],
      createdAt: new Date().toISOString()
    };
    this.state.users.push(newUser);
    this.persist();
    const { password, ...safeUser } = newUser;
    return safeUser as User;
  }

  // --- REVIEWS ---
  public getReviews(productId?: string): Review[] {
    if (productId) {
      return this.state.reviews.filter(r => r.productId === productId && r.isApproved);
    }
    return this.state.reviews;
  }

  public createReview(data: Partial<Review>): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: data.productId || '',
      productTitle: data.productTitle || '',
      author: data.author || 'Anonymous Client',
      city: data.city || 'Multan',
      rating: Number(data.rating) || 5,
      comment: data.comment || '',
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      isApproved: true
    };
    this.state.reviews.unshift(newReview);
    this.persist();
    return newReview;
  }

  public deleteReview(id: string): boolean {
    const prev = this.state.reviews.length;
    this.state.reviews = this.state.reviews.filter(r => r.id !== id);
    if (this.state.reviews.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- COUPONS ---
  public getCoupons(): Coupon[] {
    return this.state.coupons;
  }

  public validateCoupon(code: string, subtotal: number): { valid: boolean; discountAmount: number; coupon?: Coupon; message?: string } {
    const coupon = this.state.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) {
      return { valid: false, discountAmount: 0, message: 'Invalid or inactive promo code.' };
    }
    if (subtotal < coupon.minOrderAmount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `This coupon requires a minimum subtotal of Rs. ${coupon.minOrderAmount.toLocaleString()}.`
      };
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }
    return { valid: true, discountAmount: Math.min(discount, subtotal), coupon };
  }

  public createCoupon(data: Partial<Coupon>): Coupon {
    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: (data.code || 'SAVE10').toUpperCase().trim(),
      discountType: data.discountType || 'percentage',
      discountValue: Number(data.discountValue) || 10,
      minOrderAmount: Number(data.minOrderAmount) || 0,
      expiryDate: data.expiryDate || '2026-12-31',
      isActive: data.isActive !== false,
      description: data.description || ''
    };
    this.state.coupons.push(newCoupon);
    this.persist();
    return newCoupon;
  }

  public deleteCoupon(id: string): boolean {
    const prev = this.state.coupons.length;
    this.state.coupons = this.state.coupons.filter(c => c.id !== id);
    if (this.state.coupons.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- CONTACT MESSAGES ---
  public getMessages(): ContactMessage[] {
    return this.state.messages;
  }

  public createMessage(data: Partial<ContactMessage>): ContactMessage {
    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || 'Manufacturer Inquiry',
      message: data.message || '',
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.state.messages.unshift(msg);
    this.createNotification({
      title: `New Message from ${msg.name}`,
      message: msg.subject,
      type: 'system'
    });
    this.persist();
    return msg;
  }

  public updateMessageStatus(id: string, status: ContactMessage['status']): ContactMessage | null {
    const msg = this.state.messages.find(m => m.id === id);
    if (!msg) return null;
    msg.status = status;
    this.persist();
    return msg;
  }

  // --- NEWSLETTER ---
  public subscribeNewsletter(email: string): { success: boolean; message: string } {
    const cleanEmail = email.toLowerCase().trim();
    if (this.state.subscribers.some(s => s.email === cleanEmail)) {
      return { success: true, message: 'You are already subscribed to Heymand International manufacturing updates.' };
    }
    this.state.subscribers.push({
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });
    this.persist();
    return { success: true, message: 'Thank you for subscribing to Heymand International!' };
  }

  // --- NOTIFICATIONS ---
  public getNotifications(): Notification[] {
    return this.state.notifications;
  }

  public createNotification(data: Partial<Notification>): Notification {
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      title: data.title || '',
      message: data.message || '',
      type: data.type || 'system',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    this.state.notifications.unshift(notif);
    if (this.state.notifications.length > 50) {
      this.state.notifications = this.state.notifications.slice(0, 50);
    }
    this.persist();
    return notif;
  }

  // --- METRICS ---
  public getMetrics(): AdminDashboardMetrics {
    const totalSales = this.state.orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.grandTotal : sum), 0);
    const totalOrders = this.state.orders.length;
    const totalCustomers = this.state.users.filter(u => u.role === 'customer').length;
    const totalProducts = this.state.products.length;
    const pendingOrders = this.state.orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const completedOrders = this.state.orders.filter(o => o.status === 'Delivered').length;
    const lowStockCount = this.state.products.filter(p => p.stockQuantity <= 5).length;
    const pendingQuotes = this.state.quoteRequests.filter(q => q.status === 'New' || q.status === 'Reviewing').length;
    const contactMessages = this.state.messages.filter(m => m.status === 'unread').length;

    return {
      totalSales,
      totalOrders,
      totalCustomers,
      totalProducts,
      pendingOrders,
      completedOrders,
      lowStockCount,
      pendingQuotes,
      contactMessages
    };
  }

  // Aliases for compatibility
  public addReview = this.createReview.bind(this);
  public addMessage = this.createMessage.bind(this);
}

export const dbService = new DatabaseService();
export const db = dbService;

