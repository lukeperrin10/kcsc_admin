import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Switch } from '@material-ui/core'
import Information from '../../modules/Information'

const StyledSwitch = withStyles({
  switchBase: {
    color: '#ddd',
    '&$checked': {
      color: '#0BDA51',
    },
    '&$checked + $track': {
      backgroundColor: '#00FF00',
    },
  },
  checked: {},
  track: {},
})(Switch)

export const Switches = ({ value, itemId, name }) => {
  const [checked, setChecked] = useState(value)

  const handleChange = async () => {
    let switchState = !checked
    let result = await Information.update_switch(itemId, name, switchState)
    if (result !== 'error') {
      setChecked(switchState)
    }
  }

  return (
    <StyledSwitch
      size='small'
      checked={checked}
      onChange={handleChange}
      data-cy={name === 'publish' ? `publish-${itemId}` : `pinned-${itemId}`}
      name={name === 'publish' ? `publish-${itemId}` : `pinned-${itemId}`}
    />
  )
}

export default Switches
