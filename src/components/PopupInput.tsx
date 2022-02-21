import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import { uid } from "uid";

let sub: { [key: string]: any } = {
  name: null,
  phoneNumber: null,
};

type formDataItem = {
  id: string;
  name: string;
  phoneNumber: string;
};

type propsInputPopUp = {
  contacts: formDataItem[];
  setContact: Function;
};

export default function PopupInput(props: propsInputPopUp) {
  const [formData, setFormData] = useState(sub);

  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...props.contacts];

    if (formData.name === "" || formData.phoneNumber === "") {
      alert("Harus Diisi yah");
      return false;
    }

    data.push({
      id: uid(),
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    });

    props.setContact(data);
    setFormData({ name: "", phoneNumber: "" });
    alert("Berhasil");
  };

  function handleChange(event: any) {
    let data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  }

  return (
    <div>
      <Popup
        trigger={<button className="addContact"> Add Contact </button>}
        modal
        nested
      >
        {(close: any) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Input Form </div>
            <div className="content">
              Masukan kontak yang ingin disimpan
              <br />
              <form onSubmit={onSubmitFormHandler}>
                <input
                  style={{ color: "black", margin: "10px" }}
                  type="text"
                  name="name"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  style={{ color: "black", margin: "10px" }}
                  type="text"
                  name="phoneNumber"
                  placeholder="08xxxx"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <div className="actions">
                  <button className="save" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
