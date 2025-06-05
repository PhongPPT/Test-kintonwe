(function () {
  "use strict";

  const events = [
    "app.record.create.show",
    "app.record.index.show",
    "app.record.edit.show",
    "app.record.detail.show",
  ];

  kintone.events.on(events, async function (event) {
    const record = event.record;
    
    let AppID = kintone.app.getId();
    
    let GETFIELD = await kintone.api("/k/v1/preview/app/form/fields", "GET", {
      app: AppID,
    });

    const fieldCodes = ["RefKey", "RefRecordNo"];
    let hasFieldCode = true;

    for (const code of Object.keys(GETFIELD.properties)) {
      let field = GETFIELD.properties[code];

      if (fieldCodes.includes(field.code)) {
        kintone.app.record.setFieldShown(field.code, false);
        hasFieldCode = false;
      }
    }

    if (!hasFieldCode) {
      const addButton = document.querySelector(".gaia-argoui-app-menu-add");
      if (addButton) {
        addButton.remove();
      }
    }

    return event;
  });
})();
