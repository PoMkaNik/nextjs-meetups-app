import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import MeetupDetail from '../components/meetups/MeetupDetail';

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

const MeetupDetails = (props) => {
  const router = useRouter();

  const meetupId = router.query.meetupId;

  const meetupData = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupId);

  return <MeetupDetail {...props.meetupData} />;
};

export async function getStaticPaths() {
  return {
    // FALSE - if all potential path in PATHS property
    // and if user request path that you have but not include in PATHS ->
    // 404 page will be displayed
    // if true - what is not included in PATHS -> will be generated on the fly
    // good solution for only popular pages pre-generation
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  //...
  const meetupId = context.params.meetupId;

  const meetupData = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupId);

  return {
    props: {
      meetupData,
    },
  };
}

export default MeetupDetails;
