import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../../components/formFields/InputField';

const EditAccountForm = ({ onSubmit, initialValue, isClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
  });
  const handleSubmitFormEdit = (Formvalue) => {
    onSubmit(Formvalue);
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
