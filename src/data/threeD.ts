export interface ThreeDWork {
  id: string;
  title: string;
  description?: string;
  modelPath: string;
  thumbnail?: string;
  category?: string;
}

export const threeDWorks: ThreeDWork[] = [
  {
    id: "barrel",
    title: "Barrel",
    description: "3D barrel model",
    modelPath: "/3D/AnyConv.com__Barrel_FBX.glb",
    category: "Model",
  },
  {
    id: "corrupted-healthpack",
    title: "Corrupted Healthpack",
    description: "Corrupted health restoration item with PBR textures",
    modelPath: "/3D/corrupted-healthpack-textured.glb",
    category: "Model",
  },
  {
    id: "enemy",
    title: "Enemy Character",
    description: "3D enemy character model",
    modelPath: "/3D/enemy.glb",
    category: "Character",
  },
];
