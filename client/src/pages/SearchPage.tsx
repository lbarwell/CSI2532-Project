import HiltonImage from "../assets/hilton-montreal.avif";
import ListingView from "../components/ListingView";
import SearchView from "../components/SearchView";
import FilterView from "../components/FilterView";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  // Placeholder values for listings
  const listingsSet = [
    {
      id: 1,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 2,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 3,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 4,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 5,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 6,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      id: 7,
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container" style={{ width: "80%", margin: "auto" }}>
        <SearchView />
        <div className="row">
          <div className="col-3" style={{ marginTop: "1em" }}>
            <FilterView />
          </div>
          <div className="col">
            <ListingView listings={listingsSet} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
