(function () {
  "use strict";
  kintone.events.on("app.record.detail.show", async function (event) {
    var user = kintone.getLoginUser();
    var body = {
      'code': user.code
    };
    let groupData = await kintone.api(
      kintone.api.url('/v1/user/groups.json', true),
      "GET",
      body
    ).then(resp => { return resp });  

    const targetGroup = groupData.groups.find(group => group.code === "Head of Department_T7HtMb");
    const button = document.querySelector(".gaia-app-statusbar-actionmenu .gaia-app-statusbar-action");
    const record = event.record;
    if (record.Status.value !== "Approved") {
         button.style.display = "none";     
    }
    return event;
  });
})()