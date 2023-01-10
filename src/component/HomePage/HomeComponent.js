import React from 'react';
import Category from './Category';
import OshanContainer from '../comman/OshanContainer';
import Promo from './Promo';
import TodayPicks from './TodayPicks';
import { Box } from '@chakra-ui/react';

const HomeComponent = (props) => {

    return (
        <>






            <OshanContainer >

                <Box p={6} />
                <Category />

                <Promo />

                <TodayPicks />

            </OshanContainer>
        </>
    )

}

export default HomeComponent;