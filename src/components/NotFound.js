import { Link } from "react-router-dom";
import FryingPan from "./FryingPan";

const NotFound = () => {
  return (
    <div className='not-found-section container mx-auto py-8 flex flex-col items-center gap-5'>
      <p className='text-2xl lg:text-4xl font-semibold text-rose-300 text-center leading-normal'>
        Page not found!
      </p>
      <Link
        className='bg-gradient-to-br from-sky-300 to-sky-500 text-sky-50 p-3 px-8 rounded-full uppercase shadow-lg shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:from-sky-400 hover:to-sky-600 duration-300 outline-none text-center'
        to='/'
      >
        Go Home
      </Link>
      <FryingPan />
    </div>
  );
};

export default NotFound;
