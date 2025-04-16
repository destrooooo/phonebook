import React from "react";

const PersonFilter = ({ search, setSearch }) => {
  const handleFilterChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <>
      <div>
        filter shown with <input value={search} onChange={handleFilterChange} />
      </div>
    </>
  );
};

export default PersonFilter;
