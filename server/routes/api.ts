import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { siteConfig } from '../../src/config/siteConfig';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'heymand-international-secret-key-2026';

// Auth Middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired session' });
    }
    (req as any).user = user;
    next();
  });
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, () => {
    const user = (req as any).user;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Admin privileges required' });
    }
  });
};

// ==========================================
// STORE CONFIG & INFO
// ==========================================
router.get('/store-info', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: siteConfig
  });
});

// ==========================================
// AUTHENTICATION
// ==========================================
router.post('/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const newUser = db.createUser({
      name,
      email,
      password,
      phone: phone || '',
      company: company || '',
      role: 'customer'
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = newUser;
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userSafe
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
});

router.post('/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = db.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = user;
    res.json({
      success: true,
      message: 'Signed in successfully',
      token,
      user: userSafe
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
});

router.get('/auth/me', authenticateToken, (req: Request, res: Response) => {
  const tokenUser = (req as any).user;
  const user = db.getUserById(tokenUser.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { password: _, ...userSafe } = user;
  res.json({ success: true, user: userSafe });
});

// ==========================================
// PRODUCTS
// ==========================================
router.get('/products', (req: Request, res: Response) => {
  try {
    let products = db.getProducts();
    const { category, search, minPrice, maxPrice, sort, featured, newArrival, inStock } = req.query;

    if (category) {
      const catSlug = String(category).toLowerCase();
      products = products.filter(p => p.categorySlug.toLowerCase() === catSlug || p.category.toLowerCase() === catSlug);
    }

    if (search) {
      const q = String(search).toLowerCase();
      products = products.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }

    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }
    if (newArrival === 'true') {
      products = products.filter(p => p.isNewArrival);
    }
    if (inStock === 'true') {
      products = products.filter(p => p.inStock);
    }

    if (sort) {
      switch (sort) {
        case 'price_asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          break;
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/products/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const product = db.getProductById(idOrSlug) || db.getProductBySlug(idOrSlug);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

router.post('/products', requireAdmin, (req: Request, res: Response) => {
  try {
    const product = db.createProduct(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/products/:id', requireAdmin, (req: Request, res: Response) => {
  const success = db.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted successfully' });
});

// ==========================================
// CATEGORIES
// ==========================================
router.get('/categories', (req: Request, res: Response) => {
  const categories = db.getCategories();
  res.json({ success: true, count: categories.length, data: categories });
});

router.post('/categories', requireAdmin, (req: Request, res: Response) => {
  try {
    const category = db.createCategory(req.body);
    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateCategory(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, message: 'Category updated', data: updated });
});

router.delete('/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteCategory(req.params.id);
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, message: 'Category deleted' });
});

// ==========================================
// COUPONS
// ==========================================
router.get('/coupons', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getCoupons() });
});

router.post('/coupons/validate', (req: Request, res: Response) => {
  const { code, cartTotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code required' });
  }
  const result = db.validateCoupon(code, Number(cartTotal) || 0);
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.message });
  }
  res.json({
    success: true,
    data: {
      code: result.coupon?.code,
      discountAmount: result.discountAmount,
      description: result.coupon?.description
    }
  });
});

router.post('/coupons', requireAdmin, (req: Request, res: Response) => {
  const coupon = db.createCoupon(req.body);
  res.status(201).json({ success: true, data: coupon });
});

router.delete('/coupons/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteCoupon(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Coupon not found' });
  res.json({ success: true, message: 'Coupon removed' });
});

