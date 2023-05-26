import { useState } from 'react';
import { Tooltip, Avatar, IconButton, Menu, MenuItem, Divider, ListItemIcon} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';


export const UserProfileMenu = ({user}) =>{

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = async () => {
    try{
      await signOut(auth);
    } catch(err) {
      console.error(err)
    }
  };

  user.getIdTokenResult()
  .then((token) => {
    console.log(token);
    //IMPORTANT, THIS IS HOW WE ACCESS USER ACCESS RIGHTS
  })
  return(
    <>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.displayName} src={user.photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorEl={anchorElUser}
         
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          
          <MenuItem onClick={handleCloseUserMenu}>
          <Avatar alt={user.displayName} src={user.photoURL} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
          
        </Menu>
      </>
  );
}
