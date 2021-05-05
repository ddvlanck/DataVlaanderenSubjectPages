import { Processor, VersionObject } from "../linked-data-subject-block/Processor";

const Engine = require('@treecg/actor-init-ldes-client').newEngine;
const client = new Engine();

export interface LinkedDataEventStreamClientOptions {
    pollingInterval: string;
    mimeType: string;
    emitMemberOnce: boolean;
}

export default class LinkedDataEventStreamClient {
    private url: string;
    private subject: string;
    private processor: Processor;

    constructor(url: string, subject: string){
        this.url = url;
        this.subject = subject;
        this.processor = new Processor();
    }

    public fetch(options: LinkedDataEventStreamClientOptions){
        const linkedDataEventStreamSync = client.createReadStream(
            this.url, 
            {
                pollingInterval: options.pollingInterval,
                mimeType: options.mimeType,
                emitMemberOnce: options.emitMemberOnce
            }
        );

        linkedDataEventStreamSync.on('data', (data) => {
            const version = new VersionObject(JSON.parse(data));
            this.processor.processVersionObject(version);
        });

        linkedDataEventStreamSync.on('end', () => {
            console.log(`[LinkedDataEventStreamClient]: Done processing. Last URL for subject ${this.subject} was ${this.url}`);
        })
    }
}
