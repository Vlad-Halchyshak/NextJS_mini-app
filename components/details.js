const img3 = require("../assets/Rectangle3.png");
const img4 = require("../assets/Line2.png");
const img5 = require("../assets/mail.png");
const img6 = require("../assets/phone.png");

export const DetailsBlock = () => {
  return (
    <>
      <div className="details">
        <img src={img3} />
        <img src={img4} />
      </div>
      <div className="details_block">
        <p>
          <img src={img5} />
          Ivanova@mail.ru
        </p>
        <p>
          <img src={img6} />
          Укажите номер телефона
        </p>
      </div>
    </>
  );
};
