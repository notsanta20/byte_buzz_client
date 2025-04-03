import HeaderButton from "./HeaderButton";

function Header({ data, url, setAuth, darkTheme, setDarkTheme }) {
  const time = data.time;
  const html = document.querySelector(`html`);
  let title;
  if (url === `/login`) {
    title = `Log In`;
  } else if (url === `/signup`) {
    title = `Sign Up`;
  } else {
    title = `Latest Articles`;
  }

  function handleTheme() {
    if (darkTheme) {
      html.classList.remove(`dark`);
      setDarkTheme(false);
    } else {
      html.classList.add(`dark`);
      setDarkTheme(true);
    }
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
        <img
          src={darkTheme ? "/assets/half-moon.svg" : "/assets/sun-light.svg"}
          alt="theme icon"
          className="w-[18px] cursor-pointer"
          onClick={() => {
            handleTheme();
          }}
        />
        <HeaderButton auth={data.auth} setAuth={setAuth} />
      </div>
    </header>
  );
}

export default Header;
