import { useRef } from "react";

function SearchBar({ onSearch }) {
  const locationRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = locationRef.current.value.trim();
    if (location !== "") {
      onSearch(location);
      locationRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-white shadow-md rounded-md p-2"
    >
      <input
        type="text"
        placeholder="Search Place"
        ref={locationRef}
        required
        className="p-2 border rounded w-64 focus:outline-none"
      />
      <button
        type="submit"
        className="ml-2 px-4 bg-[#0F172A] hover:bg-[#1E293B] active:scale-95 text-white rounded"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;