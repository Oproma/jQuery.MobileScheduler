# jQuery.MobileScheduler
An event scheduler/viewer for mobile. Tested with Cordova on iOS and Android.

## HARD DEPENDENCIES
- CSS 3
- jQuery 2.2.x +
- underscore.js 1.8.x +

##SOFT DEPENDENCIES
- animate.css
	- For smoother transitions.
- iScroll-probe 5.2.x+
	- To be able to swipe between months.

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
		start: new Date(),
		end: new Date(),
		allday: true
	}

## EXAMPLE
	<div id="calendar"></div>


	$('#calendar').MobileScheduler({
	    date: new Date(2016, 11, 11),
	    use24HourClock: true,
	    events: [{
		    title: "New Event",
		    start: new Date(),
		    end: new Date(),
		    allday: true
		}],
	    prevClass: 'fa-arrow-left',
	    nextClass: 'fa-arrow-right',
	    onEventClick: function (e, event) {
	        console.log(event)
	    },
	    labels: {
	        allday: "all-day",
	        months: ['January', 'February', 'March', 'April', 'May', 'June',
	            'July', 'August', 'September', 'October', 'November', 'December'
	        ],
	        days: [
	            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
	        ]
	    }
	});

## LICENSE
	Copyright 2016 Oproma inc.

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

##AUTHOR
@atnpgo