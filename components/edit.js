import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import axios from "axios";
const img2 = require("../assets/image.png");
const img3 = require("../assets/Rectangle3.png");
const img4 = require("../assets/Line2.png");
const img5 = require("../assets/mail.png");
const img6 = require("../assets/phone.png");
const img7 = require("../assets/calendar.png");
const img8 = require("../assets/Linevertical.png");

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
            <button onClick={setEdit}>Редактировать</button>
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

const DetailsBlock = () => {
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export const ValidationTextFields = (e) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState("Имя не может быть пустым");
  const [emailError, setEmailError] = useState("Имеил не может быть пустым");
  const [phoneError, setPhoneError] = useState(
    "Номер телефона не может быть пустым"
  );

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
    }
  };
  const nameHandler = (e) => {
    setName(e.target.value);

    if (e.target.value.length <= 1) {
      setNameError("Вы неверно указали имя");
    } else {
      setNameError("");
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Вы неверно указали имейл");
    } else {
      setEmailError("");
    }
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length < 9) {
      setPhoneError("Вы неверно указали телефон");
    } else {
      setPhoneError("");
    }
  };
  const data = {
    name: name,
    email: email,
  };
  //const url = process.env.API
  const sendDataForm = async() => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", data, {
      headers: {
        "Content-Type": "application/json",
        "x-token-access": "random" 
      },
    })
    return (
      <>
        {
          response.data ?
            alert('hey bitch')
            : ''
        }
        
      </>
    )
  };

  

  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={formHandler}
    >
      <div className="Container">
        <div className="FormContainer">
          <img src={img7} />
          <img src={img2} />
          <img src={img6} />
          <img src={img8} />
          <img src={img8} />

          {nameDirty && nameError && (
            <div className={"errorName"}>{nameError}</div>
          )}
          <TextField
            onChange={(e) => nameHandler(e)}
            value={name}
            label="Фамилия и имя"
            placeholder="Укажите фамилию и имя"
            name="name"
            variant="outlined"
            onBlur={(e) => blurHandler(e)}
          />
          {emailDirty && emailError && (
            <div className={"errorEmail"}>{emailError}</div>
          )}
          <TextField
            onChange={(e) => emailHandler(e)}
            value={email}
            label="E-mail"
            name="email"
            placeholder="Ivanova@mail.ru"
            variant="outlined"
            onBlur={(e) => blurHandler(e)}
          />
          {phoneDirty && phoneError && (
            <div className={"errorPhone"}>{phoneError}</div>
          )}
          <TextField
            onChange={(e) => phoneHandler(e)}
            onBlur={(e) => blurHandler(e)}
            value={phone}
            name="phone"
            label="Номер телефона"
            placeholder="Укажите номер телефона"
            variant="outlined"
          />
        </div>
        <button onClick={sendDataForm}>Сохранить изменения</button>
      </div>
    </form>
  );
};
