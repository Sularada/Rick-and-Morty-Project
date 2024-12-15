import React from "react";

const FilterControls = ({
  searchName,
  setSearchName,
  filters,
  setFilters,
  uniqueValues,
  applyFilters,
  clearFilters,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="filters">
      {/* Arama inputu */}
      <input
        className="search"
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <div className="selection">
        {/* Durum seçeneği */}
        <div className="filter-cont">
          <label className="filter-label">Status: </label>
          <select
            className="filter"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueValues("status").map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Tür seçeneği */}
        <div className="filter-cont">
          <label className="filter-label">Species: </label>
          <select
            className="filter"
            name="species"
            value={filters.species}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueValues("species").map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        {/* Köken seçeneği */}
        <div className="filter-cont">
          <label className="filter-label">Origin: </label>
          <select
            className="filter"
            name="origin"
            value={filters.origin}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueValues("origin").map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>

        {/* Konum seçeneği */}
        <div className="filter-cont">
          <label className="filter-label">Location: </label>
          <select
            className="filter"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueValues("location").map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Filtreleme butonları */}
      <div className="btns">
        <button className="btn" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Sayfa başına satır sayısı */}
      <div className="rows-per-page">
        <label className="filter-label">Rows per page: </label>
        <input
          type="number"
          value={rowsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              setRowsPerPage(value); // Sadece pozitif değerler kabul edilir
            }
          }}
          min="1" // Minimum 1 öğe gösterecek
        />
      </div>
    </div>
  );
};

export default FilterControls;
