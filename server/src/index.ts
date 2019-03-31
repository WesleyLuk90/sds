import { Server } from "./http/Server";

async function main() {
    const server = await Server.create();
    server.start();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
