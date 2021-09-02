import React from 'react'
import { useSelector } from 'react-redux'
import { Drawer, List, Divider } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArticleIcon from '@material-ui/icons/Subject'
import CreateIcon from '@material-ui/icons/Create'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import InfoIcon from '@material-ui/icons/Info'
import Authentication from '../../modules/Authentication'
import SidebarIcon from './SidebarIcon'
import ListIcon from '@material-ui/icons/List';
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
        <SidebarIcon text='Navigation' to='/navigation'>
          <ListIcon />
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
  )
}

export default Sidebar
