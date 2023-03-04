import React from 'react';

export default function Index() {
  return null;
}

export async function getServerSideProps(context) {
    return {
      props: {}, 
      redirect: {destination: "/login"}
    }
  }
