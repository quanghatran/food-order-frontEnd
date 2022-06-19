import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../formFields/InputField';

const SearchDebouce = ({ initialValue, onSubmit, width }) => {
  const { control } = useForm({
    defaultValues: initialValue,
  });
  const TimerRef = useRef(null);
  const handleChange = (e) => {
    const value = e.target.value;
    if (!onSubmit) return;
    if (TimerRef.current) {
      clearTimeout(TimerRef.current);
    }
    TimerRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      console.log(formValue);
      onSubmit(formValue);
    }, 800);
  };
  const style = {
    color: '#666C72',
    width: width,
    '&::before': {
      borderBottom: '0px !important',
    },
  };
  return (
    <form className="searchBar-admin">
      <InputField
        type="text"
        control={control}
        onChange={handleChange}
        variant="outlined"
        name="search"
        placeholder="Search Product"
        style={style}
        autoComplete="off"
      />
    </form>
  );
};
export default SearchDebouce;
