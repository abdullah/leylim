/* eslint-disable */
let _lifeCycleHooks;

const methods = {
  beforeCreate(o) { return o },
  created(o) { return o },
  beforeRowUpdate(o) { return o },
  rowUpdated(o) { return o },
  beforeRowDelete(o) { return o },
  rowDeleted(o) { return o },
  beforeRowDuplicate(o) { return o },
  rowDuplicated(o) { return o },
  beforeRowAdd(o) { return o },
  rowAdded(o) { return o },
}

const initLifeCycle = (lifeCycleHooks) => _lifeCycleHooks = lifeCycleHooks;

const dispatch = (type, params) => {
  return _lifeCycleHooks[type](params);
};

export { dispatch, initLifeCycle }
export default methods;
