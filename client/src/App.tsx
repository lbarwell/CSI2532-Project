import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import BookingPage from "./pages/BookingPage";
import { BookingContext } from "./context";
import { useState } from "react";

function App() {
  const [hotelID, setHotelID] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/search"
          element={
            <BookingContext.Provider value={{ hotelID, setHotelID }}>
              <SearchPage />
            </BookingContext.Provider>
          }
        />
        <Route path="/employees" element={<EmployeePage />} />
        <Route
          path={`/booking/${hotelID}`}
          element={<BookingPage propHotelID={hotelID} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
