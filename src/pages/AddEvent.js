import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !date || capacity === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const capacityNumber = Number(capacity);
    if (
      !Number.isInteger(capacityNumber) ||
      capacityNumber < 10 ||
      capacityNumber > 1000
    ) {
      setError("Sức chứa phải từ 10 đến 1000");
      return;
    }

    onAdd({
      name: name.trim(),
      location: location.trim(),
      date,
      capacity: capacityNumber,
    });
    navigate("/events", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Tên sự kiện</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="location">Địa điểm</label>
        <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="date">Ngày diễn ra</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="capacity">Sức chứa</label>
        <input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <button type="submit">Thêm</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddEvent;
