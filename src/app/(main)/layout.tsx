import { Footer } from '@/widgets/main/footer';
import { NavBar } from '@/widgets/main/navbar';

// Применяем сохранённую тему до гидрации, чтобы не было мигания
const THEME_INIT_SCRIPT = `(function () {
  try {
    var raw = localStorage.getItem('darkMode');
    var theme = raw ? JSON.parse(raw) : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  } catch (e) {}
})();`;

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
