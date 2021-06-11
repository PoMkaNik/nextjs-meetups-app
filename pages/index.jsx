import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'Meetup #1',
    image:
      'https://images.pexels.com/photos/3997758/pexels-photo-3997758.jpeg?auto=compress&h=627&w=1200',
    address: 'Some address 5, 12345 Some City',
    description: 'This is the #1 meetup!',
  },
  {
    id: 'm2',
    title: 'Meetup #2',
    image:
      'https://images.pexels.com/photos/735428/pexels-photo-735428.jpeg?jpegauto=compress&h=627&w=1200',
    address: 'Some address 5, 22345 Some City',
    description: 'This is the #2 meetup!',
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// for static generation -> get fetched data before
export async function getStaticProps() {
  // can run server side code -> never run on clients
  // ...await...
  // need to return object
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}

// server-side rendering
// export async function getServerSideProps() {
//   // can run server side code -> never run on clients
//   // can use credentials
//   // fetch data
//   // ...
//   // need to return object

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
