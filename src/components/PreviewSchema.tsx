import React, { useEffect, useState } from "react";
import { NodeMetadata, Repository, Property } from "../services/repository";
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

let repository: Repository = new Repository();

function PreviewSchema() {
  const [schema, setSchema] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("http://localhost:5000");

  useEffect(() => {
    setSchema(repository.GetSchema());
  }, []);

  const sendSchema = () => {
    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: schema,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Schema sent to dgraph server");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error on sending schema");
      });
  };
  const copyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(schema);
      toast.info("Schema copied to clipboard!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" mx-20 fluid  md:text-3xl px-20 py-8 rounded-lg w-full bg-white">
        <div className="flex flex-col items-start space-y-4 text-gray-800">
          <Title text="Schema Generator" />
          <Subtitle text="You can preview the schema and send the schema to your dgraph server" />
        </div>

        <div className="flex w-full space-x-4 items-center">
          <input
            type="text"
            className="w-full border text-gray-700 border-gray-300 bg-gray-100 rounded-sm text-lg px-2 py-1 h-10"
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
            placeholder="http://localhost:5000"
          />
          <FormButton
            text="Send"
            color="bg-indigo-400"
            paddingX="px-6"
            onClick={() => sendSchema()}
          />
        </div>
        <div className="flex w-full mt-8" onClick={() => copyClipboard()}>
          <textarea
            className="w-full border p-4 border-gray-300 rounded-md text-lg text-gray-700"
            style={{ height: "600px" }}
            value={schema}
            placeholder="Generated DGraph Schema"
            disabled
          />
        </div>
      </div>
    </>
  );
}

export default PreviewSchema;
