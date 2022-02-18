import { useState, useEffect } from "react";
import "./styles/list.css";

export default function List(props: any) {
  const { data, handleDeleteContact, handleUpdateContact } = props;

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

              <button
                className="update"
                onClick={() => handleUpdateContact(contact.id)}
              >
                Update
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
