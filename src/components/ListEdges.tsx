import React, { useEffect, useState } from "react";
import { EdgeMetadata } from "../services/repository";
import { MdDelete, MdEdit } from "react-icons/md";
import UpsertEdgeMetadata from "./UpsertEdgeMetadata";
import { toast } from "react-toastify";
import { Title, Subtitle, TitleH, FormButton } from "./UiComponents";

function ListEdges() {
  const [edgeMetadatas, setEdgeMetadatas] = useState([] as EdgeMetadata[]);
  const [showEdit, setShowEdit] = useState([] as boolean[]);

  useEffect(() => {
    getEdgeMetadatas();
  }, []);

  const getEdgeMetadatas = () => {
    const edgeMetadatasJson = window.localStorage.getItem("edgemetadatas");
    if (edgeMetadatasJson != null) {
      const edgeMetadataObjects: EdgeMetadata[] = JSON.parse(edgeMetadatasJson);
      setEdgeMetadatas(edgeMetadataObjects);
      const showEditList: boolean[] = new Array(
        edgeMetadataObjects.length
      ).fill(false);
      setShowEdit(showEditList);
    }
  };

  const updateNode = (em: EdgeMetadata, index: number) => {
    edgeMetadatas[index] = em;
    setEdgeMetadatas([...edgeMetadatas]);
    window.localStorage.setItem("edgemetadatas", JSON.stringify(edgeMetadatas));
  };
  
  const createEdge = () => {
    
  }
   const saveNewEdge = (em: EdgeMetadata,index: number) => {
    
  }
  return (
    <div
      className=" mx-20 fluid  md:text-3xl px-20 py-8 rounded-lg w-full"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex flex-col items-start space-y-4 text-gray-800">
        <Title text="List Edge Metadatas" />
        <Subtitle text="You can list all edge metadatas and in here and their connected nodes" />
      </div>
      <div className="flex flex-col mt-8 items-start">
      <div className="flex items-center w-full justify-between items-between">
        <TitleH text="Edge Metadatas" />
          <FormButton
          text="Add Edge"
          color="bg-indigo-400"
          onClick={() => console.log()}
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
                  {edgeMetadatas.map((e: any, index: number) => (
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
                                edgeMetadatas.splice(index, 1);
                                setEdgeMetadatas([...edgeMetadatas]);
                                window.localStorage.setItem(
                                  "edgemetadatas",
                                  JSON.stringify(edgeMetadatas)
                                );
                                toast.success("EdgeMetadata Deleted!");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      {showEdit[index] && (
                        <div className="flex">
                          <UpsertEdgeMetadata
                            edgemetadata={e}
                            index={index}
                            callbackMetadata={(e) => updateNode(e, index)}
                          />
                        </div>
                      )}
                    </>
                  ))}
                  <div className="flex">
                        <UpsertEdgeMetadata
                          edgemetadata={new EdgeMetadata("", "",[],[])}
                          index={edgeMetadatas.length}
                          callbackMetadata={(e) =>
                            saveNewEdge(e, edgeMetadatas.length)
                          }
                        />
                      </div>
                  {edgeMetadatas.length === 0 && (
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

export default ListEdges;
