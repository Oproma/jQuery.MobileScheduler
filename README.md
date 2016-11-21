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
On initialization, the plugin can accept a settings object. All values are optional.

| Key                | data type      | Default Value      | Description |
| ------------------ |:--------------:|:------------------:| ----------- |
| **date**           | *Date Object*  | new Date()           | The date at which to start the scheduler. |
| **use24HourClock** | *boolean*      | true                 | Indicates whether to use a 24h clock or a 12 hour clock. |
| **events**         | *Array[event]* | []                   | The events to bind to the scheduler. See **EVENTS** for more information. |
| **prevClass**      | *String*       | 'icon-arrow-left5'   | The css class to apply to the previous button.  |   
| **nextClass**      | *String*       | 'icon-arrow-right5'  | The css class to apply to the next button.  |
| **onEventClick**   | *function*     | An empty function    | The handler called when a user click/taps and event in the list. The first parameter is the event object bound to the scheduler and the second parameter is the original event. |
| **onEventCreate**  | *function*     | An empty function    | The handler called when a user click/taps on the "New" button. The first parameter is the currently selected date in the scheduler and the second parameter is the original event. If null, the create event button is hidden.|
| **labels**         | *Object*       | See after            | The collection of labels to use with the scheduler. See after. |
		
Label Format

| Key                | data type       | Default Value      | Description |
| ------------------ |:---------------:|:------------------:| ----------- |
| **allday**         | *String*        | "all-day"          | The string to represent a full day event. |
| **newevent**       | *String*        | "New"              | The string to use on the new event button. |
| **today**          | *String*        | "Today"            | The string to use on the today button. |
|  **months**        | *Array[String]* | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] | A list of the names of the 12 months of the year. |
| **days**           | *Array[String]* | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] | A list of the days of the week in short form. |

## EVENTS
jQuery.MobileScheduler expects a specific format for event objects. While this example is minimal, other fields can be included in the object and will be passed to the **onEventClick** event.

| Key                | data type      | Description |
| ------------------ |:--------------:| --------- |
| **title**          | *String*       | The title or summary of the event. |
| **start**          | *Date Object*  | The date and time at which the event starts. All-day events should start at midnight the day of the event. |
| **end**            | *Date Object*  | The date and time at which the event ends. All-day events should end at midnight the next day. |
| **allday**         | *boolean*      | Indicates whether this is a full day event or not. |

## EXAMPLE
    <div id="calendar"></div>

    $('#calendar').MobileScheduler({
        date: new Date(),
        use24HourClock: true,
        events: [{
                title: "New Event",
                start: new Date(),
                end: new Date(),
                allday: true
            }],
        prevClass: 'fa fa-arrow-left',
        nextClass: 'fa fa-arrow-right',
        onEventCreate: function (e, date) {
            console.log(date);
        },
        onEventClick: function (e, event) {
            console.log(event)
        },
        labels: {
            allday: "all-day",
            newevent: "New",
            today: "Today",
            months: ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            days: [
                'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
            ]
        }
    });

## DEMO
[Mobile Demo](https://oproma.github.io/jQuery.MobileScheduler/)

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
