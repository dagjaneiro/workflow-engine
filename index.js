'use strict';

require('app-module-path').addPath(__dirname);
const gen = require('lib/definition/generator');
const fromDefinition = require('lib/runtime/model').fromDefinition;

const workflow = gen.createWorkflow('My Workflow');
const process = gen.createProcess('My Process');
const service = gen.createSystemService('My Service', function () {
  console.log('hi!');
});


workflow.addProcess(process).addService(service);

const runtime = fromDefinition(workflow);

const rtProcess = runtime.getProcess('My Process');

console.log(rtProcess);

