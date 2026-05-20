import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { corsOptions } from './config/cors.config';
import { generalLimiter } from './middleware/rateLimit.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import productsRoutes from './modules/products/products.routes';
import categoriesRoutes from './modules/categories/categories.routes';
import ordersRoutes from './modules/orders/orders.routes';
import trackingRoutes from './modules/tracking/tracking.routes';
import cartRoutes from './modules/cart/cart.routes';
import wishlistRoutes from './modules/wishlist/wishlist.routes';
import { reviewsRouter } from './modules/reviews/reviews.routes';
import blogRoutes from './modules/blog/blog.routes';
import portfolioRoutes from './modules/portfolio/portfolio.routes';
import supportRoutes from './modules/support/support.routes';
import notificationsRoutes from './modules/notifications/notifications.routes';
import customFurnitureRoutes from './modules/custom-furniture/custom.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.info(msg.trim()) },
  }),
);

// Rate limiting
app.use('/api', generalLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'BKP API' });
});

// API Routes
const API = '/api/v1';

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/users`, usersRoutes);
app.use(`${API}/products`, productsRoutes);
app.use(`${API}/categories`, categoriesRoutes);
app.use(`${API}/orders`, ordersRoutes);
app.use(`${API}/tracking`, trackingRoutes);
app.use(`${API}/cart`, cartRoutes);
app.use(`${API}/wishlist`, wishlistRoutes);
app.use(`${API}`, reviewsRouter);
app.use(`${API}/blog`, blogRoutes);
app.use(`${API}/portfolio`, portfolioRoutes);
app.use(`${API}/support`, supportRoutes);
app.use(`${API}/notifications`, notificationsRoutes);
app.use(`${API}/custom-furniture`, customFurnitureRoutes);
app.use(`${API}/admin/analytics`, analyticsRoutes);

// Newsletter subscribe
app.post(`${API}/newsletter/subscribe`, async (req, res) => {
  const { email } = req.body as { email: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, error: 'Invalid email address', statusCode: 400 });
    return;
  }
  const { prisma } = await import('./config/database');
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing?.isSubscribed) {
    res.status(409).json({ success: false, error: 'You are already subscribed!', statusCode: 409 });
    return;
  }
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { isSubscribed: true },
    create: { email },
  });
  res.json({ success: true, data: null, message: 'Subscribed successfully!' });
});

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
