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
     * Til Schneider (til132)
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)
     * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)

************************************************************************ */

qx.Class.define("qx.app.apiviewer.ui.panels.EventPanel", {

  extend: qx.app.apiviewer.ui.panels.InfoPanel,
  
  construct: function() {
    this.base(arguments, "Events", "qx/app/apiviewer/image/event18.gif");
  },

  members :
  {

    /**
     * @Override
     */
    canDisplayItem: function(dao) {
      return dao instanceof qx.app.apiviewer.dao.Event; 
    },
    
    _canShowInherited: function() {
      return true;
    },
    
    getPanelItemObjects: function(daoClass, showInherited) {
      var arr = daoClass.getEvents();
      if (showInherited)
        arr = arr.concat(daoClass.getMixinEvents());
      return arr;
    },
        
    /**
     * Checks whether an event has details.
     *
     * @param node {Map} the doc node of the event.
     * @param currentClassDocNode {Map} the doc node of the currently displayed class
     * @return {Boolean} whether the event has details.
     */
    itemHasDetails : function(node, currentClassDocNode) {
      return (
        node.getClass() != currentClassDocNode || // event is inherited
        node.getSee().length > 0 ||
        node.getErrors().length > 0 ||
        qx.app.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node)
      );
    },


    getItemTypeHtml : function(node)
    {
      return qx.app.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
    },


    getItemTitleHtml : function(node)
    {
       return qx.app.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
    },


    /**
     * Creates the HTML showing the information about an event.
     *
     * @param node {Map} the doc node of the event.
     * @param currentClassDocNode {Map} the doc node of the currently displayed class
     * @param showDetails {Boolean} whether to show the details.
     * @return {String} the HTML showing the information about the event.
     */
    getItemTextHtml : function(node, currentClassDocNode, showDetails)
    {
      // Add the description
      var textHtml = new qx.util.StringBuilder(qx.app.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails));

      if (showDetails)
      {
        textHtml.add(qx.app.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(node, currentClassDocNode));
        textHtml.add(qx.app.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node));
        textHtml.add(qx.app.apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode));
        textHtml.add(qx.app.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "event"));

      }

      return textHtml.get()
    }

  }

});
