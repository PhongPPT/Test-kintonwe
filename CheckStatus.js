(function () {
  "use strict";

  kintone.events.on(
    ["app.record.detail.process.proceed", "app.record.detail.show"],
    async function (event) {
      let record = event.record;
      let fieldReview = record.Review.value;
      let status = record.Status?.value || record.__STATUS__?.value || "";
      let lang = kintone.getLoginUser().language;
      let statusLabel = lang === "ja" ? "レビュー" : "Review";
      let fieldValue = lang === "ja" ? "レビューなし" : "Not Review";
      if (status === statusLabel && fieldReview === fieldValue) {
        event.error =
          "先に進む前に、フィールド名「レビュー」でレビュー済みを選択してください！";
        return event;
      }
      return event;
    }
  );
})();
