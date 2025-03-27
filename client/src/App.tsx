import { HashRouter as Router, Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { LoginContext } from "./context";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path={`/booking/:hotelID`} element={<BookingPage />} />
        <Route
          path="/login"
          element={
            <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
              <LoginPage />
            </LoginContext.Provider>
          }
        />

        <Route
          path="/employees/:employeeID"
          element={<EmployeePage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
