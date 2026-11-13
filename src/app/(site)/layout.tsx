import { ContactBar } from '@/widgets/contact-bar';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <ContactBar />
    </>
  );
}
