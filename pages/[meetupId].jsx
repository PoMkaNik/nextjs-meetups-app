import React from 'react';
import MeetupDetail from '../components/meetups/MeetupDetail';

import { MongoClient, ObjectId } from 'mongodb';
import { DB_USER, DB_PASSWORD } from './api/config';

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
  return <MeetupDetail {...props.meetupData} />;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.2lksn.mongodb.net/meetups?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // FALSE - if all potential path in PATHS property
    // and if user request path that you have but not include in PATHS ->
    // 404 page will be displayed
    // if true - what is not included in PATHS -> will be generated on the fly
    // good solution for only popular pages pre-generation
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data for a single meetup
  const client = await MongoClient.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.2lksn.mongodb.net/meetups?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        id: selectedMeetup._id.toString(),
        _id: null,
      },
    },
  };
}

export default MeetupDetails;
