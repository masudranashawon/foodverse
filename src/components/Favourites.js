import Recipe from "./Recipe";

const Favourites = ({ savedItems }) => {
  return (
    <div className='favourites-section'>
      {savedItems.length === 0 ? (
        <p className='text-2xl text-center font-semibold text-rose-300 leading-normal py-8 lg:text-4xl'>
          Your favourite list is empty!
        </p>
      ) : (
        <p className='text-2xl text-center font-semibold text-rose-300 leading-normal py-8 lg:text-4xl'>
          Your favourite recipe{savedItems.length > 1 && "s"}!
        </p>
      )}

      <div className='favourite-items-container container mx-auto flex justify-center flex-wrap gap-10 py-8'>
        {savedItems.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
