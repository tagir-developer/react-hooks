import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/AlertContext'

export const Search = () => {

  const {show} = useContext(AlertContext)

  const onSubmite = (event) => {
    if (event.key === 'Enter') {
      console.log('pres enter4444444444444')
      show('This is alert!')
    }
  }

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Введите ник пользователя..."
        onKeyPress={onSubmite}
      />
    </div>
  )
}
