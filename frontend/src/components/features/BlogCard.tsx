'use client';

import * as React from 'react';
import Link from 'next/link';
import type { Blog } from '@/types/blog.types';
import { Card } from '../ui/Card';
import { formatDate } from '@/lib/utils';
import { ArrowRight, BookOpen } from 'lucide-react';

export interface BlogCardProps {
  post: Blog;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <Card variant="interactive" className="p-3 h-full flex flex-col justify-between">
        
        {/* Cover Photo */}
        <div className="relative aspect-[16/10] w-full rounded-lg bg-dark-surface overflow-hidden border border-dark-border/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {post.category && (
            <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/80 border border-dark-border text-[9px] font-bold text-gold tracking-widest uppercase">
              {post.category}
            </span>
          )}
        </div>

        {/* Text details */}
        <div className="pt-4 pb-2 flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-muted-fg font-semibold uppercase tracking-wider">
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {post.readTime} min read
                  </span>
                </>
              )}
            </div>

            <h3 className="text-base font-semibold text-foreground tracking-wide line-clamp-2 group-hover:text-gold-light transition-colors mt-0.5 leading-snug">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-xs text-muted-fg line-clamp-2 leading-relaxed mt-1">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:text-gold-light mt-4 transition-colors">
            <span>Read Article</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

      </Card>
    </Link>
  );
}
