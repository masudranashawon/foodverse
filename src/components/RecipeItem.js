import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const RecipeItem = ({ favouriteHadler, savedItems }) => {
  const [itemSavedStatus, setItemSavedStatus] = useState(null);
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(id);

  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) return duration + "h";

    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splitterMinutes = "." + splittedDuration[1];
      const minutes = +splitterMinutes * 60 + "min";

      return hour + minutes;
    }
  };

  useEffect(() => {
    if (!recipe) return;
    setItemSavedStatus(savedItems.some((item) => item.id === recipe.id));
  }, [recipe]);

  return (
    <div className='recipe-item-section container mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-0'>
      <div className='recipe-img-sec flex flex-col gap-5'>
        <div className='img overflow-hidden rounded-xl border shadow-md lg:h-96 group'>
          <img
            className='w-full h-full object-cover group-hover:scale-105 duration-300'
            src={recipe?.image_url}
            alt={recipe?.title}
          />
        </div>
      </div>
      <div className='recipe-details-sec flex flex-col gap-5 row-start-1 lg:row-auto'>
        <span className='publisher text-sky-400 font-semibold uppercase tracking-widest'>
          {recipe?.publisher}
        </span>
        <h2 className='title capitalize text-4xl lg:text-6xl'>
          {recipe?.title}
        </h2>
        <div className='servings-cooking-time flex flex-col justify-between gap-5 lg:flex-row font-semibold tracking-widest text-rose-500 uppercase'>
          <div className='servings'>Servings (People): {recipe?.servings}</div>
          <div className='cooking-time'>
            Cooking time:{" "}
            {recipe?.cooking_time < 60
              ? String(recipe?.cooking_time) + "min"
              : durationCalc(recipe?.cooking_time / 60)}
          </div>
        </div>
        <div className='buttons flex flex-col gap-5 items-start lg:flex-row lg:justify-center'>
          <button
            onClick={() => favouriteHadler(recipe?.id)}
            className={`bg-gradient-to-br p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block shadow-md hover:shadow-lg duration-300 outline-none text-center ${
              itemSavedStatus
                ? "from-rose-200 to-rose-300 text-rose-500 shadow-rose-200 hover:shadow-rose-300 hover:from-rose-400 hover:to-rose-500 hover:text-rose-50"
                : "from-green-400 to-green-600 text-green-50 shadow-green-200 hover:shadow-green-300"
            }`}
          >
            {itemSavedStatus
              ? "- Remove from favourites"
              : "+ Save as favourites"}
          </button>
          <a
            className='bg-gradient-to-br from-sky-400 to-sky-600 text-sky-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 duration-300 outline-none text-center'
            href={recipe?.source_url}
            target='_blank'
            rel='noreferrer'
          >
            Get Directions
          </a>
          <Link
            to='/'
            className='bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300 outline-none text-center'
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
