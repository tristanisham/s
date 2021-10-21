const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const Identities = require('orbit-db-identity-provider');


class DB {

    constructor() {
        this.db = this.build();
    }

    async build() {
        const ipfsOptions = { repo: './db' };
        const ipfs = await IPFS.create(ipfsOptions);
        const options = { id: 'local-id' };
        const identity = await Identities.createIdentity(options);

        // Create OrbitDB instance
        const orbitdb = await OrbitDB.createInstance(ipfs, { identity: identity });

        // Create database instance
        const db = await orbitdb.keyvalue('shorts');
        return db;
    }

    async write(key, val) {

        await this.db.then(a => {
            a.put(key, val);
            return true;
        });

    }

    async seek(key) {

        await this.db.then(a => {
            return a.get(key);
        });
    }
}

module.exports = { DB };