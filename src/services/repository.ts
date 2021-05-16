import { specialChars } from "@testing-library/user-event";
import { Guid } from "guid-typescript"
export class Repository {

    UpsertMetadata(md: Metadata) {
        window.localStorage.setItem("metadata:" + md.Id, JSON.stringify(md));
    }

    UpsertEdgeMetadata() {

    }

    GetMetadatas() {

    }
    GetEdgeMetadatas(): EdgeMetadata[] {
        return [];
    }
}

export class EdgeMetadata {
    From:Metadata[]=[];
    To:Metadata[]=[];
    Name:string="";
    CrossName:string="";
}

export class Metadata {
    Id: Guid;
    Name: string = "";
    Properties: Property[] = [];

    constructor() {
        this.Id = Guid.create();
    }
}

export class Property {
    Name: string = "";
    Type: string = "ID";
}


export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    Float: number,
};
