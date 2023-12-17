import * as React from 'react';
import List from '@mui/material/List';
import { Typography as JoyTypography, Divider } from '@mui/joy';
import MessageItem from './MessageItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function MessagesList({messages}) {

    const navigate = useNavigate();
    
  let content = messages.map((message, index) => {
    if(index>5)
      return;
    return <>
            <MessageItem message={message} key={index}/>
            {messages.length > 1 && <Divider sx={{ opacity: '50%' }} />}
        </>
  });

  if(content.length === 0){
    content = <Typography level="h4"  >
                No New Messages
                </Typography>
  }
  return (
    <div>
        <JoyTypography level="h4"  >
          Messages 
        </JoyTypography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {content}
        </List>
        <div className="flex justify-end cursor-pointer" onClick={() => {navigate("chat/")}}>
        <Typography variant="body2" color="text.secondary"> View All Messages</Typography>
      </div>
    </div>
  );
}