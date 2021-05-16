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

const PrimitiveTypes: string[] = ["ID", "String", "Boolean", "Int", "Float"];
const defaultProperties: Property[] = [new Property("Id", "ID")];

function HomePage() {

  useEffect(() => {
  },[]);
  return <>
  </>;
}

export default HomePage;
