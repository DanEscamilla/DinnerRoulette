import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function BlackList({ label, options }) {
  return (
    <Autocomplete
      className='mb-4'
      multiple
      options={options}
      getOptionLabel={(option) => option.title}
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
