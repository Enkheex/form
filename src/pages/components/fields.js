import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { Autocomplete, Button, Checkbox, Input, InputLabel, MenuItem, Box, Switch, TextField } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// export function Field ({type, field, formField }){

// return (
//   <Controller
//     name={formField.name}
//     control={methods.control}
//     defaultValue={formField.defaultValue || ''}
//     render={({ field }) => (

//     )}
//   />
// );
// }

// const handleForm =(type, formfield)=> {

// switch(type) {
// case: 'text'
// return :

//  <Box>
//           <InputLabel>{formField.name}</InputLabel>
//           <TextField
//             {...field}
//             placeholder={formField.name}
//             variant="outlined"
//             fullWidth
//             error={Boolean(methods.formState.errors[formField.name])}
//             helperText={methods.formState.errors[formField.name]?.message}
//           />
//         </Box>
// case: 'password'
// return:
// break

// default

// }

// }
export function renderTextField(formField, methods) {
  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || ''}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <TextField
            {...field}
            placeholder={formField.name}
            variant="outlined"
            fullWidth
            error={Boolean(methods.formState.errors[formField.name])}
            helperText={methods.formState.errors[formField.name]?.message}
          />
        </Box>
      )}
    />
  );
}

export function renderDropdown(formField, methods) {
  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || ''}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <TextField
            select
            variant="outlined"
            fullWidth
            placeholder={formField.name}
            {...field}
            error={Boolean(methods.formState.errors[formField.name])}
            helperText={methods.formState.errors[formField.name]?.message}
          >
            {formField.option.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );
}

export function renderSwitch(formField, methods) {
  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || false}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Switch {...field} />
        </Box>
      )}
    />
  );
}

export function renderCheckbox(formField, methods) {
  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || false}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Checkbox {...field} />
        </Box>
      )}
    />
  );
}

export function renderAutocomplete(formField, methods) {
  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || []}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Autocomplete
            options={formField.option}
            value={field.value || []}
            onChange={(event, newValue) => {
              methods.setValue(formField.name, newValue);
            }}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder={formField.name}
                variant="outlined"
                fullWidth
                error={Boolean(methods.formState.errors[formField.name])}
                helperText={methods.formState.errors[formField.name]?.message}
              />
            )}
          />
        </Box>
      )}
    />
  );
}

export function renderCV(formField, methods) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    methods.setValue(formField.name, file);
  };

  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || ''}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Button fullWidth variant="contained" component="label">
            Choose File
            <Input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </Button>
          {field.value && <p>Selected file: {field.value.name}</p>}
          {methods.formState.errors[formField.name] && <p style={{ color: 'red' }}>{methods.formState.errors[formField.name].message}</p>}
        </Box>
      )}
    />
  );
}

export function RenderZurag(formField, methods) {
  const [imageUrl, setImageUrl] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    methods.setValue(formField.name, file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || ''}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Button variant="contained" component="label" fullWidth>
            Choose File
            <Input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>{imageUrl && <Image src={imageUrl} alt="img" height={200} width={200} />}</Box>
          {methods.formState.errors[formField.name] && <p style={{ color: 'red' }}>{methods.formState.errors[formField.name].message}</p>}
        </Box>
      )}
    />
  );
}

export function RenderEditor(formField, methods, editorType) {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const handelEdit = (newContent) => {
    setContent(newContent);
    methods.setValue(formField.name, newContent);
  };

  return (
    <Controller
      name={formField.name}
      control={methods.control}
      defaultValue={formField.defaultValue || ''}
      render={({ field }) => (
        <Box>
          <InputLabel>{formField.name}</InputLabel>
          <Box>
            {editorType === 'quill' ? (
              <ReactQuill value={content} onChange={handelEdit} />
            ) : (
              <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
            )}
          </Box>
        </Box>
      )}
    />
  );
}
