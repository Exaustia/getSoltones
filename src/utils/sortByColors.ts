import { ISoltone } from "../types/soltonesInterfaces";

export const sortByColor = (soltones: any) => {
  const colors = soltones.map((e: ISoltone) => {
    const attr = e.attributes.find((attribute) => {
      if (attribute.trait_type === "Hex Code") return attribute.value;
      return false;
    });
    return attr?.value;
  });

  return colors;
};
