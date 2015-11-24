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
    if (this.flow.has(service.serviceName)) {
      return { from: service.serviceName, to: this.flow.get(service.serviceName) };
    } else {
      throw Error('Next process item not defined.');
    }
  },

  /**
   * Get Service by name.
   */

  getService(name) {
    if (this.services.has(name)) {
      return this.services.get(name);
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
    if (this.processes.has(name)) {
      return this.processes.get(name);
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
    wfRuntime.processes.forEach((process) => {
      Object.setPrototypeOf(process, wfrProcess);

      // Set Services prototype
      process.services.forEach((service) => {
        Object.setPrototypeOf(service, wfrService);
      });
    });

    return wfRuntime;
  }
};
