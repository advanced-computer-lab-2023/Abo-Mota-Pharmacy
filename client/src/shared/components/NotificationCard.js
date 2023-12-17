import {CircularProgress , Typography, Card, CardContent, Avatar, Box, Divider} from '@mui/joy';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import { GiMedicinePills } from "react-icons/gi";


export default function NotificationCard({content, formattedDate}){

   
    return (
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: "100%",
            "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" },
            marginTop: 4
        }}
        >
          <CardContent>
            
          <Box className="flex justify-between">
              <Box className="flex space-x-4">
                    <Avatar size="lg"> <GiMedicinePills /> </Avatar>
                
                <Box className="mr-10">
                    <Typography level="title-lg" id="card-description"> Medicine Out of Stock</Typography>
                  <Box className="">
                    <Typography level="body-md" aria-describedby="card-description" mb={1}>
                      {content}
                    </Typography>
                  </Box>
                </Box>
              </Box>
    
            </Box>
    
            <Divider sx={{ marginBottom: 0.5 }} />

            <Box className="w-full flex justify-end">
              <Typography
                level="body-md"
                aria-describedby="card-description"
              >
                {formattedDate.includes(",") ? formattedDate.replace(",", " -") : formattedDate}
              </Typography>
            </Box>
    
          </CardContent>
        </Card>
      );
}
