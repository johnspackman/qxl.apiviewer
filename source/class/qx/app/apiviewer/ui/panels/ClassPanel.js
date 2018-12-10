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

qx.Class.define("qx.app.apiviewer.ui.panels.ClassPanel",
{
  extend: qx.app.apiviewer.ui.panels.InfoPanel,

  /**
   * Creates class panel. An class panel shows information about classes, mixins
   * and interfaces
   *
   * @param labelText {String} the label text describing the node type.
   */
  construct : function(labelText)
  {
    this.base(arguments, labelText);
  },


  properties :
  {
    type : {
      init: "class",
      check : ["class", "mixin", "interface"]
    }
  },


  members :
  {
    /**
     * @Override
     */
    canDisplayItem: function(dao) {
      if (!(dao instanceof qx.app.apiviewer.dao.Class))
        return false;
      return dao.getType() == this.getType(); 
    },
    
    getItemTypeHtml : function(node)
    {
      return qx.app.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getName(), node, false, true);
    },

    getItemTitleHtml : function(node)
    {
      return node.getFullName();
    },


    getItemTextHtml : function(node, getDocNode, showDetails)
    {
      if (showDetails)
      {
        return qx.app.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(node.getDescription(), node);
      } else {
        return qx.app.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node, showDetails);
      }
    },


    getItemTooltip : function(classNode, currentClassDocNode)
    {
      if (classNode.isAbstract()) {
        var tooltip ="Abstract ";
      } else if (classNode.isStatic()) {
        var tooltip = "Static ";
      } else if (classNode.isSingleton()) {
        var tooltip = "Singleton ";
      } else {
        var tooltip = "";
      }
      switch (classNode.getType())
      {
        case "mixin" :
          tooltip += "Mixin";
          break;

        case "interface" :
          tooltip += "Interface";
          break;

        default:
          tooltip += "Class";
          break;
      }
      return tooltip;
    },


    itemHasDetails : function(node, currentClassDocNode)
    {
      return qx.app.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
    },


    /**
     * Updates an info panel.
     *
     * @param classViewer {qx.app.apiviewer.ui.ClassViewer} parent class viewer widget.
     * @param currentClassDocNode {qx.app.apiviewer.dao.Class} the currently displayed class
     * @return {qx.Promise}
     */
    update : function(classViewer, currentClassDocNode) {
      if (!this.getElement()) {
        return;
      }

      return this.setDocNodeAsync(currentClassDocNode)
        .then(() => currentClassDocNode.loadDependedClasses())
        .then(classes => {
          var nodeArr = [];
          var clType;
          for (var i=0; i<classes.length; i++)
          {
            clType = classes[i].getType();
  
            // Normalize pseudo-classes (for the user this detail is often not relevant)
            if (clType === "bootstrap" || clType === "list") {
              clType = "class";
            }
  
            if (clType === this.getType()) {
              nodeArr.push(classes[i]);
            }
          }
  
          if (nodeArr && nodeArr.length > 0)
          {
            classViewer.sortItems(nodeArr);
          }
  
          this._displayNodes(nodeArr, currentClassDocNode);
        });
    }

  }

});
