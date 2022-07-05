import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImportFileField } from '../../../../components/formFields/ImportFileField';
import { InputField } from '../../../../components/formFields/InputField';

const EditAccountForm = ({ onSubmit, initialValue, isClose }) => {
  const [avatar, setAvatar] = useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
  });

  const handleImportFileChange = (file) => {
    setAvatar(file);
  };

  const handleSubmitFormEdit = (formValues) => {
    const formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('address', formValues.address);
    formData.append('avatar', avatar);

    onSubmit(formData);
  };
  const style = {
    marginBottom: '20px',
  };

  const handleClickClose = () => {
    isClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitFormEdit)} className="myAccount-Form-Edit">
        <Box className="imageFieldWrapper" style={{ marginBottom: '25px' }}>
          <span className="imageFIeldTitle">Avatar</span>
          <ImportFileField
            onImportFileChange={handleImportFileChange}
            // urlImageCategory={(categoryInfo && categoryInfo.image) || null}
          />
        </Box>
        <InputField
          name="name"
          control={control}
          variant="outlined"
          autoComplete="off"
          placeholder="Name"
          label="Name"
          className="myAccount-Form-Input"
          style={style}
        />
        <InputField
          name="address"
          control={control}
          label="Address"
          variant="outlined"
          autoComplete="off"
          placeholder="Address"
          style={style}
          className="myAccount-Form-Input"
        />
        <Box
          width="100%"
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginTop: '10px' }}
        >
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleClickClose}
            autoFocus
          >
            Cancel
          </Button>
          <Button size="small" color="primary" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default EditAccountForm;
