import "./App.css";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import List from "./List";
import Modal from "./components/Modal";

type formDataItem = {
  id: string;
  name: string;
  phoneNumber: string;
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
    <div className="parent-container">
      <div className="App">
        <h1 className="title">Phone Book App</h1>
        <div className="container-app">
          <div className="leftBox box">
            <h3 className="title-h4">Contact</h3>
          </div>
          <div className="box">
            <button onClick={() => setShow(true)} className="addContact">
              Add Contact
            </button>
            <Modal
              setShow={setShow}
              show={show}
              contacts={contacts}
              setContact={setContact}
            />
          </div>
        </div>

        <div className="segment-search">
          <form className="formSearch">
            <input
              className="searchContact"
              type="text"
              name="searchInputData"
              value={searchDataInput}
              placeholder="Search"
              onChange={(e) => setsearchDataInput(e.target.value)}
            />
          </form>
        </div>

        <List
          data={searchDataInput.length < 1 ? contacts : searchResult}
          handleDeleteContact={handleDeleteContact}
          setContact={setContact}
        />
        <div className="app-footer"></div>
      </div>
    </div>
  );
}

export default App;
