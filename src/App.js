import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import RecipeItem from "./components/RecipeItem";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchField = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    setSearchQuery("");
    searchField.current.blur();
    setRecipes([]);
  };

  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`
      );
      if (!res.ok) throw new Error("No recipe found!");
      const data = await res.json();
      setRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className='app min-h-screen bg-rose-50 text-gray-600 text-lg'>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchField={searchField}
          searchHandler={searchHandler}
        />
        <Routes>
          <Route
            path='/'
            element={<Home recipes={recipes} loading={loading} error={error} />}
          />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/recipe-item/:id' element={<RecipeItem />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
