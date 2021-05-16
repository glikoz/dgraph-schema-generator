import { specialChars } from "@testing-library/user-event";
import { Guid } from "guid-typescript";
export class Repository {
    UpsertMetadata(md: NodeMetadata) {
        window.localStorage.setItem("metadata:" + md.Id, JSON.stringify(md));
    }

    UpsertEdgeMetadata() { }


    GetMetadatas() {

    }
    GetEdgeMetadatas(): EdgeMetadata[] {
        return [];
    }
}

// Directed, DirectedBy
export class EdgeMetadata {
    Id: Guid;
    From: NodeMetadata[] = [];
    To: NodeMetadata[] = [];
    Name: string = "";
    InverseName: string = "";

    constructor(name: string, inverseName:string , from?: NodeMetadata[], to?: NodeMetadata[]) {
        this.Id = Guid.create();
        this.Name = name;
        this.InverseName = inverseName;
        if (from)
            this.From = from;
        if(to)
            this.To = to;
    }
}


export class NodeMetadata {
    Id: Guid;
    Name: string = "";
    Properties: Property[] = [];

    constructor(name: string, properties?: Property[]) {
        this.Id = Guid.create();
        this.Name = name;
        if(properties)
            this.Properties = properties;
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
