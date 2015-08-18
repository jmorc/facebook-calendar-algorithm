var events = [
{ id: 1, start: 15, end: 90 },
{ id: 2, start: 20, end: 80 },
{ id: 3, start: 75, end: 180 },
{ id: 4, start: 90, end: 180 },
];

var START = 's';
var END = 'e';


// does this work with more complex overlappings

var sortEvents = function ( events ) {
  var eventArr = [];

  events.forEach( function ( event ) {
    eventArr.push({ id: event.id, time: event.start, cat: START });
    eventArr.push({ id: event.id, time: event.end, cat: END });
  });

  eventArr.sort( function ( event1, event2 ) {
    if ( event1.time === event2.time ) {
      if ( event1.cat === END ) {
        return -1;// -1, 0, 1
      } else {
        return 1;
      }
    }

    return event1.time - event2.time;
  });

  return eventArr;
};

var placeEvents = function ( events ) {
  var sortedEvents = sortEvents( events );
  var concurrent = [];
  var maxRank = 1;

  // confusing that rank starts at 0, maxRank starts at 1

  for ( var i = 0; i < sortedEvents.length; i++ ) {
    var event = sortedEvents[i];
    var numConcurrent = concurrent.filter( function ( el ) {
      return !el.over;
    }).length;



    if ( event.cat === START ) {
      if ( (numConcurrent + 1) > maxRank ) {
        maxRank = numConcurrent + 1;
      }

      concurrent.push({
        id: event.id,
        over: false,
        rank: numConcurrent,
        maxRank: null
      });
    } else {
      concurrent.forEach( function ( el ) {
        if ( el.id === event.id ) {
          el.over = true;
        }
      });
      if ( numConcurrent === 1 ) { // not easy to understand
        concurrent.forEach(function ( el ) {
          if ( el.maxRank === null ) el.maxRank = maxRank;
        });

        maxRank = 1;
      }
    }
  }

  return concurrent;
};

console.log(placeEvents(events));
