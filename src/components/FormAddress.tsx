import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { useState } from "react";
import { getNFTs } from "../utils/getNFTs";
import { sortByColor } from "../utils/sortByColors";

export const FormAddress = () => {
  const [address, setAddress] = useState<string>("");
  const [errorPublicKey, setErrorPublicKey] = useState<boolean>(false);
  const [nfts, setNfts] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    const decoded = bs58.decode(address);
    if (decoded.length !== 32) {
      setErrorPublicKey(true);
    } else {
      setLoading(true);
      errorPublicKey && setErrorPublicKey(false);
      const nfts = await getNFTs(address);
      const colors = sortByColor(nfts);
      setNfts(colors);
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "80%" }}>
      <label> Enter public address:</label>
      <input
        type="text"
        id="name"
        name="user_name"
        value={address}
        onChange={(e) => setAddress(e.currentTarget.value)}
      />

      <button onClick={() => handleConfirm()}>Validate</button>
      {loading && (
        <div className="loader loader--style2" title="1">
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
          >
            <path
              fill="#000"
              d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )}
      {nfts && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            backgroundColor: "grey",
          }}
        >
          {nfts.map((e: string) => (
            <div
              style={{
                backgroundColor: e,
                height: "50px",
                width: "50px",
                margin: "5px 5px",
              }}
            ></div>
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

const a = {
  attributes: [
    { trait_type: "Red Strength", value: "Low" },
    { trait_type: "Green Strength", value: "Medium" },
    { trait_type: "Blue Strength", value: "High" },
    { trait_type: "Hex Code", value: "#0E80CA" },
    { trait_type: "Red Level", value: "14" },
    { trait_type: "Green Level", value: "128" },
    { trait_type: "Blue Level", value: "202" },
    { trait_type: "Ordering", value: "Accending" },
    { trait_type: "Parity", value: "All Even" },
  ],
  collection: { family: "SolTones", name: "SolTones Gen1" },
  description: "1 of 2000 unique SolTones",
  external_url: "https://soltones.io",
  image:
    "https://www.arweave.net/bI6r-RtKe6it3xVf8WRXsB7XiZpBc5gJb_0iK87Tgws?ext=png",
  name: "#0E80CA",
  properties: {
    category: "image",
    creators: [
      { address: "Tone5Uy56NWSArV58xE3A4ajNyyN7rmVLRznjmjXoiQ", share: 100 },
    ],
    files: [
      {
        type: "image/png",
        uri: "https://www.arweave.net/bI6r-RtKe6it3xVf8WRXsB7XiZpBc5gJb_0iK87Tgws?ext=png",
      },
    ],
  },
  seller_fee_basis_points: 500,
  symbol: "",
};
