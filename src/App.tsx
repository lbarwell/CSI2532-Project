import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/employees" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
