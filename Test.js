(function () {
  "use strict";

  const events = [
    "app.record.create.show",
    "app.record.edit.show",
    "app.record.detail.show",
  ];

  kintone.events.on(events, function (event) {
    const record = event.record;
    record.Number.value = 15;
    record.Number.disabled = true;
    return event;
  });
})();
