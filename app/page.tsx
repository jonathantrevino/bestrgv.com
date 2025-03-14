import Nav from "./components/Nav";
import SubmitRecCta from "./sections/SubmitRecCta";
import FindWhatYouNeed from "./sections/FindWhatYouNeed";
import Hero from "./sections/Hero";
import ListingPreviews from "./sections/ListingPreviews";
import WhyBestRgv from "./sections/WhyBestRgv";
import Footer from "./components/Footer";
import { CITY_DATA } from "./lib/constants";
import { CityPreview } from "./components/CityPreview";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <main className=''>
        <Hero />
        <FindWhatYouNeed />
        <ListingPreviews heading={'Explore by City'} redirect_link={'/cities'} >
          <div className='grid grid-cols-4 gap-5'>
            {Object.entries(CITY_DATA).map(([city_key, city_data], index) =>
              <CityPreview key={index} title={city_data.title} image_url={city_data.image_url} alt={city_data.alt} redirect_url={city_data.redirect_url} />
            )}
          </div>
        </ListingPreviews>
        {/*<ListingPreviews heading={'Featured Discoveries'} redirect_link={'/featured'}>
          temp
        </ListingPreviews>*/}
        <WhyBestRgv />
        <SubmitRecCta />
      </main>
      <Footer />
    </div>
  );
}
