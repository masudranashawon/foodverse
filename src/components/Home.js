import FryingPan from "./FryingPan";
import Recipe from "./Recipe";
const Home = ({ recipes, loading, error }) => {
  return (
    <div className='home container mx-auto py-8 flex flex-wrap gap-10 justify-center'>
      {!loading && !error && recipes.length === 0 ? (
        <div>
          <p className='text-2xl font-semibold  text-rose-300 lg:text-4xl text-center leading-normal'>
            Nothing to show, please search something!
          </p>
          <FryingPan />
        </div>
      ) : null}

      {loading && <p className='text-2xl'>{error ? error : "Loading..."}</p>}
      {recipes?.length > 0 &&
        recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
    </div>
  );
};

export default Home;
