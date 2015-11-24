'use strict';

require('app-module-path').addPath(__dirname);
const gen = require('lib/definition/generator');
const fromDefinition = require('lib/runtime/model').fromDefinition;

// Create a new workflow
const workflow = gen.createWorkflow('My Workflow');

// Create a new process.
const process = gen.createProcess('My Process');

// Define the process context variables.
process.setContext(['a', 'b']);


const service = gen.createSystemService('My Service', function (context) {
  console.log('hi! ' + context.get('a'));
});

process.addService(service);
process.setStartService(service);
process.setEndService(service);


workflow.addProcess(process).addService(service);

const runtime = fromDefinition(workflow);

const rtProcess = runtime.getProcess('My Process');

console.log(rtProcess);

