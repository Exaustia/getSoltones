import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import React from "react";
import { useState } from "react";
import { getNFTs } from "../utils/getNFTs";

export const FormAddress = () => {
  const [address, setAddress] = useState<string>("");
  const [errorPublicKey, setErrorPublicKey] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any[]>();

  const handleConfirm = async () => {
    const decoded = bs58.decode(address);
    if (decoded.length !== 32) {
      setErrorPublicKey(true);
    } else {
      errorPublicKey && setErrorPublicKey(false);
      const nfts = await getNFTs(address);
      setNfts(nfts);
    }
  };

  return (
    <div>
      <span>
        Enter public address: <br />
      </span>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.currentTarget.value)}
      />
      <button onClick={() => handleConfirm()}>Validate</button>

      {nfts && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {nfts.map((e) => (
            <>
              <span style={{ margin: "10px 10px" }}>{JSON.stringify(e)}</span>
            </>
          ))}
        </div>
      )}
      {errorPublicKey && <span>Invalid public key input</span>}
      <footer
        style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
        }}
      >
        Created by <a href="https://twitter.com/Exaustia">@Exaustia</a>
      </footer>
    </div>
  );
};
