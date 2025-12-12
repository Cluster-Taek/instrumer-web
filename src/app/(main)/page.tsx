import HomeSolutionSection from './components/home-solution-section';
import MainSection from './components/main-section';
import Footer from '@/components/layout/footer';

const Home = () => {
  return (
    <main className="flex w-full flex-col gap-80 items-center">
      <MainSection />
      <HomeSolutionSection />
      <Footer />
    </main>
  );
};

export default Home;
