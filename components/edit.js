import React from "react";
import { DetailsBlock } from "./details";
import { ValidationTextFields } from "./forms";

const img2 = require("../assets/image.png");

export const EditInfo = () => {
  const [edit, setEdit] = React.useState(false);

  return (
    <div className="info_block">
      <img src={img2} />
      <div className="name_options">
        <p>Ивановна Анна Михайловна</p>
        {edit ? (
          <p>
            <button onClick={() => setEdit(false)}>ЗАКРЫТЬ</button>
          </p>
        ) : (
          <p>
            <button onClick={setEdit}>РЕДАКТИРОВАТЬ</button>
          </p>
        )}
      </div>
      {edit ? (
        <ValidationTextFields
          goToEditMode={() => {
            setEdit(true);
          }}
        />
      ) : (
        <DetailsBlock
          goToEditMode={() => {
            setEdit(false);
          }}
        />
      )}
    </div>
  );
};
