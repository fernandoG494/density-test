import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
    // form state
    const [formState, setFormState] = useState(initialForm);
    // form values to valid
    const [formValidation, setFormValidation] = useState({});

    // first effect to create validators from the form state
    useEffect(() => {
        createValidators();
    }, [ formState ]);

    // second effect to set initial form in form state
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ]); // changes every form values that enter

    // check if form values are valid
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [ formValidation ]); // changes every form values

    // if form values (input) changes, to set the new values to the state
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    };

    // if the form is reset, set initial state 
    const onResetForm = () => {
        setFormState( initialForm );
    };

    // create validator functions
    const createValidators = () => {
        const formCheckedValues = {};
        // fro every value in the formValidators that enter the hook
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        };
        setFormValidation( formCheckedValues );
    };

    // return values from the hook
    return {
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation,
        ...formState,
    };
};
