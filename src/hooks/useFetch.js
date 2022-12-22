import { useEffect, useState } from "react";

export const useFetch = (id) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRecipeItemData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        if (!res.ok)
          throw new Error("Something went wrong, please try again later!");
        const data = await res.json();
        setData(data?.data?.recipe);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    getRecipeItemData();
  }, []);

  return { data, loading, error };
};
