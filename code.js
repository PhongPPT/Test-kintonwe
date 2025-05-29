(function () {
  'use strict';

  const events = [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.detail.show'
  ];

  // Update on form load (existing code)
  kintone.events.on(events, function (event) {
    const record = event.record;
    // Hide the total_day field
   kintone.app.record.setFieldShown('total_day', false);
    const value = record.total_day.value;


    if (value !== undefined && value !== null && value !== '') {
      record.number.value = Number(value);
    } else {
      record.number.value = '';
    }
    return event;
  });

  // Update when total_day changes
  kintone.events.on(['app.record.create.change.total_day', 'app.record.edit.change.total_day'], function(event) {
    const record = event.record;
    const value = record.total_day.value;
    if (value !== undefined && value !== null && value !== '') {
      record.number.value = Number(value);
    } else {
      record.number.value = '';
    }
    return event;
  });

})();