// ==========================================
// ORDERS
// ==========================================
router.post('/orders', (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must include at least one item' });
    }
    if (!orderData.customer || !orderData.customer.fullName || !orderData.customer.phone || !orderData.customer.address) {
      return res.status(400).json({ success: false, message: 'Customer name, phone, and delivery address are required' });
    }

    const createdOrder = db.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will confirm by phone or WhatsApp shortly.',
      data: createdOrder
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders', (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let orders = db.getOrders();
    if (email) {
      orders = orders.filter(o => o.customer.email.toLowerCase() === String(email).toLowerCase());
    }
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders/:idOrNumber', (req: Request, res: Response) => {
  const { idOrNumber } = req.params;
  const order = db.getOrderById(idOrNumber) || db.getOrderByNumber(idOrNumber);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

router.patch('/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = db.updateOrderStatus(id, status, trackingNumber);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// QUOTES & B2B WHOLESALE
// ==========================================
router.get('/quotes', requireAdmin, (req: Request, res: Response) => {
  const quotes = db.getQuoteRequests();
  res.json({ success: true, count: quotes.length, data: quotes });
});

router.post('/quotes', (req: Request, res: Response) => {
  try {
    const { name, email, phone, productType, quantity, message } = req.body;
    if (!name || !email || !phone || !productType || !quantity) {
      return res.status(400).json({ success: false, message: 'Name, email, phone, product type, and quantity are required' });
    }

    const quote = db.createQuoteRequest(req.body);
    res.status(201).json({
      success: true,
      message: 'Quotation request received! Heymand International manufacturing desk will review and contact you within 24 hours.',
      data: quote
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/quotes/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, internalNotes, quotedPrice } = req.body;
  const updated = db.updateQuoteRequestStatus(id, status, internalNotes, quotedPrice);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Quote request not found' });
  }
  res.json({ success: true, message: 'Quote request updated', data: updated });
});

router.get('/b2b/inquiries', requireAdmin, (req: Request, res: Response) => {
  res.json({ success: true, data: db.getInquiries() });
});

router.post('/b2b/inquiries', (req: Request, res: Response) => {
  try {
    const { name, email, phone, product, quantity } = req.body;
    if (!name || !email || !phone || !product) {
      return res.status(400).json({ success: false, message: 'Missing required B2B inquiry details' });
    }
    const inq = db.createInquiry(req.body);
    res.status(201).json({
      success: true,
      message: 'B2B inquiry registered successfully. Our wholesale department will connect with you.',
      data: inq
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// REVIEWS
// ==========================================
router.get('/reviews', (req: Request, res: Response) => {
  const { productId } = req.query;
  const reviews = db.getReviews(productId ? String(productId) : undefined);
  res.json({ success: true, count: reviews.length, data: reviews });
});

router.post('/reviews', (req: Request, res: Response) => {
  try {
    const { productId, author, rating, comment, city } = req.body;
    if (!productId || !author || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Missing required review fields' });
    }

    const product = db.getProductById(productId);
    const newReview = db.createReview({
      productId,
      productTitle: product ? product.title : 'Leather Good',
      author,
      city: city || 'Multan',
      rating: Number(rating),
      comment
    });

    res.status(201).json({ success: true, message: 'Review submitted successfully', data: newReview });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteReview(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Review not found' });
  res.json({ success: true, message: 'Review deleted' });
});

// ==========================================
// CONTACT & MESSAGES
// ==========================================
router.post('/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMsg = db.createMessage({ name, email, phone, subject, message });
    res.status(201).json({
      success: true,
      message: 'Inquiry received. The Heymand International team will contact you shortly.',
      data: newMsg
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/admin/messages', requireAdmin, (req: Request, res: Response) => {
  const messages = db.getMessages();
  res.json({ success: true, count: messages.length, data: messages });
});

router.patch('/admin/messages/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateMessageStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }
  res.json({ success: true, data: updated });
});

// ==========================================
// NEWSLETTER
// ==========================================
router.post('/newsletter/subscribe', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address required' });
  }
  const result = db.subscribeNewsletter(email);
  res.json({ success: true, message: result.message });
});

// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================
router.get('/admin/stats', requireAdmin, (req: Request, res: Response) => {
  try {
    const metrics = db.getMetrics();
    const orders = db.getOrders();
    const products = db.getProducts();
    const lowStockProducts = products.filter(p => p.stockQuantity <= 5);

    res.json({
      success: true,
      data: {
        totalRevenue: metrics.totalSales,
        totalOrders: metrics.totalOrders,
        pendingOrders: metrics.pendingOrders,
        totalProducts: metrics.totalProducts,
        lowStockCount: metrics.lowStockCount,
        unreadMessages: metrics.contactMessages,
        pendingQuotes: metrics.pendingQuotes,
        totalCustomers: metrics.totalCustomers,
        recentOrders: orders.slice(0, 5),
        lowStockProducts: lowStockProducts.slice(0, 5)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
