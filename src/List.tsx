import { useState, useEffect } from "react";
import "./styles/list.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import PopupUpdate from "./components/PopupUpdate";
import ModalUpdate from "./components/ModalUpdate";

export default function List(props: any) {
  const { data, handleDeleteContact, setContact, handleUpdateContact } = props;
  const [show, setShow] = useState(false);

  return (
    <div>
      {data.map((contact: any) => {
        return (
          <div className="container">
            <div className="lefBox box">
              <h3>{contact.name}</h3>
              <p>{contact.phoneNumber}</p>
            </div>
            <div className="box">
              <button
                className="hapus"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Hapus
              </button>
              <button onClick={() => setShow(true)}>Update</button>
              <ModalUpdate
                setShow={setShow}
                show={show}
                contacts={data}
                setContact={setContact}
                id={contact.id}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
