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
    const dropdownField = record.type ? record.type.value : null;
    const totalDay = parseFloat(record.total_day_0.value || 0);
    console.log(totalDay)
    let newVacation;
    const status =
      (record.Status && record.Status.value) ||
      (record.__STATUS__ && record.__STATUS__.value) ||
      null;

    console.log("status:", status);

    if (dropdownField === "1.Annual leave" && status === "Complate") {
      try {
        const APP_ID = 64;
        const resp = await kintone.api(
          kintone.api.url("/k/v1/records", true),
          "GET",
          {
            app: APP_ID,
            query: "order by $id desc limit 1",
          }
        );

        if (!resp.records || resp.records.length === 0) {
          console.warn("No matching record found in App 64.");
          return event;
        }

        const relatedRecord = resp.records[0];
        console.log("object:", relatedRecord);
        const recordId = relatedRecord.$id.value;
        // const vacation = relatedRecord.Number ? relatedRecord.Number.value : 0;
        const currentVacation = parseFloat(relatedRecord.Number?.value || 0);

        newVacation = currentVacation - totalDay;

        console.log("Updating record:", {
          recordId,
          newVacation,
          totalDay,
        });

        if (newVacation < 0) newVacation = 0;
        console.log("test:", totalDay);

        await kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
          app: APP_ID,
          id: recordId,
          record: {
            Number: {
              value: newVacation,
            },
            Test_1: {
              value: totalDay,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching records from App 64:", error);
      }
    }else {
        try {
        const APP_ID = 64;
        const resp = await kintone.api(
          kintone.api.url("/k/v1/records", true),
          "GET",
          {
            app: APP_ID,
            query: "order by $id desc limit 1",
          }
        );

        if (!resp.records || resp.records.length === 0) {
          console.warn("No matching record found in App 64.");
          return event;
        }

        const relatedRecord = resp.records[0];
        console.log("object:", relatedRecord);
        const recordId = relatedRecord.$id.value;
        // const vacation = relatedRecord.Number ? relatedRecord.Number.value : 0;
        const currentVacation = parseFloat(relatedRecord.Number?.value || 0);

        newVacation = currentVacation - totalDay;

        console.log("Updating record:", {
          recordId,
          newVacation,
          totalDay,
        });

        if (newVacation < 0) newVacation = 0;
        console.log("test:", totalDay);

        await kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
          app: APP_ID,
          id: recordId,
          record: {
            Number: {
              value: newVacation,
            },
            Test_1: {
              value: totalDay,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching records from App 64:", error);
      }
    }
    return event;
  });
})();
