(function () {
  "use strict";
  kintone.events.on("app.record.detail.show", async function (event) {
    const reNumber = event.record.RefRecordNo.value;
    console.log(event.record);
    
    const relatedIdPrimary = kintone.app.getRelatedRecordsTargetAppId("Related_records");
    const relatedIdFinal = kintone.app.getRelatedRecordsTargetAppId("Related_records_0");
    const relatedIdEffec = kintone.app.getRelatedRecordsTargetAppId("Related_records_1");
    //button1

   var bodyPrimary = {
      app: relatedIdPrimary,
      query: 'RefRecordNo = "' + reNumber + '" limit 1',
      fields: ["$id", "Status"],
    };
    let primaryData = await kintone.api(
      kintone.api.url("/k/v1/records.json", true),
      "GET",
      bodyPrimary
    ).then(resp => { return resp });

    var bodyFinal = {
      app: relatedIdFinal,
      query: 'RefKey = "' + reNumber + '" limit 1',
      fields: ["$id", "Status"],
    };


    let finalData = await kintone.api(
      kintone.api.url("/k/v1/records.json", true),
      "GET",
      bodyFinal
    ).then(resp => { return resp });

        var body = {
      app: relatedIdEffec,
      query: 'RefKey = "' + reNumber + '" limit 1',
      fields: ["$id", "Status"],
    };

    let effecData = await kintone.api(
      kintone.api.url("/k/v1/records.json", true),
      "GET",
      body
    ).then(resp => {return resp});


    const button1 = document.querySelector(".gaia-app-statusbar-actionmenu .gaia-app-statusbar-action:nth-of-type(1)");
    const button2 = document.querySelector(".gaia-app-statusbar-actionmenu .gaia-app-statusbar-action:nth-of-type(2)");
    const button3 = document.querySelector(".gaia-app-statusbar-actionmenu .gaia-app-statusbar-action:nth-of-type(3)");

    if(primaryData.records[0].Status.value === "Approved" && finalData.records.length === 0){
    button1.style.display = "none";
    button3.style.display = "none";
    }
    if(finalData.records[0].Status.value === "Approved" && effecData.records.length === 0){
    button1.style.display = "none";
    button2.style.display = "none";
    }
    else{
     button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    }
    return event;
  });
})();