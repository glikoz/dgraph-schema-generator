import React, { useEffect, useState } from "react";
import { NodeMetadata } from "../services/repository";
import { MdDelete, MdEdit } from "react-icons/md";
import EditNodeMetadata from "./EditNodeMetadata";
import { toast } from "react-toastify";
import { Title, Subtitle, TitleH, FormButton } from "./UiComponents";

function ListNodes() {
  const [nodeMetadatas, setNodeMetadatas] = useState([] as NodeMetadata[]);
  const [showEdit, setShowEdit] = useState([] as boolean[]);
  const [newNode, setNewNode] = useState<NodeMetadata | null>(null);

  useEffect(() => {
    getNodeMetadatas();
  }, []);

  const getNodeMetadatas = () => {
    const nodeMetadatasJson = window.localStorage.getItem("nodemetadatas");
    if (nodeMetadatasJson != null) {
      const nodeMetadataObjects: NodeMetadata[] = JSON.parse(nodeMetadatasJson);
      setNodeMetadatas(nodeMetadataObjects);
      const showEditList: boolean[] = new Array(
        nodeMetadataObjects.length
      ).fill(false);
      setShowEdit(showEditList);
    }
  };

  const createEmptyNodeMetadata = () => {
    let newNodeMetadata: NodeMetadata = new NodeMetadata("", undefined);
    setNewNode(newNodeMetadata);
  };

  const saveNewNode = (nm: NodeMetadata, index: number) => {
    setNewNode(null);
    nodeMetadatas.push(nm);
    setNodeMetadatas([...nodeMetadatas]);
    window.localStorage.setItem("nodemetadatas", JSON.stringify(nodeMetadatas));
    const showEditList: boolean[] = new Array(nodeMetadatas.length).fill(false);
    setShowEdit(showEditList);
  };

  const updateNode = (nodeMetadata: NodeMetadata, index: number) => {
    nodeMetadatas[index] = nodeMetadata;
    setNodeMetadatas([...nodeMetadatas]);
    window.localStorage.setItem("nodemetadatas", JSON.stringify(nodeMetadatas));
  };

  return (
    <div className=" mx-20 fluid  md:text-3xl px-20 py-8 rounded-lg w-full bg-white">
      <div className="flex flex-col items-start space-y-4 text-gray-800">
        <Title text="List Node Metadatas" />
        <Subtitle text="You can list all node metadatas and in here and edit their properties" />
      </div>
      <div className="flex flex-col mt-8 items-start">
        <div className="flex items-center w-full justify-between items-between">
          <TitleH text="Node Metadatas" />
          <FormButton
            text="Add Node"
            color="bg-indigo-400"
            onClick={() => createEmptyNodeMetadata()}
          />
        </div>
        <div className="flex flex-col ml-2 mt-4">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-fixed rounded">
                <thead>
                  <tr className="bg-green-500 text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-3/4">Name</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {nodeMetadatas.map((e: any, index: number) => (
                    <>
                      <tr
                        className="border-b  h-64 border-gray-200 bg-gray-50 hover:bg-gray-100"
                        key={index}
                      >
                        <td className="py-1 px-6 text-left h-12">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              {e.Name}
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-center items-center justify-center h-full">
                          <div className="flex items-center justify-items-center justify-center space-x-2">
                            <MdEdit
                              size="25"
                              className=""
                              onClick={() => {
                                showEdit[index] = !showEdit[index];
                                setShowEdit([...showEdit]);
                              }}
                            />
                            <MdDelete
                              size="25"
                              className=""
                              onClick={() => {
                                nodeMetadatas.splice(index, 1);
                                setNodeMetadatas([...nodeMetadatas]);
                                window.localStorage.setItem(
                                  "nodemetadatas",
                                  JSON.stringify(nodeMetadatas)
                                );
                                toast.success("NodeMetadata Deleted!");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      {showEdit[index] && (
                        <div className="flex">
                          <EditNodeMetadata
                            nodemetadata={e}
                            index={index}
                            callbackMetadata={(e) => updateNode(e, index)}
                          />
                        </div>
                      )}
                    </>
                  ))}
                  {newNode && (
                    <>
                      <tr
                        className="border-b  h-64 border-gray-200 bg-gray-50 hover:bg-gray-100"
                        key={"new"}
                      >
                        <td className="py-1 px-6 text-left h-12">
                          <div className="flex items-center">
                            <span className="font-medium text-lg -mt-1">
                              New NodeMetadata Panel
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-6 text-center items-center justify-center h-full">
                          <div className="flex items-center justify-items-center justify-center space-x-2">
                            <MdDelete
                              size="25"
                              onClick={() => {
                                setNewNode(null);
                                toast.success("New NodeMetadata Deleted!");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      <div className="flex">
                        <EditNodeMetadata
                          nodemetadata={new NodeMetadata("", undefined)}
                          index={nodeMetadatas.length}
                          callbackMetadata={(e) =>
                            saveNewNode(e, nodeMetadatas.length)
                          }
                        />
                      </div>
                    </>
                  )}
                  {nodeMetadatas.length === 0 && (
                    <tr className="text-base font-semibold">
                      <span className="ml-4 text-gray-500">
                        No node metadatas yet
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
  );
}
export default ListNodes;