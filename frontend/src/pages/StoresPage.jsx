import { useEffect, useState } from "react";
import api from "../services/api";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async (searchValue = "") => {
    try {
      const response = await api.get(
        `/stores?search=${searchValue}`
      );

      setStores(response.data.data);

      const initialRatings = {};

      response.data.data.forEach((store) => {
        initialRatings[store.id] =
          store.user_submitted_rating || "";
      });

      setRatings(initialRatings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchStores(search);
  };

  const handleRatingChange = (
    storeId,
    value
  ) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  const handleRatingSubmit = async (
    store
  ) => {
    try {
      const selectedRating =
        Number(ratings[store.id]);

      if (!selectedRating) {
        alert("Please select a rating");
        return;
      }

      if (
        store.user_submitted_rating
      ) {
        await api.put(
          `/ratings/${store.id}`,
          {
            rating: selectedRating,
          }
        );

        alert("Rating updated");
      } else {
        await api.post(
          `/ratings/${store.id}`,
          {
            rating: selectedRating,
          }
        );

        alert("Rating submitted");
      }

      fetchStores(search);
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h1>Stores</h1>

      <div>
        <input
          type="text"
          placeholder="Search stores"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>

              <td>
                {store.address}
              </td>

              <td>
                {
                  store.overall_rating
                }
              </td>

              <td>
                <select
                  value={
                    ratings[
                      store.id
                    ] || ""
                  }
                  onChange={(e) =>
                    handleRatingChange(
                      store.id,
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select
                  </option>

                  {[1, 2, 3, 4, 5].map(
                    (rating) => (
                      <option
                        key={rating}
                        value={
                          rating
                        }
                      >
                        {rating}
                      </option>
                    )
                  )}
                </select>
              </td>

              <td>
                <button
                  onClick={() =>
                    handleRatingSubmit(
                      store
                    )
                  }
                >
                  {store.user_submitted_rating
                    ? "Update Rating"
                    : "Submit Rating"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresPage;