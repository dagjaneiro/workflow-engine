'use strict';

/**
 * Module dependencies.
 */

const config = require('config/definition');

/**
 * Helper function to define object properties.
 */

function property(value, isWritable, isEnumberable) {
  return {
    enumerable: isEnumberable || true,
    writable: isWritable || false,
    value: value
  };
}

/**
 * Prototype for WFE Service definitions.
 */

const wfeService = {

  setFunction(f) {
    this.fn = f;
    this.code = '' + f;
  }
};

/**
 * Prototype for WFE Process definitions.
 */

const wfeProcess = {

  /**
   * Add a service to the process.
   */

  addService(service) {
    if (this.services.hasOwnProperty(service.serviceName)) {
      throw Error('Service with name: ' + service.serviceName + ' already defined.');
    } else {
      this.services[service.serviceName] = service;
    }
    return service;
  },

  /**
   * Add a list of services to the process.
   */

  addServices(services) {
    for (let s of services) {
      this.addService(s);
    }
  },

  /**
   * Connect two services.
   */

  addLink(fromService, toService) {
    if (this.flow.hasOwnProperty(fromService.serviceName)) {
      throw Error('Next item for service: ' + fromService.serviceName + ' already defined.');
    } else {
      this.flow[fromService.serviceName] = {
        type: config.flow.type.link,
        value: toService.serviceName
      };
    }
  },

  /**
   * Connect a service to a conditional gateway.
   */

  addGateway(fromService, fn) {
    if (this.flow.hasOwnProperty(fromService.serviceName)) {
      throw Error('Next item for service: ' + fromService.serviceName + ' already defined.');
    } else {
      this.flow[fromService.serviceName] = {
        type: config.flow.type.gateway,
        value: fn
      };
    }
  },

  /**
   * Set start service.
   */

  setStartService(service) {
    this.start = service.serviceName;
  },

  /**
   * Set process context.
   */

  setContext(context) {
    this.context = context;
  }
};

/**
 * Prototype for WFE Workflow definitions.
 */

const wfeWorkflow = {

  /**
   * Add a process to the workflow.
   */

  addProcess(process) {
    if (this.processes.hasOwnProperty(process.processName)) {
      throw Error('Process with name: ' + process.processName + ' already defined.');
    } else {
      this.processes[process.processName] = process;
    }
    return process;
  },

  /**
   * Get the workflow definition.
   */

  definition() {
    return JSON.stringify(this);
  }
};

/**
 * Export workflow generator helpers.
 */

module.exports = {

  /**
   * Generator function for WFE System Service definitions.
   */

  createSystemService: function (serviceName, fn) {
    return Object.create(wfeService, {
      serviceName: property(serviceName),
      serviceType: property(config.service.type.system),
      fn: property(fn, true),
      code: property('' + fn, true)
    });
  },

  /**
   * Generator function for WFE System Service definitions.
   */

  createHumanService: function (serviceName) {
    return Object.create(wfeService, {
      serviceName: property(serviceName),
      serviceType: property(config.service.type.human)
    });
  },

  /**
   * Generator function for WFE Process definitions.
   */

  createProcess: function (processName) {
    return Object.create(wfeProcess, {
      processName: property(processName),
      services: property({}),
      flow: property({}),
      context: property([])
    });
  },

  /**
   * Generator function for WFE Workflow definitions.
   */

  createWorkflow: function (workflowName) {
    return Object.create(wfeWorkflow, {
      workflowName: property(workflowName),
      processes: property({})
    });
  }
};
