

import React from 'react';
import Header from '../component/Header';
import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';


const Testing = (props) => {

    const [fcm, setFcm] = useState("");

    const getFCMToken = async () => {

        const token = await window.Android.getDeviceToken();
        setFcm(token);
        alert(token)

    }

    return (
        <>
            <Header />
            <Box p={10}>
                <Button onClick={getFCMToken}>Get FCM Token</Button>
                {/* <Button onClick={getFCMToken2}>Get FCM Token 2</Button> */}
                <Text>{fcm}</Text>
            </Box>
            {/* <Footer /> */}
        </>
    )

}

export default Testing;