import React, { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { Autocomplete, Button, Checkbox, Input, InputLabel, MenuItem, Box, Switch, TextField } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { useImageInput } from './base64';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const handleDefaultValue = (id) => {
  try {
    let defVal = '';

    switch (id) {
      case '109':
        defVal = false;
        break;
      case '108':
        defVal = false;
        break;
      case '105':
        defVal = [];
      case '102':
        defVal = null;
      default:
        defVal = '';
    }

    return defVal;
  } catch (e) {
    return;
  }
};

const GenerateController = (formField, methods, id) => (
  <Controller
    key={formField.name}
    name={formField.name}
    control={methods.control}
    defaultValue={formField.defaultValue || handleDefaultValue(id)}
    render={({ field }) => (
      <Box>
        <InputLabel>{formField.name}</InputLabel>
        {field}
      </Box>
    )}
  />
);

const Render = ({ id, field, formField, methods }) => {
  switch (id) {
    case '103':
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
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
    case '109':
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
          render={({ field }) => (
            <Box>
              <InputLabel>{formField.name}</InputLabel>
              <Switch {...field} />
            </Box>
          )}
        />
      );
    case '108':
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
          render={({ field }) => (
            <Box>
              <InputLabel>{formField.name}</InputLabel>
              <Checkbox {...field} />
            </Box>
          )}
        />
      );
    case '105':
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
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
    case '106':
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        methods.setValue(formField.name, file);
      };
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
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
    case '107':
      const [imageUrl, setImageUrl] = useState();
      const { imageBase64, handleImageInputChange } = useImageInput();

      const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        methods.setValue(formField.name, file);

        try {
          const reader = new FileReader();

          reader.onload = async () => {
            const result = reader.result;
            setImageUrl(result);
            console.log(result);
          };

          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error converting to base64:', error);
        }
      };

      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
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
    case '110':
      const editor = useRef(null);
      const [content, setContent] = useState('');

      const handleEditorChange = (newContent) => {
        setContent(newContent);
        methods.setValue(formField.name, newContent);
      };

      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
          render={({ field }) => (
            <Box>
              <InputLabel>{formField.name}</InputLabel>
              <Box>
                {formField.editorType === 'quill' ? (
                  <ReactQuill value={content} onChange={handleEditorChange} />
                ) : (
                  <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
                )}
              </Box>
            </Box>
          )}
        />
      );
    default:
      return (
        <Controller
          name={formField.name}
          control={methods.control}
          defaultValue={formField.defaultValue || handleDefaultValue(id)}
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
};

export default Render;
