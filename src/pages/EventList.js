import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onRegister }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const keyword = query.trim().toLowerCase();
  const filtered = events.filter(({ name, registered, capacity }) => {
    const matchName = name.toLowerCase().includes(keyword);
    const isFull = registered >= capacity;
    const matchStatus =
      status === "all" || (status === "full" ? isFull : !isFull);
    return matchName && matchStatus;
  });

  return (
    <div>
      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        status={status}
        onStatusChange={handleStatusChange}
      />
      <p>{`Tìm thấy ${filtered.length} sự kiện`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <EventTable
          events={filtered}
          onDelete={onDelete}
          onRegister={onRegister}
        />
      )}
    </div>
  );
};

export default EventList;
