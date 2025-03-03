import Nav from "./components/Nav";
import SubmitRecCta from "./sections/SubmitRecCta";
import FindWhatYouNeed from "./sections/FindWhatYouNeed";
import Hero from "./sections/Hero";
import ListingPreviews from "./sections/ListingPreviews";
import WhyBestRgv from "./sections/WhyBestRgv";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <main className=''>
        <Hero />
        <FindWhatYouNeed />
        <ListingPreviews heading={'Explore by City'} redirect_link={'/cities'} />
        <ListingPreviews heading={'Featured Discoveries'} redirect_link={'/featured'} />
        <WhyBestRgv />
        <SubmitRecCta />
      </main>
      <Footer />
    </div>
  );
}
