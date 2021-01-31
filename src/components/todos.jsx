import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {getAllTodos} from "../api/services";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import todosActionCreators from "../store/todos/todos.actions";

const useStyles = makeStyles({
    container: {
        padding: 16
    }
});

function Todos(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {todos} = useSelector(state => state);

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
        dispatch(todosActionCreators)
    }, [pager.page]);

    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);

    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant={"h5"}> Todos</Typography>
            {
                (<List>
                    {todos && todos.map(todo => {
                        return (
                            <ListItem key={todo.id} button>
                                <ListItemIcon>
                                    {todo.completed ? <CheckCircleIcon color="primary"/> :
                                        <CheckCircleOutlineIcon color="primary"/>}
                                </ListItemIcon>
                                <ListItemText primary={todo.title}/>
                                {/*<ListItemSecondaryAction>*/}
                                {/*    <IconButton edge="end" aria-label="edit">*/}
                                {/*        <EditIcon/>*/}
                                {/*    </IconButton>*/}
                                {/*    <IconButton edge="end" aria-label="delete">*/}
                                {/*        <DeleteIcon/>*/}
                                {/*    </IconButton>*/}
                                {/*</ListItemSecondaryAction>*/}
                            </ListItem>
                        )
                    })}
                    {todos && <div id='page-bottom-boundary' ref={bottomBoundaryRef}> </div>}
                </List>)
            }
        </Container>
    );
}

export default Todos;
