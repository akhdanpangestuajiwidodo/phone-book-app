import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "../styles/popupUpdate.css";

let sub: { [key: string]: any } = {
  name: null,
  phoneNumber: null,
};

export default function PopupUpdate(props: any) {
  //Hooks Form Contacts
  const [formData, setFormData] = useState(sub);

  //Hooks updateStatus
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  //Hooks updateStatus
  const [isButtonSaveEnable, setButtonSaveStatus] = useState(false);

  //onSubmitForm or save Data
  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...props.contacts];

    if (formData.name === "" || formData.phoneNumber === "") {
      alert("Harus Diisi yah");
      return false;
    }

    data.forEach((contact) => {
      if (contact.id === isUpdate.id) {
        contact.name = formData.name;
        contact.phoneNumber = formData.phoneNumber;
      }
    });

    props.setContact(data);
    setFormData({ name: "", phoneNumber: "" });
    alert("Berhasil");
    console.log("ini data masuk");
  };

  function handleChange(event: any) {
    let data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  }

  function handleUpdateContact(id: any) {
    let foundData = props.contacts.find((contact: any) => contact.id === id);
    setIsUpdate({ id: props.id, status: true });
    setFormData({ name: foundData?.name, phoneNumber: foundData?.phoneNumber });
  }

  return (
    <Popup
      trigger={<button className="updateButton"> Update </button>}
      modal
      nested
    >
      {(close: any) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Update Form </div>
          <div className="content">
            Klik Tampil Data untuk mengubah{" "}
            <button
              onClick={() => {
                setButtonSaveStatus(true);
                handleUpdateContact(props.id);
              }}
            >
              Tampil Data
            </button>
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
                {isButtonSaveEnable == false ? (
                  <button
                    className="save"
                    type="submit"
                    style={{ pointerEvents: "none", opacity: 0.5 }}
                  >
                    Save
                  </button>
                ) : (
                  <button className="save" type="submit">
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}
