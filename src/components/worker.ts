import opencascade from "replicad-opencascadejs/src/replicad_single.js";
import opencascadeWasm from "replicad-opencascadejs/src/replicad_single.wasm?url";
import { setOC } from "replicad";
import { expose } from "comlink";

// We import our model as a simple function
import { drawBox } from "./cad";

interface MeshData {
  faces: any; // Type of faces and edges need to be determined
  edges: any;
}

// This is the logic to load the web assembly code into replicad
let loaded = false;
const init = async (): Promise<boolean> => {
  if (loaded) return Promise.resolve(true);

  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  loaded = true;
  setOC(OC);

  return true;
};
const started = init();

async function createBlob(thickness: number): Promise<Blob> {
  await started;
  // note that you might want to do some caching for more complex models
  return drawBox(thickness).blobSTL();
}

async function createMesh(thickness: number): Promise<MeshData> {
  await started;
  const box = drawBox(thickness);
  // This is how you get the data structure that the replica-three-helper
  // can synchronise with three BufferGeometry
  return {
    faces: box.mesh(),
    edges: box.meshEdges(),
  };
}

export const cadWorker:CadWorker = {
  createBlob,
  createMesh,
};

export interface CadWorker {
  createBlob(thickness: number): Promise<Blob>;
  createMesh(thickness: number): Promise<MeshData>;
}

