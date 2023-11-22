import { FC } from 'react';

interface FilterOption {
  label: string;
  URLValue: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

const Filter: FC<FilterProps> = ({ filterField, options }) => {
  const searchParams = new URLSearchParams(window.location.search);

  function handleClick(URLValue: string) {
    searchParams.set(filterField, URLValue);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  }

  const URLActive = searchParams.get(filterField) || options[0].URLValue;

 // This JSX does not include any styling. Feel free to substitute it with your preferred styling or a UI library. 
  return (
    <div>
      {options.map((option) => (
        <button
          key={option.URLValue}
          className={option.URLValue === URLActive ? 'active' : ''}
          onClick={() => handleClick(option.URLValue)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
