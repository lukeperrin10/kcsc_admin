import React from 'react'
import { Grid, Button } from '@material-ui/core'

const SubmitButton = ({ dataCy, disabled = false }) => {
  return (
    <Grid
      item
      container
      direction='row'
      alignItems='center'
      justifyContent='flex-end'>
      <Button
        data-cy={dataCy}
        type='submit'
        variant='contained'
        color='primary'
        disabled={disabled}>
        Submit
      </Button>
    </Grid>
  )
}

export default SubmitButton
