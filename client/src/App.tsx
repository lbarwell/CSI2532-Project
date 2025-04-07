import { HashRouter as Router, Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path={`/booking/:hotelID`} element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employees/:employeeID" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
