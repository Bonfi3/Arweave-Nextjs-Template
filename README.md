This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Local Arweave Setup

For local development and testing with Arweave, follow these steps:

1.  **Configure Your Arweave Wallet**:
    Create a `.env.local` file in the root of this project.
    Add your Arweave wallet key as an environment variable in this file:
    ```
    ARWEAVE_WALLET_JWK='{"kty":"RSA","n":"your_n_value","e":"AQAB","d":"your_d_value", ...}'
    ```
    Replace the example JWK with your actual Arweave wallet's JSON Web Key.
    **Important**: Ensure `.env.local` is added to your `.gitignore` file to prevent committing your secret key.

2.  **Install ArLocal**:
    If you haven't already, install `arlocal` globally. This tool allows you to run a local Arweave gateway.
    ```bash
    npm install -g arlocal
    ```

3.  **Run Local Network**:
    Start your local Arweave network in a separate terminal window:
    ```bash
    arlocal
    ```
    This will typically start a gateway at `http://localhost:1984`.

4.  **Mint Tokens (Optional)**:
    To add funds to your wallet on the local network, you can use the following `curl` command. Replace `<your_wallet_address>` with your Arweave wallet address and `<quantity>` with the desired amount of Winston (e.g., 1000000000000 for 1 AR).
    ```bash
    curl http://localhost:1984/mint/<your_wallet_address>/<quantity>
    ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
