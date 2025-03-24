import { HashRouter as Router, Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path={`/booking/:hotelID`} element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
