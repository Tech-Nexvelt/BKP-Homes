'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { reviewService } from '@/services/review.service';
import { useCurrency } from '@/hooks/useCurrency';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { ReviewCard } from '@/components/features/ReviewCard';
import { ReviewForm } from '@/components/features/ReviewForm';
import { Star, Shield, Hammer, Truck, Heart, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { format } = useCurrency();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImage, setActiveImage] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('description');
  const [qty, setQty] = React.useState(1);

  // Fetch product detail
  const productQuery = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await productService.getBySlug(slug);
      const data = res.data.data;
      if (data?.images?.length) {
        setActiveImage(data.images[0]);
      }
      return data;
    },
    enabled: !!slug,
  });

  // Fetch product reviews
  const reviewsQuery = useQuery({
    queryKey: ['product-reviews', productQuery.data?.id],
    queryFn: async () => {
      const res = await reviewService.getByProduct(productQuery.data!.id);
      return res.data.data;
    },
    enabled: !!productQuery.data?.id,
  });

  const product = productQuery.data;
  const isFavorite = product ? isInWishlist(product.id) : false;

  if (productQuery.isLoading) {
    return (
      <div className="container-luxora py-32 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-6 flex flex-col gap-6">
          <Skeleton className="aspect-[4/5] w-full rounded-none bg-[#0B0B0C]" />
          <div className="flex gap-4">
            <Skeleton className="h-20 w-16 rounded-none bg-[#0B0B0C]" />
            <Skeleton className="h-20 w-16 rounded-none bg-[#0B0B0C]" />
            <Skeleton className="h-20 w-16 rounded-none bg-[#0B0B0C]" />
          </div>
        </div>
        <div className="md:col-span-6 flex flex-col gap-6">
          <Skeleton className="h-4 w-1/4 rounded-none bg-[#0B0B0C]" />
          <Skeleton className="h-12 w-3/4 rounded-none bg-[#0B0B0C]" />
          <Skeleton className="h-8 w-1/3 mt-4 rounded-none bg-[#0B0B0C]" />
          <Skeleton className="h-32 w-full mt-4 rounded-none bg-[#0B0B0C]" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxora py-36 text-center">
        <h2 className="font-display text-2xl font-light text-[#F5F2ED]">Curation not found.</h2>
        <Button variant="outline" className="mt-6" onClick={() => router.push('/products')}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  const activePrice = product.salePrice ?? product.price;
  const isDiscounted = !!product.salePrice;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0] || '',
      qty,
      stock: product.stock || 10,
    });
  };

  const infoTabs = [
    { value: 'description', label: 'Curation Specs' },
    { value: 'woodcare', label: 'Wood Care' },
    { value: 'shipping', label: 'White-Glove Delivery' },
  ];

  return (
    <div className="container-luxora pt-32 pb-24 flex flex-col gap-24">
      {/* Back button */}
      <div>
        <button 
          onClick={() => router.push('/products')}
          className="flex items-center gap-2 text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </button>
      </div>

      {/* Product Main Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Left: Product Images Gallery */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div className="relative aspect-[4/5] rounded-none bg-[#0B0B0C] overflow-hidden border border-[#D9BB84]/10 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200'}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-[1.2s] brightness-[0.95]"
            />
            {isDiscounted && (
              <span className="absolute top-6 left-6 bg-[#1A7A68] text-white text-[9px] tracking-[0.2em] font-semibold uppercase px-4 py-1.5 shadow-md">
                Special Collection
              </span>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 pr-1 overflow-x-auto scrollbar-thin">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 aspect-[4/5] rounded-none overflow-hidden border transition-all shrink-0 ${
                    activeImage === img ? 'border-[#C8A96B] shadow-lg' : 'border-[#7D7A74]/20 hover:border-[#C8A96B]/50'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Meta & Purchase Panel */}
        <div className="md:col-span-6 flex flex-col gap-10">
          <div>
            {product.category?.name && (
              <span className="text-[10px] font-semibold text-[#C8A96B] tracking-[0.3em] uppercase">
                {product.category.name}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[#F5F2ED] mt-4 leading-[1.15]">
              {product.name}
            </h1>
            
            {/* Average Rating Star display */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex gap-0.5 text-[#C8A96B]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3 w-3 ${
                      idx < (reviewsQuery.data?.avgRating || 5) ? 'fill-current' : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#7D7A74] font-semibold tracking-wider uppercase">({reviewsQuery.data?.total || 0} Client reviews)</span>
            </div>
          </div>

          {/* Pricing parameters */}
          <div className="flex items-baseline gap-4 pb-8 border-b border-[#7D7A74]/15">
            <span className="text-3xl font-light text-[#C8A96B] tracking-tight">
              {format(activePrice)}
            </span>
            {isDiscounted && (
              <span className="text-sm text-[#7D7A74] line-through font-light">
                {format(product.price)}
              </span>
            )}
            {product.stock && product.stock <= 3 && (
              <span className="ml-4 text-[9px] tracking-[0.2em] font-semibold uppercase px-3 py-1 bg-red-950/20 text-red-400 border border-red-800/20">
                Low Stock
              </span>
            )}
          </div>

          {/* Quick Specifications list */}
          <div className="grid grid-cols-2 gap-8 bg-[#0B0B0C] p-6 border border-[#D9BB84]/5 rounded-none">
            {product.material && (
              <div>
                <span className="text-[9px] text-[#C8A96B] uppercase tracking-[0.2em] font-semibold block">Timber & Grain</span>
                <span className="text-sm text-[#B8B3AA] mt-2 block font-light">{product.material}</span>
              </div>
            )}
            {product.weight && (
              <div>
                <span className="text-[9px] text-[#C8A96B] uppercase tracking-[0.2em] font-semibold block">Net Mass</span>
                <span className="text-sm text-[#B8B3AA] mt-2 block font-light">{product.weight} kg</span>
              </div>
            )}
          </div>

          {/* Purchase actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {/* Qty selectors */}
              <div className="flex items-center border border-[#7D7A74]/20 rounded-none bg-[#0B0B0C]/40 overflow-hidden h-12 px-2">
                <button
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#B8B3AA] hover:text-[#C8A96B] transition-colors font-light"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-semibold text-[#F5F2ED]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#B8B3AA] hover:text-[#C8A96B] transition-colors font-light"
                >
                  +
                </button>
              </div>

              <Button 
                variant="gold" 
                className="flex-1 h-12" 
                onClick={handleAddToCart}
              >
                Acquire Curation
              </Button>
            </div>

            <Button
              variant={isFavorite ? 'primary' : 'outline'}
              className="w-full h-12"
              onClick={() => toggleWishlist(product as any)}
            >
              {isFavorite ? 'Saved to Favorites' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Information tabs */}
      <div className="border-t border-[#7D7A74]/15 pt-12 flex flex-col gap-8">
        <Tabs options={infoTabs} selectedValue={activeTab} onChange={setActiveTab} />
        
        <div className="min-h-[120px] text-sm text-[#B8B3AA] leading-relaxed max-w-4xl font-light">
          {activeTab === 'description' && (
            <div className="flex flex-col gap-6">
              <p className="text-base">{product.description || 'This premium model represents our highest standard of material choice and woodworking.'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
                <div className="flex gap-4">
                  <Shield className="h-5 w-5 text-[#C8A96B] shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#F5F2ED] tracking-wide uppercase">10-Year Warranty</h4>
                    <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed">Full coverage for timber structure, interlocking joints, and alignment integrity.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Hammer className="h-5 w-5 text-[#C8A96B] shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#F5F2ED] tracking-wide uppercase">Studio Carpentry</h4>
                    <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed">Tongue & groove interlocking locked with strong dowels, without visible metal plates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Truck className="h-5 w-5 text-[#C8A96B] shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#F5F2ED] tracking-wide uppercase">White-Glove Delivery</h4>
                    <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed">Custom padded crates delivered directly inside your residence by our master installers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'woodcare' && (
            <ul className="list-disc pl-5 flex flex-col gap-3">
              <li>Position the wood components away from intensive heat vents or fireplace exposures.</li>
              <li>Dust regularly with a dry, lint-free cloth. Wipe with a slightly damp cloth if needed.</li>
              <li>Never apply commercial spray polishes containing ammonia, wax-strippers, or silicones.</li>
              <li>Re-apply high-grade natural beeswax twice a year to replenish the organic grain luster.</li>
            </ul>
          )}

          {activeTab === 'shipping' && (
            <p>
              Every luxury curation departs from our centralized workshop in Jubilee Hills, Hyderabad. We arrange specialized freight services utilizing air-suspension trucks lined with custom protective blankets. On-site installation, balancing, and packaging disposal are completed upon arrival.
            </p>
          )}
        </div>
      </div>

      {/* Reviews block */}
      <div className="border-t border-[#7D7A74]/15 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Review Submission Form */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <ReviewForm productId={product.id} onSuccess={() => reviewsQuery.refetch()} />
        </div>

        {/* Right: Reviews List Display */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <h3 className="font-display text-2xl font-light tracking-wide text-[#F5F2ED]">
            Client Journals ({reviewsQuery.data?.total || 0})
          </h3>
          <div className="flex flex-col gap-6">
            {reviewsQuery.data?.reviews && reviewsQuery.data.reviews.length > 0 ? (
              reviewsQuery.data.reviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))
            ) : (
              <div className="text-center py-16 border border-dashed border-[#7D7A74]/20 rounded-none bg-[#0B0B0C]/40">
                <p className="text-xs text-[#7D7A74] uppercase tracking-wider">Be the first to submit a guest journal entry!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
