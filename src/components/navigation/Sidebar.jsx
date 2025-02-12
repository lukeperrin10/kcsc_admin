import React from 'react'
import { useSelector } from 'react-redux'
import { Drawer, List, Divider } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArticleIcon from '@material-ui/icons/Subject'
import CreateIcon from '@material-ui/icons/Create'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import InfoIcon from '@material-ui/icons/Info'
import Authentication from '../../modules/Authentication'
import SidebarIcon from './SidebarIcon'
import symbolLogo from '../../assets/LogoCHWLSymbolWhite.png'

const Sidebar = () => {
  const { name } = useSelector((state) => state)

  return (
    <Drawer className='drawer' variant='permanent'>
      <img src={symbolLogo} alt='logo' />
      <p>Welcome back</p>
      <p data-cy='broker-name'>{name}</p>
      <List>
        <SidebarIcon text='General' to='/'>
          <SettingsIcon />
        </SidebarIcon>
        <SidebarIcon dataCy='sections' text='Sections' to='/sections'>
          <ViewCompactIcon />
        </SidebarIcon>
        <SidebarIcon dataCy='articles-dashboard' text='Articles' to='/articles'>
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
        <SidebarIcon dataCy='menu-analytics' text='Analytics' to='/analytics'>
          <AssessmentIcon />
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
  )
}

export default Sidebar
