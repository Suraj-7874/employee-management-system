import Navigation from "./components/Navigation"
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import SearchEmp from "./pages/SearchEmp";
import AddEmployee from "./pages/AddEmployee";
import { Routes,Route } from "react-router-dom";

function App() {

  return (
    <>
    <Navigation/>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchEmp />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;