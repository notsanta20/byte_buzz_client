import HeaderButtons from "./HeaderButton";

function Header({ data, url }) {
  const time = data.time;

  let title;
  if (url === `/login`) {
    title = `Log In`;
  } else if (url === `/signup`) {
    title = `Sign Up`;
  } else {
    title = `Latest Articles`;
  }

  return (
    <header className="flex justify-between items-center p-5 font-(family-name:--sec-font) border-y-2 border-(--sec-light)">
      <div className="time">
        <div className="text-center text-2xl font-bold">
          {typeof time === `undefined` ? `Loading` : time.day}
        </div>
        <div>{typeof time === `undefined` ? `Loading` : time.date}</div>
      </div>
      <div className="title font-(family-name:--main-font) text-3xl">
        {title}
      </div>
      <div className="flex gap-3 items-center">
        <HeaderButtons auth={data.auth} />
      </div>
    </header>
  );
}

export default Header;
