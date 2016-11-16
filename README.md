# jQuery.MobileScheduler
An event scheduler/viewer for mobile. Tested with Cordova on iOS and Android.

## HARD DEPENDENCIES
- CSS 3
- jQuery 2.2.x +
- underscore.js 1.8.x +
##SOFT DEPENDENCIES
- animate.css
- iScroll-probe 5.2.x+
## SETTINGS
- **date** *Date* 
	- The date to show.
- **use24HourClock** *boolean* 
	- Indicates whether to use a 24h clock or a 12 hour clock.
- **events** *Array* 
	- The events to bind to the calendar. See the **EVENTS** section for more information.
- **prevClass** *String*
	- The css class to apply to the previous button.
- **nextClass** *String*
	- The css class to apply to the next button.
- **onEventClick** *function*
	- The handler called when a user click/taps. The first parameter is the original event and the second parameter is the event object bound to the scheduler.
- **labels** *Object*
	- The collection of labels to use with the scheduler. Consists of
		- **allday** *String* "all-day"
		- **months** *Array* A list of the names of the 12 months of the year.
		- **days** *Array* A list of the days of the week.
## EVENTS
jQuery.MobileScheduler expects a specific format for event objects. While this example is minimal, other fields can be included in the object and will be passed to the **onEventClick** event.
    
	{
		title: "New Event",
		startTime: new Date(),
		endTime: new Date(),
		allday: true
	}

## EXAMPLE
	<div id="calendar"></div>


	$('#calendar').MobileScheduler({
	    date: new Date(2016, 11, 11),
	    use24HourClock: true,
	    events: [],
	    prevClass: 'fa-arrow-left',
	    nextClass: 'fa-arrow-right',
	    onEventClick: function (e, event) {
	        console.log(event)
	    },
	    labels: {
	        allday: "all-day",
	        months: [
	            'January',
	            'February',
	            'March',
	            'April',
	            'May',
	            'June',
	            'July',
	            'August',
	            'September',
	            'October',
	            'November',
	            'December'
	        ],
	        days: [
	            'Sun',
	            'Mon',
	            'Tue',
	            'Wed',
	            'Thu',
	            'Fri',
	            'Sat'
	        ]
	    }
	});