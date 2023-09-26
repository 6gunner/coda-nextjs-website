"use client";

import React from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, goerli, bsc, bscTestnet } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

export const { chains, publicClient } = configureChains(
  [mainnet, goerli, bsc, bscTestnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});
const WagmiConfigRegistry = ({ children }: React.PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiConfigRegistry;
