import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {useForm} from "react-hook-form"
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import DateFnsUtils from '@date-io/date-fns';
import { addDays, addYears, format } from 'date-fns';
import {  MuiPickersUtilsProvider,  KeyboardDatePicker, } from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import schema from "./validation-schema";
import useStyles from "./styles"




function StepperForm(props) {
    const {handleSubmit, control, errors, register} = useForm({
        resolver: yupResolver(schema),
        reValidateMode:'onChange',
        defaultValues: {isInformationCorrect:null}
    })

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = ['User Basic Details', 'Address', 'Result'];

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmitCall = (data) => {
        console.log(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Grid container>
                    <form onSubmit={handleSubmit(handleSubmitCall)}>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} sm={6} md={6}>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    inputRef={register}
                                    placeholder="Enter your first name"
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>
                            <Grid item={true} xs={12} sm={6} md={6}>
                                <TextField
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    margin="normal"
                                    inputRef={register}
                                    name="lastName"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>
                            <Grid item={true} xs={12} sm={6} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        name="dob"
                                        helperText={errors.dob?.message}
                                        error={!!errors.dob}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date of birth"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        inputRef={register}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} sm={6} md={12}>
                                <Checkbox
                                    name="isInformationCorrect"
                                    color="primary"
                                    inputRef={register}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />
                                <label>All the information provided is correct?</label>
                            </Grid>
                        </Grid>
                        <Grid container={true} spacing={3}>
                            <Grid item={true} xs={12}>
                                <div className="cButton">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            case 1:
                return 'Address fields goes here!!';
            case 2:
                return 'Final Json Result';
            default:
                return 'Unknown step';
        }
    }

    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div>
                            {/*<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
                            {/*    Back*/}
                            {/*</Button>*/}
                            {/*<Button*/}
                            {/*    variant="contained"*/}
                            {/*    color="primary"*/}
                            {/*    onClick={handleNext}*/}
                            {/*    className={classes.button}*/}
                            {/*>*/}
                            {/*    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default StepperForm;
