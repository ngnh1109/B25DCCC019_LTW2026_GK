const FilterBar = ({ query, onQueryChange, status, onStatusChange }) => (
  <div className="filter-bar">
    <div>
      <label htmlFor="search">Tìm kiếm</label>{" "}
      <input
        id="search"
        type="text"
        value={query}
        onChange={onQueryChange}
      />
    </div>
    <div>
      <label htmlFor="status">Tình trạng</label>{" "}
      <select id="status" value={status} onChange={onStatusChange}>
        <option value="all">Tất cả</option>
        <option value="available">Còn chỗ</option>
        <option value="full">Đã đầy</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
