import { useState, useEffect } from "react";
import "./styles/list.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupUpdate from "./components/PopupUpdate";

export default function List(props: any) {
  const { data, handleDeleteContact, handleUpdateContact, setContact } = props;

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
              <PopupUpdate
                contacts={data}
                setContact={setContact}
                id={contact.id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
