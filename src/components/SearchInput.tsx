import { useRecoilState } from 'recoil';
import { inputState } from '../recoil/searchInput';

const SearchInput = () => {
  const [value, setValue] = useRecoilState(inputState);
  return (
    <input
      data-testid="name_input"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="form-control mx-auto"
      placeholder="Album name"
    />
  );
};

export default SearchInput;
