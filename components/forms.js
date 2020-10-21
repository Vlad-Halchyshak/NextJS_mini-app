import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "axios";

const img2 = require("../assets/image.png");
const img6 = require("../assets/phone.png");
const img7 = require("../assets/calendar.png");
const img8 = require("../assets/Linevertical.png");

export const ValidationTextFields = (e) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

  const useStyle = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 600,
      height: 318,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      marginLeft: 350,
      marginTop: 250,
    },
  }));
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

  const formHandler = (e) => {
    e.preventDefault();
    }

  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  function SimpleModal() {
    const classes = useStyle();

    const closeModal = () => {
      setOpen(false);
    };
    const closeSecondModal = () => {
      setOpenSecondModal(false);
      setOpen(false);
    };
    const body = (
      <div className={classes.paper}>
        <div className="modal">
          <h2 id="simple-modal-title">Сохранить изменения?</h2>
          <button
            onClick={() => SaveDataToLocalStorage(setOpenSecondModal(true))}
          
          >
            Сохранить
          </button>
          <button onClick={closeModal}>Не сохранять</button>
        </div>
      </div>
    );
    const secondModalBody = (
      <div className={classes.paper}>
        <div className="modal">
          <h2 id="simple-modal-title">Данные успешно сохранены</h2>
          <button onClick={closeSecondModal}>Хорошо</button>
        </div>
      </div>
    );

    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Modal
          open={openSecondModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {secondModalBody}
        </Modal>
      </div>
    );
  }
  // it doesn't work when you clone repo :(
  //const url = process.env.NEXT_PUBLIC_URL;

  const data = {
    name: name,
    email: email,
    phone: phone,
    
  };
  const SendDataForm = async () => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token-access": "random",
        },
      }
    );
  }
  

  const SaveDataToLocalStorage = () => {
    localStorage.setItem("MyData", JSON.stringify(data)) 
     }
    
  

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
        <button onClick={() => SendDataForm(setOpen(true))}>
          Сохранить изменения
        </button>
        <SimpleModal />
      </div>
    </form>
  );
};
