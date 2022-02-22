/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2018 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * John Spackman (johnspackman)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("qxl.apiviewer.dao.Constant", {
  extend: qxl.apiviewer.dao.ClassItem,

  construct(meta, clazz, name) {
    this.base(arguments, meta, clazz, name);
    this._value = meta.value;
  },

  members: {
    _value: undefined,

    getValue() {
      return this._value;
    },
  },
});
