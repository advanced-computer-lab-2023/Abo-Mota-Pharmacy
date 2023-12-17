import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/joy/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Typography as JoyTypography } from '@mui/joy';
import { GiMedicinePills } from "react-icons/gi";


export default function NotificationList({notifications}) {

  const navigate = useNavigate();

  const content = notifications.reverse().map((notification, index) => {
    if(index>5)
      return;
    
    return <ListItem alignItems="flex-start" key={index} 
          className='group/item hover:bg-slate-100 cursor-pointer rounded-lg' onClick={() => {navigate("notifications/")}}>
            {/* {index !== 0 ? <Divider/>: null} */}
            <ListItemAvatar> <Avatar size="md"> <GiMedicinePills/> </Avatar> </ListItemAvatar>
            <ListItemText
              primary={<Typography level="title-lg" id="card-description"> Medicine Out of Stock</Typography>}
              secondary={
                <React.Fragment>
                  {notification.content}
                </React.Fragment>
              }
            />
          </ListItem>
  });
  return (
    <div>
      <JoyTypography level="h4"  >
          Notifications 
      </JoyTypography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {content}
      </List>
      <div className="flex justify-end cursor-pointer" onClick={() => {navigate("notifications/")}}>
        <Typography variant="body2" color="text.secondary"> View All Notifications</Typography>
      </div>
    </div>
  );
}