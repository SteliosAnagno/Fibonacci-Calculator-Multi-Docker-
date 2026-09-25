import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchData = async () => {
    try {
      const [valuesRes, seenIndexesRes] = await Promise.all([
        axios.get("/api/values/current"),
        axios.get("/api/values/all")
      ]);

      setValues(valuesRes.data || {});
      setSeenIndexes(seenIndexesRes.data || []);
    } catch (err) {
      console.log("Error during data retrieve", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(event) {
    setIndex(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post("/api/values", {
        index: index
      });

      setIndex("");
      // Ξανακαλούμε το fetchData για να ενημερωθούν άμεσα τα lists
      fetchData();
    } catch (err) {
      console.log("Error during submit", err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input 
          value={index} 
          onChange={handleChange} 
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {Array.isArray(seenIndexes) &&
        seenIndexes.map(({ number }) => number).join(", ")}

      <h3>Calculated Values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key}, I calculated {values[key]}
        </div>
      ))}
    </div>
  );
};

export default Fib;