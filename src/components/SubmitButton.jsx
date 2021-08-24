import React from 'react'
import { Grid, Button } from '@material-ui/core'

const SubmitButton = () => {
  return (
    <Grid
      item
      container
      direction='row'
      alignItems='center'
      justifyContent='flex-end'>
      <Button
        data-cy='footer-submit-button'
        type='submit'
        variant='contained'
        color='primary'>
        Submit
      </Button>
    </Grid>
  )
}

export default SubmitButton
