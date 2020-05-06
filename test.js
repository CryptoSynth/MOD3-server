const moment = require('moment');

//Client Request

let req = {
  date: '05/21/2020',
  startTime: '10:00 PM',
  endTime: '01:00 AM'
};

//Database
let db = {
  dateDb: '05/20/2020',
  start: '1:30 PM',
  end: '11:00 PM'
};

let reqStart = moment(req.startTime, 'hh:mm A').toDate().getTime();
let reqEnd = moment(req.endTime, 'hh:mm A').toDate().getTime();

let dbStart = moment(db.start, 'hh:mm A').toDate().getTime();
let dbEnd = moment(db.end, 'hh:mm A').toDate().getTime();

//Start Point condition
if (
  (dbStart >= reqStart && dbStart <= reqEnd && db.dateDb === req.date) ||
  (dbEnd >= reqStart && dbEnd <= reqEnd && db.dateDb === req.dat)
) {
  return console.log('overlap');
}

console.log(reqStart);
console.log(reqEnd);
console.log(dbStart);
console.log(dbEnd);
