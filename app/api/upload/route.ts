import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import Arweave from 'arweave';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define the POST handler
export async function POST(req: Request) {
  const formData = await req.formData();
  const fileEntry = formData.get('file');

  if (!fileEntry || typeof fileEntry === 'string') {
    return NextResponse.json({ error: 'No file uploaded or invalid file' }, { status: 400 });
  }
  const file = fileEntry as File;

  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const tempFileName = Date.now() + '-' + file.name;
  const tempFilePath = path.join(uploadsDir, tempFileName);
  
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(tempFilePath, fileBuffer);


  try {
    const jwkString = process.env.ARWEAVE_WALLET_JWK;
    if (!jwkString) {
      console.error('ARWEAVE_WALLET_JWK environment variable not set');
      return NextResponse.json({ error: 'Server configuration error: Wallet not found' }, { status: 500 });
    }
    const jwk = JSON.parse(jwkString);

    // const arweave = Arweave.init({
    //   host: 'arweave.net',
    //   port: 443,
    //   protocol: 'https',
    // });
    const arweave = Arweave.init({
      host: 'localhost',
      port: 1984,
      protocol: 'http',
    });
    const data = fs.readFileSync(tempFilePath);

    const transaction = await arweave.createTransaction({ data: data }, jwk);

    transaction.addTag('Content-Type', file.type || 'application/octet-stream');

    await arweave.transactions.sign(transaction, jwk);

    const response = await arweave.transactions.post(transaction);

    if (response.status === 200 || response.status === 202) {
      return NextResponse.json({ arweaveUrl: `https://arweave.net/${transaction.id}` }, { status: 200 });
    } else {
      console.error('Arweave upload error response:', response);
      return NextResponse.json({ error: `Failed to upload to Arweave. Status: ${response.status}` }, { status: response.status || 500 });
    }
  } catch (error) {
    console.error('Error during upload:', error);
    return NextResponse.json({ error: 'Error during upload to Arweave' }, { status: 500 });
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}