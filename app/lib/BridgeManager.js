import ComponentManager from 'sn-components-api';

export default class BridgeManager {

  /* Singleton */
  static instance = null;
  static get() {
    if (this.instance == null) { this.instance = new BridgeManager(); }
    return this.instance;
  }

  constructor() {
    this.initiateBridge();
  }

  initiateBridge() {
    var permissions = [
      {
        // name: "stream-context-item"
        name: "stream-items"
      }
    ]

    this.componentManager = new ComponentManager(permissions, function(){
      // on ready
    });

    // this.componentManager.streamContextItem((note) => {...})

    this.componentManager.streamItems(["SN|Component", "SN|Theme", "SF|Extension"], (items) => {
      this.items = items.filter((item) => {return !item.isMetadataUpdate});
    });
  }


}
