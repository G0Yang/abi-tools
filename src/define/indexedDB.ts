export default class IndexedDB {
    private static _name: string = "abi-tools";
    private static _version: number = 1;

    static async init() {
        const databases = await indexedDB.databases()
        const found = databases.find((item) =>
            item.name === this._name && item.version === this._version
        )
        if(!found) {
            indexedDB.open(this._name, this._version)
        }
        console.log("DB init")
    }
}

