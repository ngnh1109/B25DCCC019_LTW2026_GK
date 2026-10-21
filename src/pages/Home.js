const Home = ({ events }) => {
  const totalRegistered = events.reduce((sum, { registered }) => sum + registered, 0);
  const fullCount = events.filter(({ registered, capacity }) => registered >= capacity).length;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p>Chào mừng bạn đến với trang quản lý sự kiện của CLB Lập trình!</p>
      <p>{`Tổng số sự kiện: ${events.length}`}</p>
      <p>{`Tổng số lượt đăng ký: ${totalRegistered}`}</p>
      <p>{`Số sự kiện đã đầy: ${fullCount}`}</p>
    </div>
  );
};

export default Home;
