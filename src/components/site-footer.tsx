
'use client';

import { Phone, Instagram, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/locales';

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/40 bg-muted/20 text-foreground">
      <div className="container mx-auto grid scroll-mt-20 grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div id="about-us" className="md:col-span-1">
          <h3 className="mb-4 text-lg font-semibold">{t('aboutUs')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('aboutUsDesc')}
          </p>
        </div>
        <div id="contact-us" className="scroll-mt-20">
          <h3 className="mb-4 text-lg font-semibold">{t('contactUs')}</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <Link
              href="https://wa.me/6285854965523"
              target="_blank"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              <span>+62 858-5496-5523 (WhatsApp)</span>
            </Link>
            <Link
              href="https://www.instagram.com/gior.malik"
              target="_blank"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
              <span>@gior.malik</span>
            </Link>
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
              <span>
                Kelan abian, Jl. Batur Sari Gg. Garuda Lingk, Tuban, Kec. Kuta,
                Kabupaten Badung, Bali 80361
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d492.9141009999743!2d115.17750430713947!3d-8.756610604233083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2451b862fc66f%3A0x84db67cd9ab7ae96!2sGarasi%20Unit%20Kecil%20Adhi%20Trans!5e0!3m2!1sid!2sid!4v1761064808936!5m2!1sid!2sid"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="border-t border-border/40 py-6">
        <div className="container flex items-center justify-center">
          <p className="text-balance text-center text-sm text-muted-foreground">
            © 2021 GIOR BALI TOUR. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
