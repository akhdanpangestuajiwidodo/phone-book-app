import "./App.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import List from "./List";
import { uid } from "uid";
import { SearchBar } from "./SearchBar";

type formDataItem = {
  id: string;
  name: string;
  phoneNumber: string;
};

let sub: { [key: string]: any } = {
  name: null,
  phoneNumber: null,
};

function App() {
  const result: formDataItem[] = [];

  //Hooks Contacts
  const [contacts, setContact] = useState(result);

  //Hooks Contacts
  const [searchResult, setSearchResult] = useState(result);

  //Hooks Form Contacts
  const [formData, setFormData] = useState(sub);

  //Hooks updateStatus
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  //onSubmitForm or save Data
  const onSubmitFormHandler = (event: any) => {
    event.preventDefault();

    let data = [...contacts];

    if (formData.name === "" || formData.phoneNumber === "") {
      alert("Harus Diisi yah");
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.phoneNumber = formData.phoneNumber;
        }
      });
    } else {
      data.push({
        id: uid(),
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });
    }

    setContact(data);
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
    let foundData = contacts.find((contact: any) => contact.id === id);
    setIsUpdate({ id: id, status: true });
    setFormData({ name: foundData?.name, phoneNumber: foundData?.phoneNumber });
  }

  //Hooks Search Contacts
  const [searchDataInput, setsearchDataInput] = useState("");

  const onSearchSubmit = (input: string) => {
    let data = [...contacts];
    const filter = data.filter((el) => {
      return el.name.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });
    setSearchResult(filter);
  };

  useEffect(() => {
    if (searchDataInput !== "") {
      onSearchSubmit(searchDataInput);
    }
  }, [searchDataInput]);

  //function delete
  function handleDeleteContact(id: string) {
    const contactAfterDelete = contacts.filter((contact) => contact.id !== id);
    setContact(contactAfterDelete);
  }

  return (
    <div className="App">
      <h1>Phone Book App</h1>
      <div className="container">
        <div className="box">
          <h3>Contact</h3>
        </div>
        <div className="box">
          {/* <Popup
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
          </Popup> */}
          <form onSubmit={onSubmitFormHandler} className="inputUpdate">
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

            <button className="save" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>

      <form className="formSearch">
        <input
          style={{ color: "black", margin: "10px" }}
          type="text"
          name="searchInputData"
          value={searchDataInput}
          placeholder="Ini Search"
          onChange={(e) => setsearchDataInput(e.target.value)}
        />
      </form>

      <List
        data={searchDataInput.length < 1 ? contacts : searchResult}
        handleDeleteContact={handleDeleteContact}
        handleUpdateContact={handleUpdateContact}
        onSubmitFormHandler={onSubmitFormHandler}
      />
    </div>
  );
}

export default App;
