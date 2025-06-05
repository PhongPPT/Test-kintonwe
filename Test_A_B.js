// (function () {
//   "use strict";
//   const events = [
//     "app.record.create.show",
//     "app.record.edit.show",
//     "app.record.detail.show",
//     "app.record.detail.process.proceed",
//   ];
//   kintone.events.on(events, async function (event) {
//     const record = event.record;
//     console.log("object:", record);
//     const dropdownField = record.Drop_down ? record.Drop_down.value : null;
//     let Username = record.username ? record.username.value : '';
//     let Lastname = record.lastname ? record.lastname.value : '';
//     let Age = record.age ? record.age.value : '';
//     let newVacation;
//     let data_user;
//     const status =
//       (record.Status && record.Status.value) ||
//       (record.__STATUS__ && record.__STATUS__.value) ||
//       null;

//     const isCompleted = status === "Completed";

//     console.log("status:", status);

//     const body = {
//       app: kintone.app.getId(),
//     };

//     const data_status = await kintone.api(
//       kintone.api.url("/k/v1/app/status.json", true),
//       "GET",
//       body
//     );
//     console.log("object:", data_status);

//     Object.entries(data_status.states).forEach(([statusName, details]) => {
//         const Detail_user = details.assignee?.entities;
//         if(Detail_user && Detail_user.length > 0) {
//             data_user = Detail_user[0].entity?.code;
//             console.log(data_user)
//         }
//       console.log("Details:", details);
//     });

//     if (dropdownField === "sample1" && isCompleted && data_user === "Toto@gmail.com") {
//         console.log("test pass", data_user);
//         try {
//             const APP_ID = 67;
//             const resp = await kintone.api(
//                 kintone.api.url("/k/v1/records", true),
//                 "GET",
//                 {
//                     app: APP_ID,
//                     query: "order by $id desc limit 1",
//                 }
//             );

//             if (!resp.records || resp.records.length === 0) {
//                 console.warn("No matching record found in App 64.");
//                 return event;
//             }

//             const relatedRecord = resp.records[0];
//             const recordId = relatedRecord.$id.value;

//             await kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
//                 app: APP_ID,
//                 id: recordId,
//                 record: {
//                     Test1: {
//                         value: Username,
//                     },
//                 },
//             });
//         } catch (error) {
//             console.error("Error updating vacation balance:", error);
//         }
//     } else if (dropdownField === "sample2" && isCompleted && data_user === "fong@gmail.com") {
//         console.log("test pass", data_user);
//         try {
//             const APP_ID = 67;
//             const resp = await kintone.api(
//                 kintone.api.url("/k/v1/records", true),
//                 "GET",
//                 {
//                     app: APP_ID,
//                     query: "order by $id desc limit 1",
//                 }
//             );

//             if (!resp.records || resp.records.length === 0) {
//                 console.warn("No matching record found in App 64.");
//                 return event;
//             }

//             const relatedRecord = resp.records[0];
//             const recordId = relatedRecord.$id.value;

//             await kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
//                 app: APP_ID,
//                 id: recordId,
//                 record: {
//                     test2: {
//                         value: Lastname,
//                     },
//                 },
//             });
//         } catch (error) {
//             console.error("Error updating vacation balance:", error);
//         }
//     } else if (dropdownField === "sample3" && isCompleted && data_user === "ku@gmail.com") {
//          console.log("test pass", data_user);
//         try {
//             const APP_ID = 67;
//             const resp = await kintone.api(
//                 kintone.api.url("/k/v1/records", true),
//                 "GET",
//                 {
//                     app: APP_ID,
//                     query: "order by $id desc limit 1",
//                 }
//             );

//             if (!resp.records || resp.records.length === 0) {
//                 console.warn("No matching record found in App 64.");
//                 return event;
//             }

//             const relatedRecord = resp.records[0];
//             console.log("object:", relatedRecord);
//             const recordId = relatedRecord.$id.value;

//             await kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
//                 app: APP_ID,
//                 id: recordId,
//                 record: {
//                     test3: {
//                         value: Age,
//                     },
//                 },
//             });
//         } catch (error) {
//             console.error("Error updating vacation balance:", error);
//         }
//     }
//     return event;
//   });
// })();

(function () {
  "use strict";

  const events = [
    "app.record.create.show",
    "app.record.edit.show",
    "app.record.detail.show",
    "app.record.detail.process.proceed",
  ];

  kintone.events.on(events, async function (event) {
    const record = event.record;
    const dropdownField = record.Drop_down?.value || null;
    const username = record.username?.value || "";
    const lastname = record.lastname?.value || "";
    const age = record.age?.value || "";
    console.log("object:", username);
    console.log("object:", lastname);
    console.log("object:", age);

    const status = record.Status?.value || record.__STATUS__?.value || null;
    console.log("object:", status);

    if (
      status !== "Completed1" &&
      status !== "Completed2" &&
      status !== "Completed3"
    ) {
      console.log("Manual check: status is invalid.");
      return event;
    }

    const APP_ID = 68;
    let newRecord = {};
    let query = "";
    let valueToCheck = "";

    if (dropdownField === "sample1" && status === "Completed1") {
      newRecord.test1 = { value: username };
      query = `test1 = "${username}"`;
      valueToCheck = username;
    } else if (dropdownField === "sample2" && status === "Completed2") {
      newRecord.test2 = { value: lastname };
      query = `test2 = "${lastname}"`;
      valueToCheck = lastname;
    } else if (dropdownField === "sample3" && status === "Completed3") {
      newRecord.test3 = { value: age };
      query = `test3 = "${age}"`;
      valueToCheck = age;
    } else {
      console.log("Conditions not met for record creation.");
      return event;
    }
    console.log("newRecord", newRecord);
    if (!valueToCheck) {
      console.log("No value provided, skipping record creation.");
      return event;
    }

    try {
      // 🔍 Check for existing record to avoid duplicate
      const check = await kintone.api(
        kintone.api.url("/k/v1/records", true),
        "GET",
        {
          app: APP_ID,
          query: `${query} limit 1`,
        }
      );

      console.log("object: ", check);

      if (check.records.length > 0) {
        console.log("Duplicate record detected. Skipping creation.");
        return event;
      }

      const response = await kintone.api(
        kintone.api.url("/k/v1/record", true),
        "POST",
        {
          app: APP_ID,
          record: newRecord,
        }
      );

      console.log("New record created successfully:", response);
    } catch (error) {
      console.error("Error during record check or creation:", error);
    }

    return event;
  });
})();
