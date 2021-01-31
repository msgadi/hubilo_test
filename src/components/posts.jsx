import React, {useEffect, useState} from "react"
import {getAllPosts} from "../api/services";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 30
    },
    media: {
        height: 140,
    },
});
const Posts = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        (async () => {
            return setPosts(await getAllPosts());
        })()

        // return () => {
        //     effect
        // };
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                {posts && posts.map(post =>
                    <Grid key={post.id} item xs={12} sm={6} md={2}>
                        <Card key={post.id} className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {post.body}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card> </Grid>)}
            </Grid>
        </div>
    );
};

export default Posts;

