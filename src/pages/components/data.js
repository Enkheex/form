const profession = [
  { label: 'Emch' },
  { label: 'Tsagdaa' },
  { label: 'Engineer' },
  { label: 'Tsahilgaanch' },
  { label: 'Zasvarchin' },
  { label: 'Barilgachin' },
  { label: 'Bagsh' },
];

const dataFetch = () => {
  let data = {
    title: 'Form',
    data: [
      {
        id: '100',
        name: 'Username',
        type: 'text',
        option: [],
        valueOption: 'single',
        defaultValue: null,
        required: true,
        schema: '',
      },
      {
        id: '101',
        name: 'Password',
        type: 'password',
        option: [],
        valueOption: 'single',
        defaultValue: null,
      },
      {
        id: '102',
        name: 'ID',
        type: 'number',
        option: [],
        valueOption: 'single',
        defaultValue: null,
      },
      {
        id: '103',
        name: 'Songo',
        type: 'dropdown',
        option: ['yes', 'no'],
        defaultValue: null,
      },
      {
        id: '104',
        name: 'Email',
        type: 'email',
        option: [],
        valueOption: 'single',
        defaultValue: null,
      },
      {
        id: '105',
        name: 'Mergejil',
        type: 'autocomplete',
        option: profession.map((item) => item.label),
        valueOption: 'multi',
        defaultValue: [],
      },
      {
        id: '106',
        name: 'CV',
        type: 'file',
        defaultValue: null,
      },
      {
        id: '107',
        name: 'Zurag',
        type: 'file',
        defaultValue: null,
      },
      {
        id: '108',
        name: 'Remember',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        id: '109',
        name: 'Accept',
        type: 'switch',
        defaultValue: false,
      },
      {
        id: '110',
        name: 'Editor',
        editorType: 'quill',
      },
    ],
    buttonName: 'Submit',
  };
  return data;
};
export { dataFetch };
