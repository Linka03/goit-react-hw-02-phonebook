import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeNumber = event => {
    this.setState({ number: event.target.value });
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

    if (
      contacts.some(
        contact => contact.name === name || contact.number === number
      )
    ) {
      alert('This contact already exists!');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { name, number, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onChange={this.handleChange}
          onChangeNumber={this.handleChangeNumber}
          onSubmit={this.handleSubmit}
        />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        {filteredContacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>No contacts yet</p>
        )}
      </div>
    );
  }
}

export default App;
