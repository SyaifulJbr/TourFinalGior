
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Briefcase, Star, StarHalf } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Car, CarFeature, CarType } from '@/lib/types';
import { PlaceHolderImages } from '@/images/data';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation, type TranslationKeys } from '@/lib/locales';

interface CarCardProps {
  car: Car;
}

const StarRating = ({ rating, reviewCount }: { rating: number | null, reviewCount: number | null }) => {
  if (rating === null) {
    return <Skeleton className="h-4 w-24" />;
  }
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
       <span className="ml-1 text-sm text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
      {reviewCount !== null ? (
         <span className="text-sm text-muted-foreground">
          ({reviewCount})
        </span>
      ) : (
        <Skeleton className="h-4 w-10" />
      )}
    </div>
  );
};


export function CarCard({ car }: CarCardProps) {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Generate random review count and rating on the client side
    setReviewCount(Math.floor(Math.random() * (400 - 200 + 1)) + 200);
    const randomRating = Math.round((Math.random() * (5.0 - 4.5) + 4.5) * 10) / 10;
    setRating(randomRating);
  }, []);

  const carImage = PlaceHolderImages.find((p) => p.id === car.imageId);
  const message = encodeURIComponent(
    `Hello, I would like to book the ${car.name} car.`
  );
  const whatsappUrl = `https://wa.me/6285854965523?text=${message}`;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const toCamelCase = (str: string): TranslationKeys => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '') as TranslationKeys;
  }

  const translatedFeatures = car.features.map(feature => t(toCamelCase(feature))).join(', ');
  const carTypeKey = toCamelCase(car.type);


  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {carImage ? (
            <Image
              src={carImage.imageUrl}
              alt={car.name}
              fill
              className="object-cover"
              data-ai-hint={carImage.imageHint}
            />
          ) : (
            <div className="h-full w-full bg-secondary"></div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">
              {t(carTypeKey)}
            </Badge>
            <StarRating rating={rating} reviewCount={reviewCount} />
        </div>
        <CardTitle className="mb-2">{car.name}</CardTitle>
        <div className="flex space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{car.passengers}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4" />
            <span>{car.luggage}</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {translatedFeatures}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/20 p-6">
        <div>
          <div>
            {isMounted ? (
                <span className="text-2xl font-bold">
                  {formatCurrency(car.pricePerDay)}
                </span>
              ) : (
                <Skeleton className="h-8 w-28" />
              )}
            <span className="text-sm text-muted-foreground">{t('per10Hours')}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('priceIncludes')}
          </p>
        </div>
        <Button
          asChild
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link href={whatsappUrl} target="_blank">
            {t('bookNow')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
