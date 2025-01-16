import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import ContentHomepage from "./ContentHomepage";
import Navbar from "./Navbar/Navbar";
const Homepage = () => {
  return (
    <div className="d-flex w-100 flex-column  vh-100  h-100 ">
      <Navbar />

      <ContentHomepage />

      <Signup />
      <Login />
    </div>
  );
};

export default Homepage;
