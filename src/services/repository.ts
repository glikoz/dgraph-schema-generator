import { specialChars } from "@testing-library/user-event";
import { Guid } from "guid-typescript";
export class Repository {
  UpsertNodeMetadata(nm: NodeMetadata, index?: number): NodeMetadata[] {
    // get json node metadatas, if not defined create empty array
    let nodeMetadatas: NodeMetadata[] = this.GetNodeMetadatas();

    // if index not null =>  update node | else create node
    index ? (nodeMetadatas[index] = nm) : nodeMetadatas.push(nm);

    // set local storage
    window.localStorage.setItem("nodemetadatas", JSON.stringify(nodeMetadatas));

    return nodeMetadatas;
  }

  UpsertEdgeMetadata(em: EdgeMetadata, index?: number): EdgeMetadata[] {
    let edgeMetadatas: EdgeMetadata[] = this.GetEdgeMetadatas();

    // if index not null =>  update edge | else create edge
    index ? (edgeMetadatas[index] = em) : edgeMetadatas.push(em);

    // set local storage
    window.localStorage.setItem("edgemetadatas", JSON.stringify(edgeMetadatas));

    return edgeMetadatas;
  }

  GetNodeMetadatas(): NodeMetadata[] {
    return window.localStorage.getItem("nodemetadatas")
      ? JSON.parse(window.localStorage.getItem("nodemetadatas")!)
      : [];
  }

  GetEdgeMetadatas(): EdgeMetadata[] {
    return window.localStorage.getItem("edgemetadatas")
      ? JSON.parse(window.localStorage.getItem("edgemetadatas")!)
      : [];
  }
}

export class EdgeMetadata {
  Id: Guid;
  From: NodeMetadata[] = [];
  To: NodeMetadata[] = [];
  Name: string = "";
  InverseName: string = "";
  FromCount:string="1";
  ToCount:string="1";  
  constructor(
    name: string,
    inverseName: string,
    from?: NodeMetadata[],
    to?: NodeMetadata[]
  ) {
    this.Id = Guid.create();
    this.Name = name;
    this.InverseName = inverseName;
    if (from) this.From = from;
    if (to) this.To = to;
  }
}

export class NodeMetadata {
  Id: Guid;
  Name: string = "";
  Properties: Property[] = [];

  constructor(name: string, properties?: Property[]) {
    this.Id = Guid.create();
    this.Name = name;
    if (properties) this.Properties = properties;
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
