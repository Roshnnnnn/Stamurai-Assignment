import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to this Web App</h1>
      <p className="text-lg mb-4">
        Assignment given by Stamurai. I have put in my 100% effort,{" "}
      </p>
      <p className="text-lg mb-8">and I am eager to join this organization. </p>
      <Link
        to="/cities"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go to Main Page
      </Link>
    </div>
  );
};

export default Home;
