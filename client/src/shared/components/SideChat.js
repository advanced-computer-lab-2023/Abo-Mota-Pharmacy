import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Avatar, Typography, Divider, Input, ListItemContent, ListItem, Chip, Badge } from '@mui/joy'
import ListItemButton from '@mui/joy/ListItemButton';

import { useFetchContactsDetailsQuery, useInvalidateMessagesMutation, useFetchLoggedInQuery } from '../../store';
import timeAgo from '../functions/timeAgo';
import { FaStaffSnake } from "react-icons/fa6";

import capitalize from '../functions/capitalize';

function SideChat({ socket, contactsDetails, setContactsDetails, selectedRecipientId, setSelectedRecipientId }) {

  const [searchTerm, setSearchTerm] = useState("");

  const { data: fetchedContactsDetails, isLoading: isLoadingContactsDetails, isFetching: isFetchingContactsDetails, isError: isErrorContactsDetails } = useFetchContactsDetailsQuery();
  const { data: loggedInUser, isFetching: isFetchingUser, isError: isErrorFetchingUser } = useFetchLoggedInQuery();
  const [invalidateMessages] = useInvalidateMessagesMutation();
  const PHARMA_SERVICE_ID = process.env.REACT_APP_PHARMA_SERVICE_ID;
  const read = false;

  useEffect(() => {
    if (!isLoadingContactsDetails) {
      if (fetchedContactsDetails) {
        setContactsDetails(fetchedContactsDetails);
      }
    }
  }, [isLoadingContactsDetails]);

  const updateTimeAgo = () => {
    setContactsDetails(prevContactsDetails => {
      const updatedContactsDetails = prevContactsDetails.map(contactDetails => {
        const { message } = contactDetails;

        let date = new Date(message.date);
        // Increment the date by one minute
        date.setMinutes(date.getMinutes() - 1);

        const newMessage = { ...message, date };

        return { ...contactDetails, message: newMessage };
      });

      return updatedContactsDetails;
    });
  }

  useEffect(() => {
    // Update time ago every minute
    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  });


  if (isLoadingContactsDetails) {
    return <div>Loading...</div>;
  }

  const ContactCard = ({ contact, message }) => {
    const text = message.content;
    // const maxTextLength = 35;

    return (
      <>
        <ListItem>
          <ListItemButton
            // className="flex space-x-5 px-2 py-3 rounded-md"
            onClick={() => {
              setSelectedRecipientId(contact._id);
              invalidateMessages();
            }}

            sx={{
              px: 1,
              py: 1,
              borderRadius: '5px',
              display: 'flex',
              displayDirection: 'row',
              gap: 1.5,
            }}

            selected={contact._id === selectedRecipientId}

          >
            {
              contact._id === PHARMA_SERVICE_ID ?
                <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'><FaStaffSnake style={{ fontSize: '2em' }} /> </Avatar>
                :
                <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'>{contact.name[0]}</Avatar>
            }

            { /* old font weights => <Typography level="body-md" fontWeight={500}> */}
            { /* old font weights => <Typography level="body-sm" fontWeight={450}> */}

            <ListItemContent className="w-full space-y-1">
              <Box className="flex w-full justify-between items-center">
                <Box className="flex space-x-1 items-center">
                  <Typography level="body-md" fontWeight={500} textColor={message.read ? "#555e68" : "black"}>
                    {contact.name}
                  </Typography>

                  <Typography level="body-sm" fontWeight={450}>
                    {`\u2022 ${capitalize(contact.userType)}`}
                  </Typography>
                </Box>

                <Typography color="secondary" level="body-xs">
                  {timeAgo(message.date)}
                </Typography>
              </Box>



              <Box className="flex w-full justify-between items-center pr-2">
                <Typography level="body-sm" noWrap fontWeight={message.read ? 450 : 600 } textColor={message.read ? "#555e68" : "black"}>
                  {text}
                </Typography>

                <Badge invisible={message.read} size="md" />
                {/* <div className='w-4 h-4 bg-blue-600 rounded-lg' /> */}
                {/* <Chip color="primary" variant='solid' size="md">1</Chip> */}
              </Box>


            </ListItemContent>
          </ListItemButton>
        </ListItem>

      </>
    )
  }

  return (
    <Box className="h-full" sx={{ backgroundColor: '#f9f9f9', px: 2, width: '300px' }}>
      <Typography level="h2" sx={{ p: 1 }}>
        Chats
      </Typography>

      <Input
        value={searchTerm}
        className='mt-2 mb-5'
        placeholder='Search for contacts'
        sx={{ borderRadius: '1.5em' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box className="">
        {
          contactsDetails
            .filter(contactDetails => contactDetails.contact.name.toLowerCase().includes(searchTerm))
            .map((contactDetails, i) => {
              const { contact, message } = contactDetails;
              return (
                <>
                  <ContactCard contact={contact} message={message} />
                  {(i < contactsDetails.length - 1) && <Divider sx={{ opacity: '50%' }} />}
                </>
              )
            })
        }
      </Box>
    </Box>
  )
}

export default SideChat;
