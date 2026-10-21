import { useNavigate, useParams } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((ev) => ev.id === Number(id));

  const backButton = (
    <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
  );

  if (!event) {
    return (
      <div>
        <p>Không tìm thấy sự kiện</p>
        {backButton}
      </div>
    );
  }

  const { name, location, date, capacity, registered } = event;

  return (
    <div>
      <p>{`Tên sự kiện: ${name}`}</p>
      <p>{`Địa điểm: ${location}`}</p>
      <p>{`Ngày: ${date}`}</p>
      <p>{`Số chỗ: ${registered}/${capacity}`}</p>
      <Countdown date={date} />
      {backButton}
    </div>
  );
};

export default EventDetail;
