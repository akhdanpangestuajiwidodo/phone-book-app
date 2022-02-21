import { useState, useEffect } from "react";
import "../styles/modal.css";

let sub: { [key: string]: any } = {
  name: null,
  phoneNumber: null,
};

const ModalUpdate = (props: any) => {
  const [formData, setFormData] = useState(sub);

  useEffect(() => {
    setIsUpdate({ id: props.id, status: true });
  }, []);

  const [name, setName] = useState(props.name);
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  if (!props.show) {
    console.log("tutup");
    return null;
  }

  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...props.contacts];

    if (name === "" || phoneNumber === "") {
      alert("Harus Diisi yah");
      props.setShow(true);
      return false;
    }

    data.forEach((contact) => {
      if (contact.id === isUpdate.id) {
        contact.name = name;
        contact.phoneNumber = phoneNumber;
      }
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

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Modal Update</div>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={{ color: "black", margin: "10px" }}
              type="text"
              name="phoneNumber"
              placeholder="08xxxx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

export default ModalUpdate;
