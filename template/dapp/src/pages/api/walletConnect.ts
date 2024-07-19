import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";

const connectWallet = async () => {
  try {
    (window as any).abstraction = await createAbstractionProvider();
    const [wallet] = await (window as any).abstraction.request({
      method: "eth_requestAccounts",
      params: {},
    });

    console.log("Connected wallet:", wallet);
    return wallet;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

export default connectWallet;