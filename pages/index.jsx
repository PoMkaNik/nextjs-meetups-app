import React, { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

import { MongoClient } from 'mongodb';
import { DB_USER, DB_PASSWORD } from './api/config';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups'
        />
        {/* favicons */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// for static generation -> get fetched data before
export async function getStaticProps() {
  // can run server side code -> never run on clients
  const client = await MongoClient.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@db-mongodb-nyc1-38303-b0451fe1.mongo.ondigitalocean.com/meetups?authSource=admin&replicaSet=db-mongodb-nyc1-38303&tls=true`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // need to return object
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        ...meetup,
        _id: null, // need to remove _id from ...meetups
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
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
