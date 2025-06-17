(function () {
  "use strict";

  // event
  const events = [
    "app.record.create.show",
    "app.record.index.show",
    "app.record.edit.show",
    "app.record.detail.show",
  ];

  kintone.events.on(events, async function (event) {

    // get appID
    let AppID = kintone.app.getId();

    // get field 
    let GETFIELD = await kintone.api("/k/v1/preview/app/form/fields", "GET", {
      app: AppID,
    });

    const fieldCodes = ["RefKey", "RefRecordNo"];
    let hasFieldCode = true;

    // Check field to match fieldCodes
    for (const code of Object.keys(GETFIELD.properties)) {
      let field = GETFIELD.properties[code];

      if (fieldCodes.includes(field.code)) {
        kintone.app.record.setFieldShown(field.code, false);
        hasFieldCode = false;
      }
    }

    // check hasFieldCode = false to remove
    if (!hasFieldCode) {
      const addButton = document.querySelector(".gaia-argoui-app-menu-add");
      if (addButton) {
        addButton.remove();
      }
    }

    // Remove icon in the table
    let elements = document.querySelectorAll(".recordlist-edit-gaia");
    elements.forEach((element) => {
      element.remove();
    });
//
    const recordRows = document.querySelectorAll(".recordlist-row-gaia");
    recordRows.forEach((row) => {
      row.addEventListener(
        "dblclick",
        function (e) {
          e.stopImmediatePropagation();
          e.preventDefault();
        },
        true
      );
    });
    return event;
  });
})();
