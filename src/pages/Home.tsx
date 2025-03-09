import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={"/search"}>Search</Link>
    </>
  );
};

export default Home;
