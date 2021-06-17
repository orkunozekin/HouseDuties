import React, { useState } from 'react'

import HouseHoldForm from '../../components/household-form/HouseHoldForm'

import './NewHousehold.scss'

const NewHousehold = () => {

  return (
    <div className='new-household-wrapper'>
      <h2>Create a new household</h2>
      <HouseHoldForm />
    </div>
  )
}

export default NewHousehold
