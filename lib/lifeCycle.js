export default {
  beforeCreate() { },
  created() { },
  beforeRowUpdate(templateNode, component, cb) { cb(component, component); },
  rowUpdated() { },
  beforeRowDelete(row, cb) { cb(row); },
  rowDeleted() { },
  beforeRowDuplicate(row, cb) { cb(row); },
  rowDuplicated() { },
  beforeRowAdd(row, cb) { cb(row); },
  rowAdded() { },
}
