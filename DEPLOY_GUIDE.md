# Deploying Crucible to IPFS via Pinata

This guide explains how to deploy the Crucible application to the decentralized web (DWeb) using Pinata.

## Prerequisites

1.  **Pinata Account:** Sign up at [pinata.cloud](https://pinata.cloud).
2.  **Pinata API Key:** Go to the API Keys section in Pinata and create a new key. Make sure to enable `pinFileToIPFS`.
3.  **JWT Token:** When creating the key, you will get a JWT token. Copy this.

## Setup

1.  Create a `.env` file in the root directory (if it doesn't exist) and add your Pinata JWT:

    ```env
    PINATA_JWT=your_jwt_token_here
    ```

    *Note: Do not commit this file to version control.*

2.  Install dependencies (if not already done):

    ```bash
    npm install
    ```

## Deployment Steps

1.  **Build the Application:**
    Run the build command to generate the static files in the `dist` folder.

    ```bash
    npm run build
    ```

2.  **Deploy to Pinata:**
    Run the deployment script.

    ```bash
    npm run deploy
    ```

    This script will:
    - Upload the `dist` folder to Pinata.
    - Return the IPFS Hash (CID) of your deployment.

3.  **Access your DWeb App:**
    You can access your app using a public IPFS gateway:
    `https://gateway.pinata.cloud/ipfs/<YOUR_IPFS_HASH>`

## Seamless Updates

To push updates:
1.  Make your code changes.
2.  Run `npm run build` again.
3.  Run `npm run deploy` again.
4.  The script will upload the new version and provide a new IPFS Hash.
5.  (Optional) If you have a domain connected to Pinata, update the DNS record to point to the new hash, or use IPNS for a static address.
