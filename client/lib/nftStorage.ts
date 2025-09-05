import { NFTMetadata } from "@/types/types";

export async function uploadToPinata({
  file,
  meta,
}: {
  file: File;
  meta: NFTMetadata;
}): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: form,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Pinata file pinning failed");
  }

  const data = await res.json();
  const imageCID = data.IpfsHash;

  const metadataJSON = { ...meta, image: `ipfs://${imageCID}` };
  const blob = new Blob([JSON.stringify(metadataJSON)], { type: "application/json" });
  const metaForm = new FormData();
  metaForm.append("file", new File([blob], "metadata.json"));

  const metaRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: metaForm,
  });

  if (!metaRes.ok) {
    const err = await metaRes.json();
    throw new Error(err.error || "Pinata metadata pinning failed");
  }

  const metaData = await metaRes.json();
  console.log("Metadata URI:", metaData.IpfsHash);
  console.log("Metadata:", metaData);
  return `ipfs://${metaData.IpfsHash}`;
}
