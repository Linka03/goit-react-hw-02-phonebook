import React from 'react';

const ContactForm = ({ name, number, onChange, onChangeNumber, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
    </label>
    <label>
      Number:
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onChangeNumber}
        required
      />
    </label>
    <button type="submit">Add contact</button>
  </form>
);

export default ContactForm;
