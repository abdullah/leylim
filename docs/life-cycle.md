##Life Cycle Events

###Use

At end of lifecycle hook you must return given object from hooks.

####Event List

```javascript
  beforeCreate() {},
  created() {},
  beforeRowUpdate(component) {},
  rowUpdated(component) {},
  beforeRowDelete(component) {},
  rowDeleted(component) {},
  beforeRowDuplicate(component) {},
  rowDuplicated(component) {},
  beforeRowAdd(component) {},
  rowAdded(component) {},
```


### Example

```javascript
  new Leylim({
    //...
    beforeRowUpdate({ component, node }) {
      // Do this
      return { component, node };
    },
  });
}
```
