import React, { useEffect, useState } from "react";
import {
  EdgeMetadata,
  NodeMetadata,
  Repository,
  Property,
} from "../services/repository";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaLongArrowAltDown } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Title,
  Subtitle,
  FormText,
  TitleH,
  FormOption,
  FormButton,
} from "./UiComponents";

type EditNodeMetadataProps = {
  index: number;
  edgemetadata: EdgeMetadata;
  callbackMetadata: any;
};

function UpsertEdgeMetadata({
  index,
  edgemetadata,
  callbackMetadata,
}: EditNodeMetadataProps) {
  const [nodeMetadatas, setNodeMetadatas] = useState([] as NodeMetadata[]);
  const [edgeName, setEdgeName] = useState("");
  const [edgeInverseName, setEdgeInverseName] = useState("");
  const [fromNodeMetadatas, setFromNodeMetadatas] = useState(
    [] as NodeMetadata[]
  );
  const [toNodeMetadatas, setToNodeMetadatas] = useState([] as NodeMetadata[]);
  const [fromCount, setFromCount] = useState("1");
  const [toCount, setToCount] = useState("1");
  const [relationType, setRelationType] = useState("Please Select");

  useEffect(() => {
    getNodeMetadatas();
    setEdgeName(edgemetadata.Name);
    setEdgeInverseName(edgemetadata.InverseName);
    setFromNodeMetadatas(edgemetadata.From);
    setToNodeMetadatas(edgemetadata.To);
    setFromCount(edgemetadata.FromCount);
    setToCount(edgemetadata.ToCount);
    if (fromCount == "1" && toCount == "1") setRelationType("One To One");
    else if (fromCount == "1" && toCount == "N") setRelationType("One To Many");
    else if (fromCount == "N" && toCount == "N")
      setRelationType("Many To Many");
    else if (fromCount == "N" && toCount == "1") setRelationType("Many To One");
  }, []);

  const getNodeMetadatas = () => {
    const nodeMetadatasJson = window.localStorage.getItem("nodemetadatas");
    if (nodeMetadatasJson) {
      const nodeMetadatasObjects = JSON.parse(nodeMetadatasJson);
      setNodeMetadatas(nodeMetadatasObjects);
    }
  };

  const saveChanges = () => {
    const em: EdgeMetadata = new EdgeMetadata(
      edgeName,
      edgeInverseName,
      fromNodeMetadatas,
      toNodeMetadatas,
      fromCount,
      toCount
    );
    toast.success("Changes are saved!");
    callbackMetadata(em, index);
  };

  const createEdgeMetadata = () => {
    const em: EdgeMetadata = new EdgeMetadata(
      edgeName,
      edgeInverseName,
      fromNodeMetadatas,
      toNodeMetadatas,
      fromCount,
      toCount
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

  //Subcomponent For Reducing Code Repetition
  const EdgeConnections = ({
    isFrom,
    nodeMetadataFromTo,
  }: {
    isFrom: boolean;
    nodeMetadataFromTo: NodeMetadata[];
  }) => {
    const [newFromTo, setNewFromTo] = useState<NodeMetadata | null>(null);
    const [selectedNodeName, setSelectedNodeName] = useState("");

    const connectEmptyNode = () => {
      const nm: NodeMetadata = new NodeMetadata("", undefined);
      setNewFromTo(nm);
      toast.success("New Empty Node Added!");
    };

    return (
      <div className="flex flex-col mt-2 items-start w-full">
        <div className="flex items-center justify-between w-full">
          <TitleH text={isFrom ? "From" : "To"} />
          <FormButton
            text="Connect Node"
            color="bg-pink-400"
            onClick={() => {
              connectEmptyNode();
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
                  {nodeMetadataFromTo.map((e: any, index: number) => (
                    <tr
                      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                      key={index}
                    >
                      <td className="py-1 px-6 text-left">
                        <div className="flex items-center">
                          <span className="font-medium text-lg -mt-1">
                            <FormOption
                              options={nodeMetadatas.map((a) => a.Name)}
                              value={nodeMetadataFromTo[index].Name}
                              onChange={(a: any) => {
                                nodeMetadataFromTo.push(a.target.value);
                                isFrom
                                  ? setFromNodeMetadatas([
                                      ...nodeMetadataFromTo,
                                    ])
                                  : setToNodeMetadatas([...nodeMetadataFromTo]);
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
                              //TODO
                              nodeMetadataFromTo.splice(index, 1);
                              isFrom
                                ? setFromNodeMetadatas([...nodeMetadataFromTo])
                                : setToNodeMetadatas([...nodeMetadataFromTo]);
                              toast.success("Property Deleted!");
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {nodeMetadataFromTo.length === 0 && !newFromTo && (
                    <tr className="text-base font-semibold">
                      <span className="ml-4 text-gray-500">
                        No connections yet
                      </span>
                    </tr>
                  )}
                  {newFromTo && (
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
                                nodeMetadataFromTo.push(nm);
                                isFrom
                                  ? setFromNodeMetadatas([
                                      ...nodeMetadataFromTo,
                                    ])
                                  : setToNodeMetadatas([...nodeMetadataFromTo]);
                                toast.success("From Added!");
                                setNewFromTo(null);
                              } else toast.error("Error!");
                            }}
                          />
                          <MdDelete
                            size="25"
                            onClick={() => {
                              setNewFromTo(null);
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
    );
  };

  return (
    <div className=" md:text-3xl mx-8 py-4 rounded-lg w-full bg-white">
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
        <EdgeConnections isFrom={true} nodeMetadataFromTo={fromNodeMetadatas} />
        <div className="flex w-full justify-center items-center">
          <div
            className="bg-gray-300 w-full mt-8 mx-4"
            style={{ height: "1px" }}
          ></div>
          <div className="flex items-center justify-center">
            <FaLongArrowAltDown size="40" className="mt-4 text-gray-400" />
          </div>
          <div
            className="bg-gray-300 w-full mt-8 mx-4"
            style={{ height: "1px" }}
          ></div>
          <FormOption
            label="Relation Type"
            options={[
              "One To One",
              "One To Many",
              "Many To One",
              "Many To Many",
            ]}
            value={relationType}
            onChange={(a: any) => {
              setRelationType(a.target.value);

              switch (a.target.value) {
                case "One To Many":
                  setFromCount("1");
                  setToCount("N");
                  break;
                case "One To One":
                  setFromCount("1");
                  setToCount("1");
                  break;
                case "Many To Many":
                  setFromCount("N");
                  setToCount("N");
                  break;
                case "Many To One":
                  setFromCount("N");
                  setToCount("1");
                  break;
                default:
                  break;
              }
            }}
          />
          <div
            className="bg-gray-300 w-full mt-8 mx-4"
            style={{ height: "1px" }}
          ></div>
          <div className="flex items-center justify-center">
            <FaLongArrowAltDown size="40" className="mt-4 text-gray-400" />
          </div>
          <div
            className="bg-gray-300 w-full mt-8 mx-4"
            style={{ height: "1px" }}
          ></div>
        </div>
        <EdgeConnections isFrom={false} nodeMetadataFromTo={toNodeMetadatas} />

        <div className="flex justify-end">
          <FormButton
            text="Save Changes"
            color="bg-indigo-400"
            onClick={() => saveChanges()}
          />
        </div>
      </div>
    </div>
  );
}

export default UpsertEdgeMetadata;
