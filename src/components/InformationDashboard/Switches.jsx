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

export const Switches = ({ publish, pinned, itemId }) => {
  const [checkedPublish, setCheckedPublish] = useState(publish)
  const [checkedPinned, setCheckedPinned] = useState(pinned)

  const handleChange = async () => {
    let publishState = !checkedPublish   
    let pinnedState = !checkedPinned     
    let result = await Information.update_publish(itemId, publishState, pinnedState)
    if (result !== 'error') {
      if (publish) {
        setCheckedPublish(publishState)
      } else if (pinned) {
        setCheckedPinned(pinnedState)
      }
    }
  }

  return (
    <>
      <StyledSwitch
        size='small'
        checked={checkedPublish ? checkedPublish : checkedPinned}
        onChange={handleChange}
        data-cy={ checkedPublish ? `publish-${itemId}` : `pinned-${itemId}`}
        name={checkedPublish ? `publish-${itemId}` : `pinned-${itemId}`}
      />
    </>
  )
}

export default Switches

