const BUILD_TAG = "wn-1726";
/* eslint-disable import/first */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

const STORAGE_KEY = "gk_events";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Chỉ cho phép ghi localStorage sau khi đã có dữ liệu hợp lệ
  const loadedRef = useRef(false);

  // Mounting: đọc localStorage hoặc gọi API
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          loadedRef.current = true;
          setEvents(parsed);
          setLoading(false);
          return;
        }
      } catch (err) {
        // dữ liệu lưu bị hỏng -> gọi API
      }
    }

    const controller = new AbortController();
    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        loadedRef.current = true;
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // Unmounting: bỏ qua
        setError("Không tải được dữ liệu");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Updating: lưu dữ liệu
  useEffect(() => {
    if (!loading && loadedRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, loading]);

  const addEvent = (data) =>
    setEvents((prev) => {
      const maxId = prev.reduce((max, { id }) => Math.max(max, id), 0);
      return [...prev, { ...data, id: maxId + 1, registered: 0 }];
    });

  const deleteEvent = (id) =>
    setEvents((prev) => prev.filter((ev) => ev.id !== id));

  const registerEvent = (id) =>
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id && ev.registered < ev.capacity
          ? { ...ev, registered: ev.registered + 1 }
          : ev
      )
    );

  const guard = (page) => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    return page;
  };

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={guard(<Home events={events} />)} />
          <Route
            path="events"
            element={guard(
              <EventList
                events={events}
                onDelete={deleteEvent}
                onRegister={registerEvent}
              />
            )}
          />
          <Route
            path="events/new"
            element={guard(<AddEvent onAdd={addEvent} />)}
          />
          <Route
            path="events/:id"
            element={guard(<EventDetail events={events} />)}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
