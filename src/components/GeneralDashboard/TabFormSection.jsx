// UNCOMMENT TO ADD BACK THE VISIBLE SWITCH
import React from 'react'
import {
  Typography,
  TextField,
  Grid,
  // Switch,
  // FormControlLabel,
  useMediaQuery
} from '@material-ui/core'
import { 
  //withStyles, 
  makeStyles, useTheme } from '@material-ui/core/styles'
import { Controller } from 'react-hook-form'
// import useCommonStyles from '../../theme/useCommonStyles'

// const StyledSwitch = withStyles({
//   switchBase: {
//     color: '#ddd',
//     '&$checked': {
//       color: '#0BDA51',
//     },
//     '&$checked + $track': {
//       backgroundColor: '#00FF00',
//     },
//   },
//   checked: {},
//   track: {},
// })(Switch)

const useStyles = makeStyles(() => ({
  tabLabelInputContainer: { flex: '1' },
  tabLabelInput: { flex: '1', margin: '8px 0 8px 1rem' },
  number: { width: '1rem', textAlign: 'end' },
}))

const TabFormSection = ({
  control,
  index,
  indexSec,
  label,
  // visible,
  // section = null,
  secondary = false,
}) => {
  // const commonClasses = useCommonStyles()
  const classes = useStyles()
  const labelMaxLength = 50
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid
      item
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      style={(secondary && mobile) ? { paddingLeft: '3rem' } : undefined}>
      <Typography variant='body1' className={classes.number}>
        {indexSec ? `${index}.${indexSec}` : `${index}.`}
      </Typography>
      <Grid item container direction='column' className={classes.tabLabelInputContainer}>
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
              data-cy={`tab-input`}
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
      </Grid>
      {/* <Controller
        name={
          secondary
            ? `navigation.main_tabs[${index}].secondary_tabs[${indexSec}].visible`
            : `navigation.main_tabs[${index}].visible`
        }
        control={control}
        defaultValue={visible}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={<StyledSwitch data-cy='tab-switch' checked={value} onChange={onChange} />}
            label={
              <Typography className={commonClasses.switchLabel}>
                {value ? 'Visible' : 'Hidden'}
              </Typography>
            }
            labelPlacement='bottom'
          />
        )}
      /> */}
    </Grid>
  )
}

export default TabFormSection
