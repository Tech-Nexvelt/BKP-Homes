import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Luxora database...');

  // Categories
  const livingRoom = await prisma.category.upsert({
    where: { slug: 'living-room' },
    update: {},
    create: { name: 'Living Room', slug: 'living-room', description: 'Sofas, coffee tables, TV units and more', sortOrder: 1 },
  });
  const bedroom = await prisma.category.upsert({
    where: { slug: 'bedroom' },
    update: {},
    create: { name: 'Bedroom', slug: 'bedroom', description: 'Beds, wardrobes, dressers and nightstands', sortOrder: 2 },
  });
  const diningRoom = await prisma.category.upsert({
    where: { slug: 'dining-room' },
    update: {},
    create: { name: 'Dining Room', slug: 'dining-room', description: 'Dining tables and chairs', sortOrder: 3 },
  });
  const office = await prisma.category.upsert({
    where: { slug: 'home-office' },
    update: {},
    create: { name: 'Home Office', slug: 'home-office', description: 'Desks, chairs and storage', sortOrder: 4 },
  });
  const outdoor = await prisma.category.upsert({
    where: { slug: 'outdoor' },
    update: {},
    create: { name: 'Outdoor', slug: 'outdoor', description: 'Garden and patio furniture', sortOrder: 5 },
  });

  console.log('✅ Categories seeded');

  // Users
  const hash = await bcrypt.hash('Password@123', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@luxora.in' },
    update: {},
    create: { name: 'Luxora Admin', email: 'admin@luxora.in', password: hash, role: 'ADMIN', isVerified: true, phone: '+91-9000000001' },
  });
  const employeeUser = await prisma.user.upsert({
    where: { email: 'staff@luxora.in' },
    update: {},
    create: { name: 'Arjun Sharma', email: 'staff@luxora.in', password: hash, role: 'EMPLOYEE', isVerified: true, phone: '+91-9000000002' },
  });
  const customerUser = await prisma.user.upsert({
    where: { email: 'priya@example.com' },
    update: {},
    create: { name: 'Priya Mehta', email: 'priya@example.com', password: hash, role: 'CUSTOMER', isVerified: true, phone: '+91-9000000003' },
  });

  console.log('✅ Users seeded');

  // Products
  const products = [
    { name: 'Palazzo Velvet Sofa', slug: 'palazzo-velvet-sofa', categoryId: livingRoom.id, price: 185000, salePrice: 162000, material: 'Italian Velvet', stock: 8, isFeatured: true, tags: ['sofa', 'velvet', 'luxury'], description: 'Handcrafted 3-seater sofa upholstered in rich Italian velvet with solid teak wood frame.' },
    { name: 'Maharaja King Bed', slug: 'maharaja-king-bed', categoryId: bedroom.id, price: 245000, salePrice: null, material: 'Teak Wood', stock: 5, isFeatured: true, tags: ['bed', 'king', 'teak'], description: 'Majestic king-size bed with intricately carved teak headboard and premium slat base.' },
    { name: 'Elara Dining Table', slug: 'elara-dining-table', categoryId: diningRoom.id, price: 98000, salePrice: 89000, material: 'Marble & Steel', stock: 12, isFeatured: true, tags: ['dining', 'marble', 'modern'], description: '8-seater dining table with Italian marble top and powder-coated steel legs.' },
    { name: 'Zenith Executive Desk', slug: 'zenith-executive-desk', categoryId: office.id, price: 72000, salePrice: null, material: 'Walnut Wood', stock: 10, isFeatured: false, tags: ['desk', 'office', 'walnut'], description: 'Premium walnut executive desk with integrated cable management and leather-inlay writing pad.' },
    { name: 'Serenity Lounge Chair', slug: 'serenity-lounge-chair', categoryId: livingRoom.id, price: 55000, salePrice: 48000, material: 'Leather', stock: 15, isFeatured: true, tags: ['chair', 'leather', 'lounge'], description: 'Mid-century modern lounge chair in full-grain Italian leather with walnut legs.' },
    { name: 'Garden Orbit Set', slug: 'garden-orbit-set', categoryId: outdoor.id, price: 68000, salePrice: null, material: 'Teak & Rope', stock: 6, isFeatured: false, tags: ['outdoor', 'garden', 'teak'], description: '4-piece outdoor seating set in weather-resistant teak with hand-woven rope accents.' },
    { name: 'Aurora Wardrobe', slug: 'aurora-wardrobe', categoryId: bedroom.id, price: 135000, salePrice: 118000, material: 'Engineered Wood', stock: 7, isFeatured: false, tags: ['wardrobe', 'storage', 'bedroom'], description: '6-door wardrobe with integrated LED lighting, velvet-lined drawers and mirrored panels.' },
    { name: 'Nomad Coffee Table', slug: 'nomad-coffee-table', categoryId: livingRoom.id, price: 38000, salePrice: 32000, material: 'Mango Wood', stock: 20, isFeatured: false, tags: ['coffee table', 'mango wood', 'boho'], description: 'Organic-edged live-edge mango wood coffee table on hairpin legs.' },
    { name: 'Prestige Dining Chair', slug: 'prestige-dining-chair', categoryId: diningRoom.id, price: 18500, salePrice: null, material: 'Beechwood & Fabric', stock: 40, isFeatured: false, tags: ['chair', 'dining', 'upholstered'], description: 'Ergonomic upholstered dining chair with solid beechwood frame — sold as a set of 2.' },
    { name: 'Nova Study Chair', slug: 'nova-study-chair', categoryId: office.id, price: 28000, salePrice: 24000, material: 'Mesh & Steel', stock: 18, isFeatured: false, tags: ['chair', 'ergonomic', 'office'], description: 'High-back ergonomic mesh chair with lumbar support and adjustable armrests.' },
    { name: 'Indus TV Unit', slug: 'indus-tv-unit', categoryId: livingRoom.id, price: 62000, salePrice: null, material: 'Sheesham Wood', stock: 9, isFeatured: false, tags: ['tv unit', 'sheesham', 'storage'], description: 'Solid sheesham wood TV unit with sliding doors and open shelves. Fits up to 75" TV.' },
    { name: 'Cloud Nine Mattress', slug: 'cloud-nine-mattress', categoryId: bedroom.id, price: 45000, salePrice: 39000, material: 'Memory Foam', stock: 25, isFeatured: false, tags: ['mattress', 'memory foam', 'sleep'], description: '10-inch orthopedic memory foam mattress with cooling gel layer. King size.' },
    { name: 'Tuscany Bookshelf', slug: 'tuscany-bookshelf', categoryId: office.id, price: 42000, salePrice: null, material: 'Solid Oak', stock: 11, isFeatured: false, tags: ['bookshelf', 'oak', 'storage'], description: '6-shelf solid oak bookcase with adjustable shelves and antique brass hardware.' },
    { name: 'Riviera Outdoor Lounger', slug: 'riviera-outdoor-lounger', categoryId: outdoor.id, price: 32000, salePrice: 28000, material: 'Teak', stock: 8, isFeatured: false, tags: ['lounger', 'outdoor', 'pool'], description: 'Foldable teak sun lounger with adjustable backrest and thick weather-proof cushion.' },
    { name: 'Baroque Console Table', slug: 'baroque-console-table', categoryId: livingRoom.id, price: 48000, salePrice: null, material: 'Mango Wood & Glass', stock: 14, isFeatured: false, tags: ['console', 'entryway', 'glass'], description: 'Artisan-crafted console table with mango wood base and tempered glass shelf.' },
    { name: 'Luna Bedside Table', slug: 'luna-bedside-table', categoryId: bedroom.id, price: 22000, salePrice: 19000, material: 'Acacia Wood', stock: 30, isFeatured: false, tags: ['nightstand', 'bedside', 'acacia'], description: 'Scandinavian-style bedside table with single drawer and open shelf. Sold as pair.' },
    { name: 'Horizon Sectional Sofa', slug: 'horizon-sectional-sofa', categoryId: livingRoom.id, price: 320000, salePrice: 285000, material: 'Premium Fabric', stock: 3, isFeatured: true, tags: ['sectional', 'sofa', 'L-shape'], description: 'L-shaped 6-seater sectional sofa with chaise lounge in premium stain-resistant fabric.' },
    { name: 'Marble Bistro Table', slug: 'marble-bistro-table', categoryId: diningRoom.id, price: 28000, salePrice: null, material: 'Marble & Iron', stock: 16, isFeatured: false, tags: ['bistro', 'marble', 'small'], description: 'Compact 2-seater bistro table with Italian carrara marble top and black iron base.' },
    { name: 'Sahara Floor Lamp', slug: 'sahara-floor-lamp', categoryId: livingRoom.id, price: 15000, salePrice: 12500, material: 'Brass & Linen', stock: 22, isFeatured: false, tags: ['lamp', 'lighting', 'brass'], description: 'Adjustable arc floor lamp with antique brass finish and hand-stitched linen shade.' },
    { name: 'Vertex Standing Desk', slug: 'vertex-standing-desk', categoryId: office.id, price: 85000, salePrice: 74000, material: 'Bamboo & Steel', stock: 7, isFeatured: false, tags: ['standing desk', 'ergonomic', 'bamboo'], description: 'Electric height-adjustable standing desk with bamboo top, dual motor, and memory presets.' },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        images: [
          `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800`,
          `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800`,
        ],
      },
    });
  }

  console.log('✅ Products seeded');

  // Blog Posts
  const blogPosts = [
    { title: '10 Ways to Style Your Living Room', slug: '10-ways-to-style-living-room', excerpt: 'Transform your living space with these expert interior design tips from Luxora designers.', content: 'A well-designed living room is the heart of the home...', category: 'Interior Design', tags: ['living room', 'styling', 'tips'], isPublished: true, readTime: 5 },
    { title: 'The Art of Choosing the Right Sofa', slug: 'art-of-choosing-right-sofa', excerpt: 'A comprehensive guide to finding your perfect sofa — size, fabric, and style explained.', content: 'Choosing a sofa is one of the most important furniture decisions you will make...', category: 'Buying Guide', tags: ['sofa', 'guide', 'buying'], isPublished: true, readTime: 8 },
    { title: 'Sustainable Luxury: Our Wood Sourcing Philosophy', slug: 'sustainable-luxury-wood-sourcing', excerpt: 'At Luxora, we believe luxury and sustainability go hand in hand. Here is our story.', content: 'Every piece of furniture at Luxora begins with a tree — and we take that responsibility seriously...', category: 'Sustainability', tags: ['sustainability', 'wood', 'eco'], isPublished: true, readTime: 6 },
    { title: 'Bedroom Design Trends 2025', slug: 'bedroom-design-trends-2025', excerpt: 'Explore the hottest bedroom design trends shaping Indian homes this year.', content: 'The Indian bedroom is evolving. Minimalism meets maximalism in 2025...', category: 'Trends', tags: ['bedroom', 'trends', '2025'], isPublished: true, readTime: 4 },
    { title: 'How to Care for Teak Wood Furniture', slug: 'how-to-care-for-teak-wood', excerpt: 'Keep your teak furniture looking pristine for decades with our maintenance guide.', content: 'Teak is one of the most durable and beautiful woods in the world...', category: 'Maintenance', tags: ['teak', 'care', 'maintenance'], isPublished: true, readTime: 7 },
  ];

  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        authorId: adminUser.id,
        publishedAt: new Date(),
        coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
      },
    });
  }

  console.log('✅ Blog posts seeded');

  // Portfolio
  const portfolioProjects = [
    { title: 'Banjara Hills Villa — Complete Interior', description: 'Full home furnishing for a 4500 sqft luxury villa in Banjara Hills, Hyderabad.', images: ['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200'], roomType: 'Full Home', projectType: 'Residential', client: 'Reddy Family', location: 'Banjara Hills, Hyderabad', isPublished: true, sortOrder: 1 },
    { title: 'Film Nagar Penthouse — Living & Dining', description: 'Bespoke living and dining area furniture for a penthouse overlooking the city.', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200'], roomType: 'Living Room', projectType: 'Residential', client: 'Kapoor Residence', location: 'Film Nagar, Hyderabad', isPublished: true, sortOrder: 2 },
    { title: 'Jubilee Hills Office — Executive Suite', description: 'Corporate executive suite with custom desks, meeting table and lounge seating.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200'], roomType: 'Office', projectType: 'Commercial', client: 'TechCorp India', location: 'Jubilee Hills, Hyderabad', isPublished: true, sortOrder: 3 },
  ];

  for (const project of portfolioProjects) {
    const existing = await prisma.portfolio.findFirst({ where: { title: project.title } });
    if (!existing) {
      await prisma.portfolio.create({ data: project });
    }
  }

  console.log('✅ Portfolio seeded');
  console.log(`\n🎉 Seed complete!`);
  console.log(`   Admin:    admin@luxora.in    / Password@123`);
  console.log(`   Staff:    staff@luxora.in    / Password@123`);
  console.log(`   Customer: priya@example.com  / Password@123`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
