import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
    <h1 className="text-9xl font-bold text-indigo-200">404</h1>
    <p className="text-2xl font-semibold mt-4 text-slate-700">Oops! Page not found.</p>
    <p className="text-slate-500 mt-2">The harness you are looking for is in another kennel.</p>
    <Link to="/" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all">
      Take me Home 🏠
    </Link>
  </div>
);
export default NotFound;