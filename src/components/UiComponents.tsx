import { NodeMetadata } from "../services/repository";
type TextProps = {
  text: string;
};
type FormProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: any;
};
type SelectProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: any;
};
type ButtonProps = {
  onClick: any;
  text: string;
  color?: string;
};
export const Title = ({ text }: TextProps) => (
  <h1 className="text-3xl font-semibold">{text}</h1>
);
export const TitleH = ({ text }: TextProps) => (
  <h1 className="text-2xl font-semibold">{text}</h1>
);
export const Subtitle = ({ text }: TextProps) => (
  <h1 className="text-xl text-gray-300">{text}</h1>
);

export const FormText = ({
  label,
  placeholder,
  value,
  onChange,
}: FormProps) => (
  <div className="flex  flex-col items-start my-4">
    <label className="block text-gray-700 font-bold text-base mb-2">
      {label}
    </label>
    <input
      className="text-lg shadow border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const FormOption = ({
  label,
  options,
  value,
  onChange,
}: SelectProps) => (
  <div className="flex  flex-col items-start my-4">
    {label && (
      <label className="block text-gray-700 font-bold text-base mb-2">
        {label}:
      </label>
    )}
    <select
      className="border rounded h-10 px-4  text-lg font-normal"
      value={value}
      onChange={onChange}
    >
      <option value={"Please Select"} key={"defaut"}>
        {"Please Select"}
      </option>
      {options.map((e: string) => (
        <option value={e} key={e}>
          {e}
        </option>
      ))}
    </select>
  </div>
);

export const FormButton = ({ text, onClick, color }: ButtonProps) => (
  <div className="flex  flex-col items-start my-4">
    <button
      className={
        "text-lg px-4 py-1 h-10 text-white rounded self-center " + color
      }
      onClick={onClick}
    >
      {text}
    </button>
  </div>
);
