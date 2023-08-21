import { useState } from 'react';

export function useImageInput(defaultValue = '') {
  const [imageBase64, setImageBase64] = useState(defaultValue);

  const handleImageInputChange = (event) => {
    const base64File = event.target.value;
    setImageBase64(base64File);
  };

  return { imageBase64, handleImageInputChange };
}
