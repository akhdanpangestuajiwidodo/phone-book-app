import "./App.css";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import List from "./List";
import PopupInput from "./components/PopupInput";
import Modal from "./components/Modal";

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

  const [show, setShow] = useState(false);

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
      return (
        el.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
        el.phoneNumber.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
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
          <button onClick={() => setShow(true)}>Add Data</button>
          <Modal
            setShow={setShow}
            show={show}
            contacts={contacts}
            setContact={setContact}
          />
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
        setContact={setContact}
      />
    </div>
  );
}

export default App;
