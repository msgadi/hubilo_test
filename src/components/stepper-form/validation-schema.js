import * as yup from "yup";
import {addDays, format} from "date-fns";

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is a required field'),
    lastName: yup.string().required('Last Name is a required field'),
    dob: yup
        .date()
        .typeError("")
        .nullable()
        .max(
            format(addDays(new Date(), 1), "MM/dd/yyyy"),
            "Birth date cannot be greater than today."
        )
        .min(new Date("01/01/1900"), "Special characters are not allowed."),
    isInformationCorrect: yup.bool().oneOf([true], 'Please check the box if information is correct!').required('Please check the box if information is correct!')
});

export default schema
