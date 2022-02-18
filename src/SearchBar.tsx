import React, { useEffect, useState } from "react";

function SearchBar(props: any) {
  const { onSearchSubmit } = props;
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (term !== "") {
      onSearchSubmit(term);
    }
  }, [term, onSearchSubmit]);

  return (
    <div className="searchbar">
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search user by name. . ."
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
    </div>
  );
}

export { SearchBar };
