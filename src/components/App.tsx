import React, { useState, useEffect } from "react";
import FileSaver from "file-saver";
import { wrap } from "comlink";
import ThreeContext from "./ThreeContext";
import ReplicadMesh from "./ReplicadMesh";
import {CadWorker,cadWorker} from "./worker"; 


const cad = cadWorker;

interface MeshData {
  edges: any; // Define the appropriate type for edges
  faces: any; // Define the appropriate type for faces
}

export default function ReplicadApp(): JSX.Element {
  const [size, setSize] = useState<number>(5);
  const [mesh, setMesh] = useState<MeshData | null>(null);

  const downloadModel = async () => {
    const blob = await cad.createBlob(size);
    FileSaver.saveAs(blob, "thing.stl");
  };

  useEffect(() => {
    cad.createMesh(size).then((m: MeshData) => setMesh(m));
  }, [size]);

  return (
    <main>
      <h1>
        A{" "}
        <a
          href="https://replicad.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          replicad
        </a>{" "}
        sample app
      </h1>
      <p>
        You can find the code for this app{" "}
        <a
          href="https://github.com/sgenoud/replicad/tree/main/packages/replicad-app-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          on the GitHub repository
        </a>
      </p>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label htmlFor="thicknessInput">thickness</label>
          <input
            id="thicknessInput"
            type="number"
            step="1"
            min="1"
            max="10"
            value={size}
            onChange={(v) => {
              const val = parseInt(v.target.value);
              if (val > 0 && val <= 10) setSize(val);
            }}
          />
        </div>
        <button onClick={downloadModel}>Download STL</button>
      </section>
      <section style={{ height: "300px" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", fontSize: "2em" }}
          >
            Loading...
          </div>
        )}
      </section>
    </main>
  );
}
