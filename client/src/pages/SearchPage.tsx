import ListingView from "../components/ListingView";
import SearchView from "../components/SearchView";
import FilterView from "../components/FilterView";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ width: "80%", margin: "auto" }}>
        <SearchView />
        <div className="row">
          <div className="col-3">
            <FilterView />
          </div>
          <div className="col">
            <ListingView />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
