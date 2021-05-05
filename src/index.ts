import LinkedDataEventStreamClient from "./linked-data-event-stream/LinkedDataEventStreamClient";
const { Command } = require('commander');
const program = new Command();

program
  .usage('iterates over a Linked Data Event Stream, creates Linked Data Subject Blocks to store on Azure Storage')
  .option('--ldes <url>', 'URL for the Linked Data Event Stream that will be fetched')
  .option('--subject <type>', 'The type of the immutable objects in the Linked Data Event Stream');

program.parse(process.argv);
const options = program.opts();
const ldes = process.env.LDES || options.ldes;
const subject = process.env.SUBJECT || options.subject;

const client = new LinkedDataEventStreamClient(ldes, subject);

client.fetch({
    pollingInterval: "5000",
    mimeType: "application/ld+json",
    emitMemberOnce: true
});