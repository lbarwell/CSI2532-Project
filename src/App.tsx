import HiltonImage from "./assets/hilton-montreal.avif";
import ListingView from "./components/ListingView";
import SearchView from "./components/SearchView";
import FilterView from "./components/FilterView";

function App() {
  const listingsSet = [
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
      imageSrc: HiltonImage,
      hotelName: "Hilton",
      cityName: "Montreal",
      stateName: "QC",
      rating: "4 stars",
      amenities: "Pool",
      price: 135,
    },
    {
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
    <div className="container" style={{ width: "65%", margin: "auto" }}>
      <div className="row">
        <div className="col-3">
          <FilterView></FilterView>
        </div>
        <div className="col">
          <SearchView />
          <ListingView listings={listingsSet} />
        </div>
      </div>
    </div>
  );
}

export default App;
