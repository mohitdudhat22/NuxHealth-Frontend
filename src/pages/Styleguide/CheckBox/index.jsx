import { NHCheckbox } from "@/components";

export const CheckBox = () => {
  return (
    <>
      <div>
        <h3>Without Label</h3>
        <NHCheckbox></NHCheckbox>
      </div>
      <div>
        <h3>With Label</h3>
        <NHCheckbox>Hello</NHCheckbox>
      </div>
    </>
  );
};