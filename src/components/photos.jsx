import React, {useEffect, useReducer, useRef, useCallback} from "react"
import {useDispatch, useSelector} from "react-redux";
import photosActionCreators from "../store/photos/photos.actions"
import Card from "@material-ui/core/Card";
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 30
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const Photos = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {photos} = useSelector(state => state);

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return {...state, page: state.page + 1}
            default:
                return state;
        }
    }
    const [pager, pagerDispatch] = useReducer(pageReducer, {page: 0})

    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        pagerDispatch({type: 'ADVANCE_PAGE'});
                    }
                });
            }).observe(node);
        },
        [pagerDispatch]
    );

    let bottomBoundaryRef = useRef(null);

    useEffect(() => {
        dispatch(photosActionCreators)
    }, [pager.page]);

    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);


    return (
        <>
            <Grid container spacing={2}>
                {photos && photos.map((photo, i) =>
                    <Grid key={i} item xs={12} sm={6} md={2}>
                        <Card key={i} className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={photo.thumbnailUrl}
                                title={photo.title}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {photo.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)
                }
            </Grid>
            {photos && <div id='page-bottom-boundary' ref={bottomBoundaryRef}> </div>}
        </>
    );
};
export default Photos;

