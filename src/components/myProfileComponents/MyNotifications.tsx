import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCustomerNotificationsDetails } from "../../api/myProfileLayoutApiCalls";

type Notifications = {
    moduleId:number;
    module:string;
    notificationTypeId:number;
    notificationType:string;
    message:string;
    status:string;
    notificationId:number
}
const MyNotifications = ()=>{

    const [notifications,setNotifications]  = useState<Notifications[]>([]);
    const [moduleId,setModuleId] = useState<string>("");
    const [notificationTypeId,setNotificationTypeId] = useState<string>("");

    useEffect(()=>{
        handleFetchingCustomerNotifications(1,1,1);
    },[])

    const handleFetchingCustomerNotifications = async (customerId:number,moduleId?:number,notificationTypeId?:number)=>{
        const response = await fetchCustomerNotificationsDetails(customerId,notificationTypeId,moduleId);
        setNotifications(response?.data);
    }

     const handleModuleIdChange = (event: SelectChangeEvent) => {
      setModuleId(event.target.value);
    };
    return(
        <>
        
            <Box className="wishlist-container">
                <Typography variant="h6" >
                    My Notifications ({notifications?.length})
                </Typography>

            <Box>
                {notifications?.map((item)=>(
                    <Typography key={item.notificationId} sx={{background:"whitesmoke" , mb:"4px",padding:"5px",fontSize:"13px !important"}}>
                        {item.message}
                    </Typography>
                ))}
            </Box>
            
         </Box>
         </>
    )
}

export default MyNotifications;