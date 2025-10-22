
'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/hero-section';
import { CarGrid } from '@/app/cars/components/car-grid';
import { cars as allCars } from '@/cars/data';
import { useTranslation } from '@/lib/locales';

function CarsSection() {
  const { t } = useTranslation();
  return (
    <div id="cars-section" className="container mx-auto scroll-mt-20 py-8">
      <div className="space-y-8">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t('availableCars')}
        </h2>
        <CarGrid cars={allCars} />
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading...</div>}>
        <CarsSection />
      </Suspense>
    </>
  );
}
