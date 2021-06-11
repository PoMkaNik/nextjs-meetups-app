import React from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const addMeetupHandler = (enteredData) => {
    console.log(enteredData);
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
