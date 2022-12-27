import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";
import Favourites from "./components/Favourites";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

const App = () => {
  //This function for smooth scrolling
  useSmoothScroll();

  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });

  const searchField = useRef(null);

  const navigator = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    searchField.current.blur();
    navigator("/");
    setSearchQuery("");
    setError("");
    setRecipes([]);
  };

  //Fetching all recipe data from API
  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      if (data.results === 0) throw new Error("No recipe found!");
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //Checking and set local storage data
  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existedData = localData?.some((item) => item.id === data.id);

    if (!existedData) {
      setSavedItems([...savedItems, data]);
    } else {
      const filteredData = localData.filter((item) => item.id !== data.id);
      setSavedItems(filteredData);
    }
  };

  //Save to Favorites
  const favouriteHadler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data?.data?.recipe));

    navigator("/favourites");
  };

  //Showing Local storage data
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
  }, [savedItems]);

  return (
    <>
      <div className='app min-h-screen bg-rose-50 text-gray-600 text-lg'>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchField={searchField}
          searchHandler={searchHandler}
          savedItems={savedItems}
        />
        <Routes>
          <Route
            path='/'
            element={<Home recipes={recipes} loading={loading} error={error} />}
          />
          <Route
            path='/favourites'
            element={<Favourites savedItems={savedItems} />}
          />
          <Route
            path='/recipe-item/:id'
            element={
              <RecipeItem
                favouriteHadler={favouriteHadler}
                savedItems={savedItems}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
