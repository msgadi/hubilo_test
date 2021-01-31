import React from 'react';
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";

function Home(props) {
    return (
        <Container>
         <Typography variant={"h6"}>
             Hey! My Name is Mohammed Gadi and I have created this application
             as a Practical Test for Hubilo.
         </Typography>
        </Container>
    );
}

export default Home;
