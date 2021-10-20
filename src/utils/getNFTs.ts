import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import getMetadatas from "./getMetadata";

type StringPublicKey = string;

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const BPF_UPGRADE_LOADER_ID = new PublicKey(
  "BPFLoaderUpgradeab1e11111111111111111111111"
);

const MEMO_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const METADATA_PROGRAM_ID =
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" as StringPublicKey;

const VAULT_ID =
  "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn" as StringPublicKey;

const AUCTION_ID =
  "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8" as StringPublicKey;

const METAPLEX_ID =
  "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98" as StringPublicKey;

const SYSTEM = new PublicKey("11111111111111111111111111111111");

let STORE: PublicKey | undefined;

// const rpcHost = " https://explorer-api.devnet.solana.com";
const rpcHost = "https://api.mainnet-beta.solana.com";

const connection = new anchor.web3.Connection(rpcHost);

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
    system: SYSTEM,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
    vault: VAULT_ID,
    auction: AUCTION_ID,
    metaplex: METAPLEX_ID,
    store: STORE,
  };
};

// user accounts are updated via ws subscription
export const getNFTs = async (publicKeyBase64: string) => {
  const account = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(publicKeyBase64),
    {
      programId: programIds().token,
    }
  );

  const accounts = account.value;

  const tokensAddress = accounts
    .filter((e) => {
      if (e.account?.data?.parsed?.info?.tokenAmount?.uiAmount !== 0)
        return e.account?.data?.parsed?.info;
      return null;
    })
    .map((e) => {
      if (e.account?.data?.parsed?.info.mint)
        // You can check the mint you need to be return
        return e.account?.data?.parsed?.info?.mint;
      return null;
    });

  const result = await getMetadatas(connection, tokensAddress);
  return result;
};
