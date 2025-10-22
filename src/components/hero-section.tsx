
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/images/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/locales';

export function HeroSection() {
  const { t } = useTranslation();
  const heroImages = PlaceHolderImages.filter((p) =>
    p.id.startsWith('hero-bali-')
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % heroImages.length
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, heroImages.length]);

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {heroImages.map((image, index) => (
        <Image
          key={image.id}
          src={image.imageUrl}
          alt={image.description}
          fill
          className={cn(
            'object-cover transition-opacity duration-1000',
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          priority={index === 0}
          data-ai-hint={image.imageHint}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {t('yourPersonalDriver')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
          {t('yourPersonalDriverDesc')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => handleScrollTo('contact-us')}
          >
            {t('contactUs')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => handleScrollto('about-us')}
          >
            {t('aboutUs')}
          </Button>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => handleScrollTo('cars-section')}
          >
            {t('bookNow')}
          </Button>
        </div>
      </div>
    </section>
  );
}
