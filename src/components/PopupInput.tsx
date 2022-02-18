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

  //   //Hooks updateStatus
  //   const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  //   function handleUpdateContact(id: any) {
  //     let foundData = props.contacts.find((contact: any) => contact.id === id);
  //     setIsUpdate({ id: id, status: true });
  //     setFormData({ name: foundData?.name, phoneNumber: foundData?.phoneNumber });
  //   }

  //onSubmitForm or save Data

  //   if (props.id !== "" || props.id !== null) {
  //     let foundData = props.contacts.find(
  //       (contact: any) => contact.id === props.id
  //     );
  //     setIsUpdate({ id: props.id, status: true });
  //     setFormData({ name: foundData?.name, phoneNumber: foundData?.phoneNumber });
  //   }

  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...props.contacts];

    if (formData.name === "" || formData.phoneNumber === "") {
      alert("Harus Diisi yah");
      return false;
    }

    // if (isUpdate.status) {
    //   data.forEach((contact) => {
    //     if (contact.id === isUpdate.id) {
    //       contact.name = formData.name;
    //       contact.phoneNumber = formData.phoneNumber;
    //     }
    //   });
    // } else {
    //   data.push({
    //     id: uid(),
    //     name: formData.name,
    //     phoneNumber: formData.phoneNumber,
    //   });
    // }

    data.push({
      id: uid(),
      name: formData.name,
      phoneNumber: formData.phoneNumber,
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
