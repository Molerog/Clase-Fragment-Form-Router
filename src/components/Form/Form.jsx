import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

export const UserForm = () => {
  let navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState({
    userName: "",
    email: "",
  });

  const initialState = {
    userName: "",
    email: "",
  };

  const clearState = () => {
    setData({ ...initialState });
  };

  //Es más aconsejable hacer la validación dentro de un useEffect que esté atento a los cambios del estado, en este caso, de data.
  useEffect(() => {

    if (data.userName.length < 3) {
      setMessage("Name must be at least 3 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  }, [data]);

  const handleInputChange = (event) => {
    /*Aquí funciona pero no es tan preciso, al borrar, el evento onChange NO detecta los cambios; además hay que añadir un +1 al .length para compensar el primer valor inicial que es 0*/
     
    // if (data.userName.length +1 < 3) {
    //     setMessage("Name must be at least 3 characters");
    //     setBtnDisabled(true);
    //   } else {
    //     setMessage(null);
    //     setBtnDisabled(false);
    //   }
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending data..." + data.userName + " " + data.email);
    clearState();
    setTimeout(() => {
        navigate('/')
    }, 3000);
    setVisible(false)
  };

  return (
    <>
      <div>UserForm</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={data.userName}
          onChange={handleInputChange}
          name="userName"
        />
        <br />
        <input
          type="email"
          placeholder="email"
          value={data.email}
          onChange={handleInputChange}
          name="email"
        />
        <br />
        <button type="submit" disabled={btnDisabled}>
          Enviar
        </button>
      </form>
      <p>{visible ?message :'Redirecting to Home...'}</p>
    </>
  );
};

export default UserForm;
