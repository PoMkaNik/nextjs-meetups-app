import React, { Fragment } from 'react';
import MeetupDetail from '../components/meetups/MeetupDetail';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';
import { DB_USER, DB_PASSWORD } from './api/config';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />;
    </Fragment>
  );
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
    // TRUE - what is not included in PATHS ->
    // will be generated on the fly
    // 'BLOCKING' - user will not see anything
    // until page is ready with all fetched data
    // good solution for only popular pages pre-generation
    fallback: 'blocking',
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
