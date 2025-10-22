
'use client';

import Link from 'next/link';
import { Car, Menu, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation, languages } from '@/lib/locales';

export function SiteHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t, setLanguage, language } = useTranslation();

  const handleScrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSheetOpen(false);
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
    const commonClass = isMobile ? 'w-full text-left justify-start' : '';
    const variant = isMobile ? 'ghost' : 'link';

    return (
      <>
        <Button
          variant={variant}
          className={commonClass}
          onClick={() => handleScrollTo('home')}
        >
          {t('home')}
        </Button>
        <Button
          variant={variant}
          className={commonClass}
          onClick={() => handleScrollTo('about-us')}
        >
          {t('about')}
        </Button>
        <Button
          variant={variant}
          className={commonClass}
          onClick={() => handleScrollTo('contact-us')}
        >
          {t('contact')}
        </Button>
        <Button
          className={cn(
            commonClass,
            isMobile ? '' : 'bg-accent text-accent-foreground hover:bg-accent/90',
            isMobile && 'bg-accent text-accent-foreground hover:bg-accent/90'
          )}
          onClick={() => handleScrollTo('cars-section')}
        >
          {t('bookNow')}
        </Button>
      </>
    );
  };

  const LanguageSwitcher = () => {
    const selectedLanguageDetails = languages[language];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span className="text-xl">{selectedLanguageDetails.flag}</span>
            <span className="hidden md:inline">{selectedLanguageDetails.name}</span>
            <ChevronDown className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(languages).map(([langCode, langDetails]) => (
            <DropdownMenuItem
              key={langCode}
              onClick={() => setLanguage(langCode as 'en' | 'id' | 'zh' | 'ko' | 'fr')}
              className={cn(
                'flex items-center gap-2'
              )}
            >
              <span className="text-xl">{langDetails.flag}</span>
              <span>{langDetails.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block tracking-tighter">
              <span className="text-primary">GIOR</span>
              <span className="ml-1 font-normal text-foreground">BALI TOUR</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden items-center space-x-2 md:flex">
            <NavLinks />
          </nav>
          <LanguageSwitcher />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4">
                <NavLinks isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
