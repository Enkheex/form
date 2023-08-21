import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useFormMethods } from './components/formconfig';
// import {
//   renderTextField,
//   renderDropdown,
//   renderSwitch,
//   renderCheckbox,
//   renderAutocomplete,
//   renderCV,
//   renderZurag,
//   renderEditor,
//   renderEditor2,
// } from './components/fields';
import { dataFetch } from './components/data';
// import Render from './components/render';
import GenerateController from './components/render';

const { title, data, buttonName } = dataFetch();

export default function Aaa() {
  const methods = useFormMethods({});
  useEffect(() => {
  console.log('loog', methods.getValues());
}, [methods]);

const onSubmit = (formData) => {
  alert('Success!');

  console.log('submit', methods.getValues());
  // console.log(formData);
};

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f0f0',
        borderRadius: 8,
        padding: '16px',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', my: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          width: '100%',
          bgcolor: 'white',
          borderRadius: 8,
          padding: '16px',
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {data.map((formField) => (
              <GenerateController
                key={formField.id}
                id={formField.id}
                field={formField}
                formField={formField}
                methods={methods}
                error={methods.formState.errors[formField.name]}
              />
            ))}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="contained" color="primary" size="large" type="submit">
                {buttonName}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
}
