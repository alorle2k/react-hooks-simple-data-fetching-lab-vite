// create your App component here

import { useState, useEffect } from "react";

function App() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDog = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dog image");
      }

      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog:", error);
      setDogImage("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div>
      <h1>Random Dog Generator 🐶</h1>

      {loading ? (
        <p>Loading...</p>
      ) : dogImage ? (
        <img
          src={dogImage}
          alt="A random dog"
          width="400"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <p>Couldn't load a dog. Please try again!</p>
      )}

      <br />

      <button onClick={fetchDog}>
        Get Another Dog!
      </button>
    </div>
  );
}

export default App;