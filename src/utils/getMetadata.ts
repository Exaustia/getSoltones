import decodeMetadata from "./metadata";
import { AccountInfo, PublicKey } from "@solana/web3.js";
// @ts-ignore
import fetch from "node-fetch";

const METADATA_PUBKEY = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export default async function getMetadatas(connection: any, address: string[]) {
  try {
    const result = await Promise.all(
      chunks(address, 99).map((_) => getMultipleAccounts(connection, address))
    );

    let array;
    if (result)
      array = result
        .map(
          (a) =>
            a?.array.map((acc: any) => {
              if (!acc) {
                return undefined;
              }

              const { data, ...rest } = acc;
              const obj = {
                ...rest,
                data: Buffer.from(data[0], "base64"),
              } as AccountInfo<Buffer>;
              return obj;
            }) as AccountInfo<Buffer>[]
        )
        .flat();

    if (array) {
      const result = [];
      for (let index = 0; index < array.length; index++) {
        const e = array[index];
        const a = decodeMetadata(e.data);
        const f = await fetch(a?.data.uri)
          .then((res: any) => res.json())
          .then((data: any) => data);
        result.push(f);
      }

      return result;
    }
  } catch (e) {
    console.log(e);
  }
}
function chunks<T>(array: T[], size: number): T[][] {
  return Array.apply<number, T[], T[][]>(
    0,
    new Array(Math.ceil(array.length / size))
  ).map((_, index) => array.slice(index * size, (index + 1) * size));
}

const getMultipleAccounts = async (connection: any, address: string[]) => {
  const addressToBase = [];

  for (let index = 0; index < address.length; index++) {
    const element = address[index];
    let [pda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        METADATA_PUBKEY.toBuffer(),
        new PublicKey(element).toBuffer(),
      ],
      METADATA_PUBKEY
    );
    addressToBase.push(pda.toBase58());
  }

  const args = connection._buildArgs([addressToBase], "root", "base64");

  const unsafeRes = await connection._rpcRequest("getMultipleAccounts", args);

  if (unsafeRes.result.value) {
    const sortArray = unsafeRes.result.value.filter(
      (e: AccountInfo<String[]>) => e
    );

    const array = sortArray as AccountInfo<string[]>[];
    return { address, array };
  }
};
