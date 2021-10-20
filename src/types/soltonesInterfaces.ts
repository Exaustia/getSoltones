export interface ISoltone {
  attributes: { trait_type: string; value: string }[];
  collection: { family: string; name: string };
  description: string;
  external_url: string;
  image: string;
  name: string;
  properties: {
    category: string;
    creator: { address: string }[];
    files: { type: string; uri: string }[];
  };
  seller_fee_basis_points: number;
  symbol: string;
}
