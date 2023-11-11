import Datepicker from "react-tailwindcss-datepicker";

const CustomDatePicker = ({ value, onChange }) => {
  return (
    <Datepicker
      toggleClassName="hidden"
      containerClassName="outline outline-1 rounded-md mx-[0.1rem]"
      placeholder=""
      asSingle
      popoverDirection="down"
      useRange={false}
      primaryColor="amber"
      value={value}
      separator="/"
      displayFormat="DD/MM/YYYY"
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};

export default CustomDatePicker;
