import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import uploadFile from '../../assets/images/common/uploadFile.svg';
// import { AdminInputField } from './AdminInputField';
import './importFileField.scss';
import React from 'react';

export const ImportFileField = ({ onImportFileChange, urlImageCategory }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameImage, setNameImage] = useState('');

  const Input = styled('input')({
    display: 'none',
  });

  const handleImportImageChange = (event) => {
    if (Boolean(event.target.accept)) {
      setNameImage(event.target.files[0].name);
      setSelectedImage(event.target.files[0]);
      onImportFileChange(event.target.files[0]);
    } else {
      setNameImage(event.target.value);
      setSelectedImage(null);
      onImportFileChange(event.target.value);
    }
  };

  return (
    <div className="importFileFieldWrapper">
      <div className="imageWrapper">
        {selectedImage ? (
          <img
            alt="not_found"
            className="imageImportFile"
            src={URL.createObjectURL(selectedImage)}
          />
        ) : (
          <img
            alt="upload_file"
            width="100"
            height="100"
            className="imageImportFile"
            src={urlImageCategory || uploadFile}
          />
        )}
      </div>

      <label htmlFor="contained-button-file">
        <div className="btnTextFieldWrapper">
          <Button variant="contained" component="span" size="small">
            Choose File
          </Button>
        </div>
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          name="myImage"
          onChange={(e) => handleImportImageChange(e)}
        />
      </label>
    </div>
  );
};
