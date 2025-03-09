import HiltonImage from "../assets/hilton-montreal.avif";
import ListingView from "../components/ListingView";
import SearchView from "../components/SearchView";
import FilterView from "../components/FilterView";

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
    <div className="container" style={{ width: "80%", margin: "auto" }}>
      <div className="row">
        <div
          className="col-3"
          style={{ marginTop: "1em", borderRight: "3px solid" }}
        >
          <FilterView />
        </div>
        <div className="col">
          <SearchView />
          <ListingView listings={listingsSet} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
