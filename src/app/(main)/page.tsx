import { About } from '@/widgets/main/about';
import { Header } from '@/widgets/main/header';
import { PreviewProjects } from '@/widgets/main/preview-projects';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="section">
        <div className="container">
          <About />
          <PreviewProjects />
        </div>
      </main>
    </>
  );
};

export default HomePage;
