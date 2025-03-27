function Header({ time }) {
  return (
    <header className="flex justify-between items-center p-5 font-(family-name:--sec-font) border-y-2 border-(--sec-light)">
      <div className="time">
        <div className="text-center text-2xl font-bold">{time.day}</div>
        <div>{time.date}</div>
      </div>
      <div className="title font-(family-name:--main-font) text-3xl">
        Latest Articles
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-(--sec-light)">Log In</div>
        <div className="bg-(--mid-light) font-semibold border-2 border-(--sec-light) py-2 px-5">
          Sign Up
        </div>
      </div>
    </header>
  );
}

export default Header;
