import React, { useEffect, useState } from "react";
import {
  Metadata,
  Repository,
  Scalars,
  Property,
} from "../services/repository";

const PrimitiveTypes: string[] = ["ID", "String", "Boolean", "Int", "Float"];

type TextProps = {
  text: string;
};
type FormProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
};
type SelectProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: any;
};
type ButtonProps = {
  onClick: any;
  text: string;
};
const Title = ({ text }: TextProps) => <h1 className="text-3xl">{text}</h1>;
const TitleH = ({ text }: TextProps) => <h1 className="text-2xl">{text}</h1>;
const Subtitle = ({ text }: TextProps) => (
  <h1 className="text-xl text-gray-300">{text}</h1>
);

const FormText = ({ label, placeholder, value, onChange }: FormProps) => (
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

const FormOption = ({ label, options, value, onChange }: SelectProps) => (
  <div className="flex  flex-col items-start my-4">
    <label className="block text-gray-700 font-bold text-base mb-2">
      {label}:
    </label>
    <select
      className="border rounded h-10 px-4  text-lg font-normal"
      value={value}
      onChange={onChange}
    >
      {options.map((e: string) => (
        <option value={e}>{e}</option>
      ))}
    </select>
  </div>
);

const FormButton = ({ text, onClick }: ButtonProps) => (
  <button
    className="text-lg px-4 py-1 h-12 text-white bg-pink-400 rounded self-center"
    onClick={onClick}
  >
    {text}
  </button>
);

function HomePage() {
  const [nodeName, setNodeName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("String");
  const [propertyList, setPropertyList] = useState([] as Property[]);

  useEffect(() => {
    let rep: Repository = new Repository();
    rep.UpsertMetadata(new Metadata());
  }, []);

  const addProperty = () => {
    const prop: Property = {
      Type: propertyType,
      Name: propertyName,
    };
    propertyList.push(prop);
    console.log(propertyList);
  };

  const createMetadata = () => {
    const md: Metadata = new Metadata();
    md.Name = propertyType;
    md.Properties = propertyList;
    console.log("Metadata", md);
  };

  return (
    <div className="container mx-20 fluid mt-12 md:text-3xl">
      <div className="flex flex-col items-start space-y-4 text-gray-800">
        <Title text="Create NodeMetadata (Metadata)" />
        <Subtitle text="You can create node metadatas and assign their properties in here" />
      </div>
      <FormText
        label="Name:"
        placeholder="Student"
        value={nodeName}
        onChange={(e: any) => setNodeName(e.target.value)}
      />
      <div className="flex flex-col items-start my-12 border rounded h-full p-8">
        <TitleH text="Add Properties To Node" />
        <div className="flex space-x-12">
          <FormText
            label="Property Name:"
            placeholder="Student Name"
            value={propertyName}
            onChange={(e: any) => setPropertyName(e.target.value)}
          />
          <FormOption
            label="Property Type"
            placeholder="String"
            options={PrimitiveTypes}
            value={propertyType}
            onChange={(e: any) => setPropertyType(e.target.value)}
          />
          <FormButton text="Add Property" onClick={() => addProperty()} />
        </div>
        <div className="flex flex-col mt-8">
          <TitleH text="Properties" />
          <div className="flex ml-8 mt-4">
            {propertyList.map((e: any) => (
              <div className="flex">
                <p className="text-lg font-semibold ">
                  {e.propertyName} - {e.propertyType}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
