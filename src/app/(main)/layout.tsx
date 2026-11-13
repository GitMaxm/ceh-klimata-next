import { THEME_INIT_SCRIPT } from '@/shared/ui/main';
import { Footer } from '@/widgets/main/footer';
import { NavBar } from '@/widgets/main/navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
