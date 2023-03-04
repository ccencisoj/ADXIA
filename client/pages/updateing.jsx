import React from 'react'
import NavBar from '~/components/NavBar/NavBar'
import OptionsNavBar from '~/components/OptionsNavBar/OptionsNavBar'
import DefaultLayout from '~/layout/DefaultLayout'

function updateing() {
  return (
    <DefaultLayout>
        <div className='updateingPage'>
            <h1>This page is in construction</h1>
        </div>
        <NavBar>
            <OptionsNavBar linkAdd={'/orders/add'}/>
        </NavBar>
    </DefaultLayout>
  )
}

export default updateing