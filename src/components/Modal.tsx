import React from "react";
import { useState, useEffect } from "react";
import "../styles/modal.css";
import { uid } from "uid";

let sub: { [key: string]: any } = {
  name: null,
  phoneNumber: null,
};

const Modal = (props: any) => {
  const [formData, setFormData] = useState(sub);
  if (!props.show) {
    return null;
  }

  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...props.contacts];

    if (formData.name === "" || formData.phoneNumber === "") {
      alert("Harus Diisi yah");
      props.setShow(true);
      return false;
    }

    data.push({
      id: uid(),
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    });

    props.setContact(data);
    setFormData({ name: "", phoneNumber: "" });
    setTimeout(() => {
      showAlertSuccess();
    }, 200);
    props.setShow(false);
  };

  function closeModal() {
    props.setShow(false);
  }
  function showAlertSuccess() {
    alert("Berhasil");
  }

  function a(e: any) {
    if (props.show == false) {
      setTimeout(() => {
        showAlertSuccess();
      }, 200);
    }

    onSubmitFormHandler(e);
  }

  function handleChange(event: any) {
    let data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Modal Title</div>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              a(e);
            }}
          >
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
        <div className="modal-footer">
          <button className="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
