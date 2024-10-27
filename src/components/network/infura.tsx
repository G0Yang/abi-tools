import {Grid2} from "@mui/material";

// todo: https://docs.infura.io/api/network-endpoints
export default function InfuraDashboard() {
    const networks = {
        arbitrum: {
            mainnet: "https://arbitrum-mainnet.infura.io/v3/",
            sepolia: "https://arbitrum-sepolia.infura.io/v3/",
        },
        avalanche: {
            mainnet: "https://avalanche-mainnet.infura.io/v3/",
            fuji: "https://avalanche-fuji.infura.io/v3/",
        },
    }
  return (
        <Grid2>

        </Grid2>
  );
}
