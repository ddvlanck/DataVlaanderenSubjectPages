import Cache from "file-system-cache";
const fs = require('fs');
const jsonld = require('jsonld');

export class Processor {
    private cache: Cache;

    constructor(){
        this.cache = Cache({
            basePath: '../../cache'
        });
    }

    public async processVersionObject(object: VersionObject){
        const nquads = await jsonld.toRDF(object.data, {format: 'text/turtle'});
        //TODO
    }
}

export class VersionObject {
    public versionId: string;
    public isVersionOf: string;
    public data: any;

    constructor(data: any){
        this.versionId = data['@id'];
        this.isVersionOf = data['http://purl.org/dc/terms/isVersionOf']['@id'];
        this.data = data;
    }
}

