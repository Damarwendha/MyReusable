import { StylesConfig } from "react-select";

type MyOptionType = {
  label: string;
  value: string;
};

type IsMulti = false;

export const reactSelectStyles: StylesConfig<MyOptionType, IsMulti> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--background)",
    border: state.isFocused
      ? "1.5px solid var(--brand)"
      : "1.5px solid hsl(var(--border))",
    transition: "all 0s",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--background)",
    border: "1px solid hsl(var(--border))",
    borderRadius: "var(--radius)",
    maxHeight: "35vh",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "35vh",
    padding: "4px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--foreground)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(var(--border))"
      : state.isFocused
      ? "hsl(var(--border)/ 0.7)"
      : "",
    color: "var(--foreground)",
    borderRadius: "var(--radius)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 450,
    ":active": {
      ...provided[":active"],
      backgroundColor: "hsl(var(--border))",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--foreground)",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};

{
  /* <Select
  classNames={{ menuList: () => "custom-scrollbar" }}
  id="payment_method"
  isSearchable={false}
  name="payment_method"
  onChange={(selectedOption) => field.onChange(selectedOption?.value)}
  options={payment_methods}
  placeholder="Select a payment method..."
  ref={field.ref}
  styles={reactSelectStyles}
  value={payment_methods.find((option) => option.value === field.value)}
/>; */
}
