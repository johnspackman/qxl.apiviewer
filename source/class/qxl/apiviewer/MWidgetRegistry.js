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
qx.Mixin.define("qxl.apiviewer.MWidgetRegistry",
  {

    properties :
  {
    id : {
      check : "String",
      apply : "_applyId",
      nullable : true,
      init : null
    }
  },

    members :
  {
    _applyId : function(id, oldId) {
      var statics = qxl.apiviewer.MWidgetRegistry;
      if (oldId) {
        statics.unregister(this, oldId);
      }
      if (id) {
        statics.register(this, id);
      }
    },

    getWidgetById : function(id) {
      return qxl.apiviewer.MWidgetRegistry.getWidgetById(id);
    }

  },

    statics :
  {
    __objectDb : {},

    /**
     * Returns the widget registered under the given id by {@link #register}
     *
     * @param id {String} the id of the widget
     * @return {qx.ui.core.Widget} the widget.
     */
    getWidgetById : function(id) {
      return this.__objectDb[id];
    },

    /**
     * Registers a widget under the given widget id to be used with
     * {@link #getWidgetById}.
     * @param object
     * @param id {String} the id of the widget.
     */
    register : function(object, id) {
      if (this.__objectDb[id]) {
        throw new Error("An object with the id '"+id+"' already exists.");
      }
      this.__objectDb[id] = object;
    },

    unregister : function(object, id) {
      if (this.__objectDb[id] !== object) {
        throw new Error("The object is not registered with the id '"+id+"'.");
      }
      delete (this.__objectDb[id]);
    }

  }

  });
