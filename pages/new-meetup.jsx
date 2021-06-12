import React from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

const NewMeetup = () => {
  const router = useRouter();
  
  const addMeetupHandler = async (enteredData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace('/');
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
