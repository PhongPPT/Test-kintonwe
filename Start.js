// (function () {
//   "use strict";

//   const events = [
//     "app.record.create.show",
//     "app.record.index.show", // ❌ This one is not compatible with `event.record`, consider removing
//     "app.record.edit.show",
//     "app.record.detail.show",
//   ];

//   kintone.events.on(events, async function (event) {
//     const record = event.record;

//     let related = kintone.app.getRelatedRecordsTargetAppId("Related_records");

//     console.log("Target App ID (RefRecordNo):", related);

//     var body = {
//       app: related,
//       query:
//         "Created_by in (LOGINUSER()) and Created_datetime = TODAY() order by $id asc limit 100 offset 0",
//       fields: ["$id", "Status"],
//     };

//     kintone.api(
//       kintone.api.url("/k/v1/records.json", true),
//       "GET",
//       body,
//       function (resp) {
//         // success
//         console.log(resp);
//       },
//       function (error) {
//         // error
//         console.log(error);
//       }
//     );

//     return event;
//   });
// })();

(function () {
  "use strict";

  const events = [
    "app.record.create.show",
    "app.record.edit.show",
    // "app.record.detail.show",
  ];

  // Replace with the actual related App ID (integer)
  const RELATED_APP_ID =
    kintone.app.getRelatedRecordsTargetAppId("Related_records");

  kintone.events.on(events, async function (event) {
    const record = event.record;
    let number = record.RefRecordNo.value;

    const params = {
      app: RELATED_APP_ID,
      query: `Status = "Approved" order by $id asc limit 5 offset 0`,
      fields: ["$id", "Status"],
    };

    try {
      const resp = await kintone.api(
        kintone.api.url("/k/v1/records", true),
        "GET",
        params
      );
      console.log("Related records response:", resp);
    } catch (error) {
      console.error("Failed to get related records:", error);
    }

    var body = {
      app: kintone.app.getId(),
      lang: "en",
    };

    kintone.api(
      kintone.api.url("/k/v1/app/actions.json", true),
      "GET",
      body,
      function (resp) {
        // success
        console.log(resp);
      },
      function (error) {
        // error
        console.log(error);
      }
    );

    return event;
  });
})();
