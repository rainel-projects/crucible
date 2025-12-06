import pinataSDK from '@pinata/sdk';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deploy = async () => {
    // Initialize Pinata with JWT
    const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

    // Verify connection
    try {
        await pinata.testAuthentication();
        console.log('✅ Connected to Pinata!');
    } catch (err) {
        console.error('❌ Failed to connect to Pinata. Check your PINATA_JWT in .env file.');
        console.error(err);
        process.exit(1);
    }

    const sourcePath = path.join(__dirname, '../dist');
    const options = {
        pinataMetadata: {
            name: 'Crucible-Build',
            keyvalues: {
                env: 'production',
                timestamp: new Date().toISOString()
            }
        },
        pinataOptions: {
            cidVersion: 1
        }
    };

    console.log('🚀 Starting deployment to Pinata...');
    console.log(`📂 Uploading from: ${sourcePath}`);

    try {
        const result = await pinata.pinFromFS(sourcePath, options);
        console.log('✅ Deployment Successful!');
        console.log('--------------------------------------------------');
        console.log(`💎 IPFS Hash (CID): ${result.IpfsHash}`);
        console.log(`🌐 Gateway URL: https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
        console.log('--------------------------------------------------');
        console.log('To update, simply run this script again after building.');
    } catch (err) {
        console.error('❌ Deployment Failed:', err);
        process.exit(1);
    }
};

deploy();
