import React, { useEffect, useState } from "react";
import {
  EdgeMetadata,
  NodeMetadata,
  Repository,
  Property,
} from "../services/repository";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

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
  edgemetadata: EdgeMetadata;
  callbackMetadata: any;
};
// From: EdgeMetadata[] = [];
//   To: EdgeMetadata[] = [];
//   Name: string = "";
//   InverseName: string = "";
function UpsertEdgeMetadata({
  index,
  edgemetadata,
  callbackMetadata,
}: EditNodeMetadataProps) {
  const [nodeMetadatas, setNodeMetadatas] = useState([] as NodeMetadata[]);
  const [edgeName, setEdgeName] = useState("");
  const [edgeInverseName, setEdgeInverseName] = useState("");
  const [fromNoteMetadatas, setFromNodeMetadatas] = useState(
    [] as NodeMetadata[]
  );
  const [toNoteMetadatas, setToNodeMetadatas] = useState([] as NodeMetadata[]);
  const [newFrom, setNewFrom] = useState<NodeMetadata | null>(null);
  const [newTo, setNewTo] = useState<NodeMetadata | null>(null);
  const [selectedNodeName, setSelectedNodeName] = useState("");

  useEffect(() => {
    getNodeMetadatas();
    setEdgeName(edgemetadata.Name);
    setEdgeInverseName(edgemetadata.InverseName);
    setFromNodeMetadatas(edgemetadata.From);
    setToNodeMetadatas(edgemetadata.To);
  }, []);

  const getNodeMetadatas = () => {
    const nodeMetadatasJson = window.localStorage.getItem("nodemetadatas");
    if (nodeMetadatasJson) {
      const nodeMetadatasObjects = JSON.parse(nodeMetadatasJson);
      setNodeMetadatas(nodeMetadatasObjects);
    }
  };

  const connectEmptyNode = (isFrom: boolean) => {
    const nm: NodeMetadata = new NodeMetadata("", undefined);
    isFrom ? setNewFrom(nm) : setNewTo(nm);
    toast.success("New Empty Node Added!");
  };

  const saveChanges = () => {
    const em: EdgeMetadata = new EdgeMetadata(
      edgeName,
      edgeInverseName,
      fromNoteMetadatas,
      toNoteMetadatas
    );
    callbackMetadata(em, index);
    setNewFrom(null);
  };

  const createEdgeMetadata = () => {
    const em: EdgeMetadata = new EdgeMetadata(
      edgeName,
      edgeInverseName,
      fromNoteMetadatas,
      toNoteMetadatas
    );
    console.log("Metadata", em);

    const edgeMetadatas = window.localStorage.getItem("edgemetadatas");

    if (edgeMetadatas != null) {
      const edgeMetadataObjects: EdgeMetadata[] = JSON.parse(edgeMetadatas);
      edgeMetadataObjects.push(em);
      window.localStorage.setItem(
        "edgemetadatas",
        JSON.stringify(edgeMetadataObjects)
      );
    } else {
      const edgeMetadataObjects: EdgeMetadata[] = [em];
      window.localStorage.setItem(
        "edgemetadatas",
        JSON.stringify(edgeMetadataObjects)
      );
    }
    toast.success("EdgeMetadata Created!");
    clearForms();
  };

  const clearForms = () => {
    setEdgeName("");
    setEdgeInverseName("");
    setFromNodeMetadatas([]);
    setToNodeMetadatas([]);
  };

  return (
    <div
      className=" md:text-3xl mx-8 py-4 rounded-lg w-full"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex space-x-8">
        <FormText
          label="Edge Name:"
          placeholder="Teaches"
          value={edgeName}
          onChange={(e: any) => setEdgeName(e.target.value)}
        />
        <FormText
          label="Inverse Edge Name:"
          placeholder="Teached By"
          value={edgeInverseName}
          onChange={(e: any) => setEdgeInverseName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start rounded px-4 border">
        <div className="flex" style={{ alignItems: "flex-end" }}></div>
        <div className="flex flex-col mt-2 items-start w-full">
          <div className="flex items-center justify-between w-full">
            <TitleH text="From" />
            <FormButton
              text="Connect Node"
              color="bg-pink-400"
              onClick={() => {
                connectEmptyNode(true);
              }}
            />
          </div>
          <div className="flex flex-col ml-2">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="w-full table-auto rounded">
                  <thead>
                    <tr className="bg-green-500 text-white uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {fromNoteMetadatas.map((e: any, index: number) => (
                      <tr
                        className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                        key={index}
                      >
                        <td className="py-1 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              <FormOption
                                options={nodeMetadatas.map((a) => a.Name)}
                                value={fromNoteMetadatas[index].Name}
                                onChange={(a: any) => {
                                  fromNoteMetadatas.push(a.target.value);
                                  setFromNodeMetadatas([...fromNoteMetadatas]);
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-center items-center justify-center h-full">
                          <div className="flex items-center justify-items-center justify-center">
                            <MdDelete
                              size="25"
                              onClick={() => {
                                toast.success("Property Deleted!");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                    {fromNoteMetadatas.length === 0 && !newFrom && (
                      <tr className="text-base font-semibold">
                        <span className="ml-4 text-gray-500">
                          No properties yet
                        </span>
                      </tr>
                    )}
                    {newFrom && (
                      <tr
                        className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                        key={index}
                      >
                        <td className="py-1 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              <FormOption
                                options={nodeMetadatas.map((a) => a.Name)}
                                value={selectedNodeName}
                                onChange={(a: any) => {
                                  setSelectedNodeName(a.target.value);
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-center items-center justify-center h-full">
                          <div className="flex items-center justify-items-center justify-center space-x-2">
                            <FaCheck
                              size="25"
                              onClick={() => {
                                const nm: NodeMetadata | undefined =
                                  nodeMetadatas.find(
                                    (x) => x.Name === selectedNodeName
                                  );
                                if (nm) {
                                  fromNoteMetadatas.push(nm);
                                  setFromNodeMetadatas([...fromNoteMetadatas]);
                                  toast.success("From Added!");
                                  setNewFrom(null);
                                } else toast.error("Error!");
                              }}
                            />
                            <MdDelete
                              size="25"
                              onClick={() => {
                                setNewFrom(null);
                                setSelectedNodeName("");
                                toast.success("New Node Deleted!");
                              }}
                            />
                          </div>
                        </td>
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

export default UpsertEdgeMetadata;
