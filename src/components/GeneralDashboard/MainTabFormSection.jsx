import React from 'react'
import {
  Typography,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Controller, useForm } from 'react-hook-form'
import useCommonStyles from '../../theme/useCommonStyles'



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

const MainTabFormSection = ({index, label, visible}) => {
  const commonClasses = useCommonStyles()
  const { control, handleSubmit } = useForm()
  const labelMaxLength = 50

  return (
    <Grid item container direction='row' alignItems='center'>
    <Typography variant='h7' style={{ width: '2rem' }}>
      {index}.
    </Typography>
    <Controller
      name={`main-tab-${index}-input`}
      control={control}
      defaultValue={label}
      rules={{ required: 'This field cannot be empty' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          data-cy={`main-tab-${index}-input`}
          variant='outlined'
          label={`Label*`}
          inputProps={{ maxLength: labelMaxLength }}
          error={!!error}
          helperText={error ? error.message : null}
          value={value}
          onChange={onChange}
        />
      )}
    />
    <Controller
      name={`main-tab-${1}-switch`}
      control={control}
      defaultValue={visible}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <StyledSwitch
              checked={value}
              onChange={onChange}
              articleId={1}
            />
          }
          label={
            <Typography className={commonClasses.switchLabel}>
              {value ? 'Visible' : 'Hidden'}
            </Typography>
          }
          labelPlacement='bottom'
        />
      )}
    />
  </Grid>
  )
}

export default MainTabFormSection
