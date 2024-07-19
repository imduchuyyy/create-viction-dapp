import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";

const connectWallet = async () : Promise<any> => {
  try {
    if (!(window as any).abstraction) { 
      (window as any).abstraction = await createAbstractionProvider();
    }

    const provider = await createAbstractionProvider();

    const [wallet] = await provider.request({ 
      method: "eth_requestAccounts",
      params: {},
    })

    console.log("Connected wallet :", wallet);

    return wallet;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

export default connectWallet;