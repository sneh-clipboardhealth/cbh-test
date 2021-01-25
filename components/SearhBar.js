import { useEffect, useState,useCallback } from "react";
import _ from "lodash";

export function SearchBar({ search, handleSearch }) {
  const [currentState, setCurrentState] = useState(search);
  useEffect(() => {
    setCurrentState(search);
  }, [search]);

  const delayedQuery = useCallback(
    _.debounce((q) => handleSearch(q), 300),
    []
  );
  function handleInputChange(e) {
    delayedQuery(e.target.value);
    setCurrentState(e.target.value);
  }
  return (
    <div className="m-1 p-1 w-auto">
      <input
        type="text"
        className="py-2 px-4 w-full"
        placeholder="Search for any job,title, keywords or company"
        value={currentState}
        onChange={handleInputChange}
      />
    </div>
  );
}
