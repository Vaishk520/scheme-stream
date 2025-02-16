import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar"; 
import Home from "./pages/home/Home";
import Applications from "./pages/applications/Applications";
import Grievances from "./pages/grievances/Grievances";
import User from "./pages/user/User";
import Category from "./pages/home/CategoryPage";
import SchemeDetails from "./pages/home/SchemeDetails";

function App() {
  //  Dummy data
  const [user, setUser] = useState({
    name: "John Doe",
    picture: "https://randomuser.me/api/portraits/men/45.jpg", 
  });

  return (
    <Router>
      <Navbar user={user} />  {/* Passed user data to Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/scheme/:schemeId" element={<SchemeDetails />} />

        <Route path="/applications" element={<Applications />} />
        <Route path="/grievances" element={<Grievances />} />

        <Route path="/user" element={< User />} /> 
      </Routes>
    </Router>
  );
}

export default App;
