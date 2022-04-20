import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function BlackList({ label, options, onChange, value }) {
  return (
    <Autocomplete
      className='mb-4'
      value={value}
      multiple
      options={options}
      getOptionLabel={(option) => option.title}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label={label}
          placeholder={label}
        />
      )}
    />
  );
}
