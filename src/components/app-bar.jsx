import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Button, Divider} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React  from "react";
import { useHistory } from "react-router-dom";
import {fade, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

function CustomAppBar(props) {

    const classes = useStyles();
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = (route) => {
        history.push(`/${route}`)
    }

    const handleMenuChange = (route) => {
        handleClose()
        handleRoute(route)
    }

    return (
      <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    Hubilo Practical Test
                </Typography>
                <Divider variant={"middle"}/>
                <Button variant="contained" color="primary" onClick={()=> handleRoute('posts')} >
                    Posts
                </Button>
                <Divider variant={"middle"}/>
                <Button variant="contained" color="primary" onClick={()=> handleRoute('albums')}>
                    Album
                </Button>
                <Divider variant={"middle"}/>
                <Button variant="contained" color="primary" aria-haspopup="true" onClick={handleClick}>
                    Dropdown
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem  onClick={()=> { handleMenuChange('todos') } } value={"todos"}>Todos</MenuItem>
                    <MenuItem  onClick={()=> { handleMenuChange('users') } } value={"users"}>Users</MenuItem>
                    <MenuItem  onClick={()=> { handleMenuChange('photos') } } value={"photos"}>Photos</MenuItem>
                </Menu>
                <Divider variant={"middle"}/>
                <Button variant="contained" color="primary"
                        onClick={()=>{ handleRoute('stepper-form') }}>
                    Stepper Form
                </Button>

                <div className={classes.grow}/>
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default CustomAppBar;


