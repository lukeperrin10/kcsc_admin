import React, { useState } from 'react'
import {
  Grid,
  makeStyles,
  Drawer,
  List,
  Divider,
  IconButton,
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArticleIcon from '@material-ui/icons/Subject'
import CreateIcon from '@material-ui/icons/Create'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import InfoIcon from '@material-ui/icons/Info'
import SidebarIcon from './SidebarIcon'
import logoWhite from '../../assets/LogoCHWLSymbolWhite.png'
import ListIcon from '@material-ui/icons/List';
import Authentication from '../../modules/Authentication'

const useStyles = makeStyles((theme) => ({
  menuBar: {
    height: '3.5rem',
    backgroundColor: theme.palette.primary.main,
  },
  mobileLogo: {
    height: '80%',
    margin: '0 12px 0 auto',
  },
}))

const PhoneSidebar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Grid container alignItems='center' className={classes.menuBar}>
        <IconButton
          data-cy='hamburger-menu'
          className='menu-button'
          onClick={() => setOpen(!open)}>
          <MenuIcon fontSize='large' style={{ color: 'white' }} />
        </IconButton>
        <img src={logoWhite} alt='logo' className={classes.mobileLogo} />
      </Grid>
      <Drawer
        className='drawer'
        anchor='left'
        open={open}
        onClick={() => setOpen(false)}>
        <img src={logoWhite} alt='logo' />
        <List>
          <SidebarIcon text='General' to='/'>
            <SettingsIcon />
            </SidebarIcon>
        <SidebarIcon text='Navigation' to='/navigation'>
          <ListIcon />
          </SidebarIcon>
          <SidebarIcon dataCy='sections' text='Sections' to='/sections'>
            <ViewCompactIcon />
          </SidebarIcon>
          <SidebarIcon
            dataCy='articles-dashboard'
            text='Articles'
            to='/articles'>
            <ArticleIcon />
          </SidebarIcon>
          <SidebarIcon
            dataCy='article-creation'
            text='Create Article'
            to='/articles/create'>
            <CreateIcon />
          </SidebarIcon>
          <SidebarIcon
            dataCy='information-edit'
            text='Information'
            to='/information'>
            <InfoIcon />
          </SidebarIcon>
          <SidebarIcon
            dataCy='information-create'
            text='Create Information'
            to='/information/create'>
            <CreateIcon />
          </SidebarIcon>
        </List>
        <Divider />
        <List>
          <SidebarIcon
            dataCy='logout-button'
            text='Log out'
            onClick={() => Authentication.signOut()}>
            <ExitToAppIcon />
          </SidebarIcon>
        </List>
      </Drawer>
    </>
  )
}

export default PhoneSidebar
