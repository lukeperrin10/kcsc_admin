import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Switch } from '@material-ui/core'
import Articles from '../../modules/Articles'

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

const PublishedSwitch = ({ publish, articleId }) => {
  const [checked, setChecked] = useState(publish)

  const handleChange = async () => {
    let publishState = !checked    
    let result = await Articles.update_publish(articleId, publishState)
    if (result !== 'error') {
      setChecked(publishState)
    }
  }

  return (
    <>
      <StyledSwitch
        size='small'
        checked={checked}
        onChange={handleChange}
        data-cy={`publish-${articleId}`}
        name={`publish-${articleId}`}
      />
    </>
  )
}

export default PublishedSwitch
