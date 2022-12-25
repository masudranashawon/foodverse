import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const RecipeItem = () => {
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(id);

  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) return duration + "h";

    if (String(duration).includes("."))
      return String(duration).replace(".", "h") + "min";
  };

  console.log(recipe);

  return (
    <div className='recipe-item-section container mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-0'>
      <div className='recipe-img-sec flex flex-col gap-5'>
        <div className='img flex justify-center items-center overflow-hidden rounded-xl lg:h-96 shadow-xl group'>
          <img
            className='w-full lg:h-96 block group-hover:scale-105 duration-300'
            src={recipe?.image_url}
            alt={recipe?.title}
          />
        </div>
      </div>
      <div className='recipe-details-sec flex flex-col gap-5 row-start-1 lg:row-auto'>
        <span className='publisher text-sky-400 font-semibold uppercase tracking-wider'>
          {recipe?.publisher}
        </span>
        <h2 className='title capitalize text-4xl lg:text-6xl'>
          {recipe?.title}
        </h2>
        <div className='servings-cooking-time flex flex-col justify-between gap-3 lg:flex-row font-semibold tracking-wider text-orange-500 uppercase'>
          <div className='servings'>Servings (People): {recipe?.servings}</div>
          <div className='cooking-time'>
            Cooking time:{" "}
            {recipe?.cooking_time < 60
              ? String(recipe?.cooking_time) + "min"
              : durationCalc(recipe?.cooking_time / 60)}
          </div>
        </div>
        <div className='buttons flex flex-col gap-3 items-start lg:flex-row lg:justify-center'>
          <button className='bg-green-500 text-green-50 p-3 px-8 rounded-full outline-none hover:bg-green-600 shadow-lg shadow-green-200 hover:shadow-green-300 uppercase text-center duration-300'>
            + Save as favourite
          </button>
          <a
            className='bg-violet-500 text-violet-50 p-3 px-8 rounded-full outline-none hover:bg-violet-600 shadow-lg shadow-violet-200 hover:shadow-violet-300 uppercase text-center duration-300'
            href={recipe?.source_url}
            target='_blank'
            rel='noreferrer'
          >
            Get Directions
          </a>
          <Link
            to='/'
            className='bg-rose-500 text-rose-50 p-3 px-8 rounded-full outline-none hover:bg-rose-600 shadow-lg shadow-rose-200 hover:shadow-rose-300 uppercase text-center duration-300'
          >
            Go Home
          </Link>
        </div>
      </div>
      <div className='recipe-ingredients-sec col-span-full'>
        <span className='ing-title text-2xl lg:text-4xl font-medium inline-block mb-5'>
          Ingredients:
        </span>
        <hr className='border-rose-100' />
        <ul className='mt-5'>
          {recipe?.ingredients?.map((ing, i) => (
            <li className='leading-loose' key={i}>
              ✔ {ing.quantity}
              {ing.unit} {ing.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeItem;
