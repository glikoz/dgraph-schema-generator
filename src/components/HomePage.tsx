import React, { useEffect, useState } from "react";
import {
  Metadata,
  Repository,
  Property,
} from "../services/repository";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const PrimitiveTypes: string[] = ["ID", "String", "Boolean", "Int", "Float"];

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
      {options.map((e: string) => (
        <option value={e}>{e}</option>
      ))}
    </select>
  </div>
);

const FormButton = ({ text, onClick, color }: ButtonProps) => (
  <button
    className={"text-lg px-4 py-1 h-12 text-white rounded self-center " + color}
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
    setPropertyList((arr) => [...arr, prop]);
    console.log(propertyList);
    toast.success("Property Added!");
  };

  const createMetadata = () => {
    const md: Metadata = new Metadata();
    md.Name = nodeName;
    md.Properties = propertyList;
    console.log("Metadata", md);
    window.localStorage.setItem("nodemetadata", JSON.stringify(md));
    toast.success("Nodemetadata Created!");
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
          <FormButton
            text="Add Property"
            color="bg-pink-400"
            onClick={() => addProperty()}
          />
        </div>
        <div className="flex flex-col mt-8 items-start ml-8">
          <TitleH text="Properties" />
          <div className="flex flex-col ml-2 mt-4">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="w-full table-auto rounded">
                  <thead>
                    <tr className="bg-green-500 text-white uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {propertyList.map((e: any, index: number) => (
                      <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                        <td className="py-1 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              <FormText
                                value={propertyList[index].Name}
                                onChange={(a: any) => {
                                  let prop: Property = new Property();
                                  prop.Name = a.target.value;
                                  prop.Type = e.Type;
                                  propertyList[index] = prop;
                                  setPropertyList([...propertyList]);
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-left">
                          <div className="flex items-center">
                            <span>
                              <FormOption
                                options={PrimitiveTypes}
                                value={propertyList[index].Type}
                                onChange={(a: any) => {
                                  let prop: Property = new Property();
                                  prop.Name = e.Name;
                                  prop.Type = a.target.value;
                                  propertyList[index] = prop;
                                  setPropertyList([...propertyList]);
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-center items-center justify-center h-full">
                          <div className="flex items-center justify-items-center justify-center">
                            <MdDelete
                              size="25"
                              className=""
                              onClick={() => {
                                propertyList.splice(index, 1);
                                setPropertyList([...propertyList]);
                                toast.success("Property Deleted!");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <FormButton
          text="Create NodeMetadata"
          color="bg-indigo-500"
          onClick={() => createMetadata()}
        />
      </div>
    </div>
  );
}

export default HomePage;
