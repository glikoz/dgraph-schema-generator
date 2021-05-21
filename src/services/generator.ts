import { Guid } from "guid-typescript";
import { stringify } from "postcss";
import { EdgeMetadata, NodeMetadata, Repository } from "./repository";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

export class Generator {
  Repository: Repository;
  constructor(rep: Repository) {
    this.Repository = rep;
  }

  private GetInterface(
    interfaceName: string,
    inverseInterfaceName: string,
    codeName: string,
    transposeCodeName: string,
    isPlural: boolean
  ): string {
    if (isPlural)
      return "interface ${interfaceName} {\n ${codeName}:[${inverseInterfaceName}] @hasInverse(field:${transposeCodeName}) \n}\n";
    else
      return "interface ${interfaceName} {\n ${codeName}:${inverseInterfaceName} @hasInverse(field:${transposeCodeName}) \n}\n";
  }

  GetSchema(): string {
    console.log("Running Get Schema");
    const edges: EdgeMetadata[] = this.Repository.GetEdgeMetadatas();
    const nodes: NodeMetadata[] = this.Repository.GetNodeMetadatas();
    let schema = "";
    const typeDict = new Map<string, string[]>();
    edges.forEach((edge) => {
      let interfaceName = "I" + uid.stamp(6);
      let inverseInterfaceName = interfaceName + "_";
      schema += this.GetInterface(
        interfaceName,
        inverseInterfaceName,
        edge.Name,
        edge.InverseName,
        edge.ToCount.trim() != "1"
      );
      schema += this.GetInterface(
        inverseInterfaceName,
        interfaceName,
        edge.InverseName,
        edge.Name,
        edge.FromCount.trim() != "1"
      );
      edge.From.forEach((from) => {
        edge.To.forEach((to) => {
          if (!typeDict.has(from.Name)) typeDict.set(from.Name, []);

          let a = typeDict.get(from.Name);
          a!.push(interfaceName);
          typeDict.set(from.Name, a!);
          //TODO: Refactor Kill DRY
          if (!typeDict.has(to.Name)) typeDict.set(to.Name, []);

          let b = typeDict.get(to.Name);
          b!.push(inverseInterfaceName);
          typeDict.set(to.Name, b!);
        });
      });
    });
    {
    }
    nodes.forEach((node) => {
      //if(typeDict.has(node.Name))

      schema +=
        "type ${node.Name} implements ${typeDict.get(node.Name)?.join(' & ')} {\n  \n}\n";
    });

    return schema;
  }
}
