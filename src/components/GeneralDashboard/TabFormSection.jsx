import React from 'react'
import {
  Typography,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Controller } from 'react-hook-form'
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

const useStyles = makeStyles(() => ({
  tabLabelInput: { flex: '1', marginLeft: '1rem' },
  number: { width: '1rem', textAlign: 'end' },
}))

const TabFormSection = ({
  control,
  index,
  indexSec,
  label,
  visible,
  secondary = false,
}) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const labelMaxLength = 50

  return (
    <Grid
      item
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      style={secondary ? { paddingLeft: '3rem' } : undefined}>
      <Typography variant='body1' className={classes.number}>
        {indexSec ? `${index}.${indexSec}` : `${index}.`}
      </Typography>
      <Controller
        name={
          secondary
            ? `navigation.main_tabs[${index}].secondary_tabs[${indexSec}].label`
            : `navigation.main_tabs[${index}].label`
        }
        control={control}
        defaultValue={label}
        rules={{ required: 'This field cannot be empty' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            data-cy={`tab-${index}-input`}
            variant='outlined'
            label={`Label*`}
            className={classes.tabLabelInput}
            inputProps={{ maxLength: labelMaxLength }}
            error={!!error}
            helperText={error ? error.message : null}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name={
          secondary
            ? `navigation.main_tabs[${index}].secondary_tabs[${indexSec}].visible`
            : `navigation.main_tabs[${index}].visible`
        }
        control={control}
        defaultValue={visible}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={<StyledSwitch checked={value} onChange={onChange} />}
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

export default TabFormSection
