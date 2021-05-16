import React, { useEffect, useState } from "react";
import { Metadata, Repository, Property } from "../services/repository";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  Title,
  Subtitle,
  FormText,
  TitleH,
  FormOption,
  FormButton,
} from "./UiComponents";

const PrimitiveTypes: string[] = ["ID", "String", "Boolean", "Int", "Float"];
const defaultProperties: Property[] = [new Property("Id", "ID")];

type EditNodeMetadataProps = {
  index: number;
  nodemetadata: Metadata;
  callbackMetadata: any;
};

function EditNodeMetadata({
  index,
  nodemetadata,
  callbackMetadata,
}: EditNodeMetadataProps) {
  const [nodeName, setNodeName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("String");
  const [propertyList, setPropertyList] = useState(
    defaultProperties as Property[]
  );
  const [showNewProperty, setShowNewProperty] = useState(false);

  useEffect(() => {
    setNodeName(nodemetadata.Name);
    setPropertyList(nodemetadata.Properties);
    // let rep: Repository = new Repository();
    // rep.UpsertMetadata(new Metadata());
  }, []);

  const addProperty = () => {
    const prop: Property = {
      Type: propertyType,
      Name: propertyName,
    };
    setPropertyList((arr) => [...arr, prop]);
    setPropertyName("");
    setPropertyType("String");
    console.log(propertyList);
    toast.success("Property Added!");
  };
  const saveChanges = () => {
    const md: Metadata = new Metadata(nodeName, propertyList);
    callbackMetadata(md,index);
  };
  const createMetadata = () => {
    const md: Metadata = new Metadata(nodeName, propertyList);
    console.log("Metadata", md);

    const nodeMetadatas = window.localStorage.getItem("nodemetadatas");

    if (nodeMetadatas != null) {
      const nodeMetadataObjects: Metadata[] = JSON.parse(nodeMetadatas);
      nodeMetadataObjects.push(md);
      window.localStorage.setItem(
        "nodemetadatas",
        JSON.stringify(nodeMetadataObjects)
      );
    } else {
      const nodeMetadataObjects: Metadata[] = [md];
      window.localStorage.setItem(
        "nodemetadatas",
        JSON.stringify(nodeMetadataObjects)
      );
    }
    toast.success("Nodemetadata Created!");
    clearForms();
  };

  const clearForms = () => {
    setNodeName("");
    setPropertyName("");
    setPropertyType("");
    setPropertyList(defaultProperties);
  };

  return (
    <div
      className=" md:text-3xl mx-8 py-4 rounded-lg w-full"
      style={{ backgroundColor: "white" }}
    >
      <FormText
        label="Name:"
        placeholder="Student"
        value={nodeName}
        onChange={(e: any) => setNodeName(e.target.value)}
      />
      <div className="flex flex-col items-start rounded p-4 border">
        <div className="flex" style={{ alignItems: "flex-end" }}></div>
        <div className="flex flex-col mt-8 items-start">
          <div className="flex items-center justify-between w-full">
            <TitleH text="Properties" />
            <FormButton
              text="Add New Property"
              color="bg-pink-400"
              onClick={() => {
                setShowNewProperty(!showNewProperty);
              }}
            />
          </div>
          {showNewProperty && (
            <div className="flex flex-col items-start my-12 border rounded p-8">
              <TitleH text="Add Property" />
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
                <div className="flex" style={{ alignItems: "flex-end" }}>
                  <FormButton
                    text="Add Property"
                    color="bg-pink-400"
                    onClick={() => addProperty()}
                  />
                </div>
              </div>
            </div>
          )}
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
                      <tr
                        className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                        key={index}
                      >
                        <td className="py-1 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              <FormText
                                value={propertyList[index].Name}
                                onChange={(a: any) => {
                                  let prop: Property = new Property(
                                    a.target.value,
                                    e.Type
                                  );
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
                                  let prop: Property = new Property(
                                    e.Name,
                                    a.target.value
                                  );
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
                    {propertyList.length === 0 && (
                      <tr className="text-base font-semibold">
                        <span className="ml-4 text-gray-500">
                          No properties yet
                        </span>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          text="Save Changes"
          color="bg-indigo-400"
          onClick={() => saveChanges()}
        />
      </div>
    </div>
  );
}

export default EditNodeMetadata;
