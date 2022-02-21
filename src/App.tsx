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

  const [show, setShow] = useState(false);

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
        setContact={setContact}
      />
    </div>
  );
}

export default App;
