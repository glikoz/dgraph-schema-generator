import { specialChars } from "@testing-library/user-event";
import { Guid } from "guid-typescript";
export class Repository {
  UpsertMetadata(md: Metadata) {
    //window.localStorage.setItem("metadata:"+md.Id,JSON.stringify(md));
  }

  UpsertEdgeMetadata() {}

  GetMetadatas() {}
  GetEdgeMetadatas() {}
}

export class Metadata {
  Id: Guid;
  Name: string = "";
  Properties: Property[] = [];

  constructor(name:string,properties:Property[]) {
    this.Id = Guid.create();
    this.Name=name;
    this.Properties=properties;
  }
}

export class Property {
  Name: string = "";
  Type: string = "ID";

  constructor(name: string, type: string) {
    this.Name = name;
    this.Type = type;
  }
}

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};
