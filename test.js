const moment = require('moment');

//time data
const array = [];

for (let i = 1; i <= 24; i++) {
  array.push(`${i}:00`);
}

//display time table
for (let time in array) {
  console.log(
    `[${time}] ` +
      array[time] +
      ' => ' +
      moment(moment(array[time], 'HH:mm').toDate().getTime())
  );
}

//Client Request
let req = {
  date: '05/21/2020',
  startTime: moment(array[0], 'HH:mm').toDate().getTime(),
  endTime: moment(array[23], 'HH:mm').toDate().getTime()
};

//Database
let db = {
  dateDb: '05/21/2020',
  start: moment(array[0], 'HH:mm').toDate().getTime(),
  end: moment(array[23], 'HH:mm').toDate().getTime()
};

//process through time, if any
let reqStart = req.startTime;
let reqEnd = req.endTime;
let dbStart = db.start;
let dbEnd = db.end;

//Start Point condition
if (
  (dbStart >= reqStart && dbStart <= reqEnd && dateDb.date === req.date) ||
  (dbEnd >= reqStart && dbEnd <= reqEnd && dateDb.date === req.date) ||
  (dbStart >= reqStart && dbEnd <= reqEnd && dateDb.date === req.date) ||
  (dbStart <= reqStart && dbEnd >= reqEnd && dateDb.date === req.date)
) {
  console.log('overlap');
}

console.log('\n');

console.log(moment(reqStart, 'x').format('hh:mm A'));
console.log(moment(reqEnd, 'x').format('hh:mm A'));
console.log(moment(dbStart, 'x').format('hh:mm A'));
console.log(moment(dbEnd, 'x').format('hh:mm A'));
