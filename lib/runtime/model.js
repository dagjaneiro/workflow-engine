'use strict';

/**
 * Module dependencies.
 */

/**
 * Prototype for WFE Runtime Service.
 */

const wfrService = {

  run(args) {
    this.fn(args);
  }
};

/**
 * Prototype for WFE Runtime Process.
 */

const wfrProcess = {

  /**
   * Get the flow operation based on a service.
   */

  getNextFlow(service) {
    if (this.flow.hasOwnProperty(service.serviceName)) {
      return { from: service.serviceName, to: this.flow[service.serviceName] };
    } else {
      throw Error('Next process item not defined.');
    }
  },

  /**
   * Get Service by name.
   */

  getService(name) {
    if (this.services.hasOwnProperty(name)) {
      return this.services[name];
    } else {
      throw Error('Requested service not found.');
    }
  }
};

/**
 * Prototype for WFE Runtime Workflow.
 */

const wfrWorkflow = {

  /**
   * Get Process by name.
   */

  getProcess(name) {
    if (this.processes.hasOwnProperty(name)) {
      return this.processes[name];
    } else {
      throw Error('Requested process not found.');
    }
  }
};


/**
 * Export Runtime helpers.
 */

module.exports = {

  /**
   * Generate a WFE Runtime Workflow based on a process definition.
   */

  fromDefinition: function (wfDefinition) {

    const wfRuntime = Object.assign({}, wfDefinition);

    // Set Workflow prototype
    Object.setPrototypeOf(wfRuntime, wfrWorkflow);

    // Set Processes prototype
    for (let pkey of Object.keys(wfRuntime.processes)) {
      let process = wfRuntime.processes[pkey];
      Object.setPrototypeOf(process, wfrProcess);

      // Set Services prototype
      for (let skey of Object.keys(process.services)) {
        Object.setPrototypeOf(process.services[skey], wfrService);
      }
    }
    return wfRuntime;
  }
};
