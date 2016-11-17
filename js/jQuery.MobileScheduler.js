/*
 * _____/\\\\\\\\\_____/\\\\\\\\\\\\\\\__/\\\\\_____/\\\__/\\\\\\\\\\\\\_______/\\\\\\\\\\\\_______/\\\\\______        
 *  ___/\\\\\\\\\\\\\__\///////\\\/////__\/\\\\\\___\/\\\_\/\\\/////////\\\___/\\\//////////______/\\\///\\\____       
 *   __/\\\/////////\\\_______\/\\\_______\/\\\/\\\__\/\\\_\/\\\_______\/\\\__/\\\_______________/\\\/__\///\\\__      
 *    _\/\\\_______\/\\\_______\/\\\_______\/\\\//\\\_\/\\\_\/\\\\\\\\\\\\\/__\/\\\____/\\\\\\\__/\\\______\//\\\_     
 *     _\/\\\\\\\\\\\\\\\_______\/\\\_______\/\\\\//\\\\/\\\_\/\\\/////////____\/\\\___\/////\\\_\/\\\_______\/\\\_    
 *      _\/\\\/////////\\\_______\/\\\_______\/\\\_\//\\\/\\\_\/\\\_____________\/\\\_______\/\\\_\//\\\______/\\\__   
 *       _\/\\\_______\/\\\_______\/\\\_______\/\\\__\//\\\\\\_\/\\\_____________\/\\\_______\/\\\__\///\\\__/\\\____  
 *        _\/\\\_______\/\\\_______\/\\\_______\/\\\___\//\\\\\_\/\\\_____________\//\\\\\\\\\\\\/_____\///\\\\\/_____ 
 *         _\///________\///________\///________\///_____\/////__\///_______________\////////////_________\/////_______
 *  © Oproma inc. All rights reserved.
 */

(function ($) {
    $.fn.MobileScheduler = function (options) {
        var settings = $.extend({
            // These are the defaults.
            date: new Date(),
            use24HourClock: true,
            events: [],
            prevClass: 'icon-arrow-left5',
            nextClass: 'icon-arrow-right5',
            onEventClick: function (e, event) {},
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
        }, options);

        var $this = this;

        var bindCalendar = function (cssClass) {
            var today = new Date();
            var nextMonth = function () {
                $this.find('.jqms-month-view').on('webkitAnimationEnd animationend', function () {
                    bindCalendar('animated slideInRight');
                }).addClass('animated slideOutLeft');
                if (settings.date.getMonth() === 11) {
                    // set january of next year.
                    settings.date.setMonth(0);
                    settings.date.setFullYear(settings.date.getFullYear() + 1);
                } else {
                    settings.date.setMonth(settings.date.getMonth() + 1);
                }
            };
            var prevMonth = function () {
                $this.find('.jqms-month-view').on('webkitAnimationEnd animationend', function () {
                    bindCalendar('animated slideInLeft');
                }).addClass('animated slideOutRight');
                if (settings.date.getMonth() === 0) {
                    // set december of previous year.
                    settings.date.setMonth(11);
                    settings.date.setFullYear(settings.date.getFullYear() - 1);
                } else {
                    settings.date.setMonth(settings.date.getMonth() - 1);
                }
            };
            $this.empty();
            $this.addClass('jqms-calendar');
            var header = $('<div class="jqms-header"><div class="jqms-month"><a class="jqms-previous"><i class="' + settings.prevClass
                    + '"></i></a><a class="jqms-month-picker">' + settings.labels.months[settings.date.getMonth()] + ', ' + settings.date.getFullYear()
                    + '</a><a class="jqms-next"><i class="' + settings.nextClass + '"></a></div><div class="jqms-days" tabindex="-1"></div></div>');
            var days = header.find('.jqms-days');
            _.each(settings.labels.days, function (day) {
                days.append('<div class="jqms-day">' + day + '</div>');
            });

            header.find('.jqms-previous').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                prevMonth();
            });
            header.find('.jqms-next').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                nextMonth();
            });
            header.find('.jqms-month-picker').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var month = settings.date.getMonth() % 11 + 1;
                var $picker = $('<input type="month" style="height:0px;width:0px;position:absolute;top:-200px;left:-200px;display:inline" value="' + settings.date.getFullYear() + (month < 10 ? '-0' : '-') + month + '">');
                $this.append($picker);
                $picker.bind("keypress", function (e) {
                    if (e.which === 13) {
                        var parts = $(this).val().split('-');
                        if (parts.length === 2) {
                            var inClass = 'animated ', outClass = 'animated ', rebind = true;
                            var newYear = parseInt(parts[0]);
                            var newMonth = parseInt(parts[1]) - 1;
                            if (newYear < settings.date.getFullYear()) {
                                inClass += 'slideInLeft';
                                outClass += 'slideOutRight';
                            } else if (newYear > settings.date.getFullYear()) {
                                inClass += 'slideInRight';
                                outClass += 'slideOutLeft';
                            } else {
                                if (newMonth < settings.date.getMonth()) {
                                    inClass += 'slideInLeft';
                                    outClass += 'slideOutRight';
                                } else if (newMonth > settings.date.getMonth()) {
                                    inClass += 'slideInRight';
                                    outClass += 'slideOutLeft';
                                } else {
                                    rebind = false;
                                }
                            }
                            if (rebind) {
                                settings.date.setFullYear(newYear);
                                settings.date.setMonth(newMonth);
                                $this.find('.jqms-month-view').on('webkitAnimationEnd animationend', function () {
                                    bindCalendar(inClass);
                                }).addClass(outClass);
                            }
                        }
                        $picker.remove();
                    }
                });
                $picker.focus();
            });

            $this.append(header);

            var content = $('<div class="jqms-view-container"><div class="jqms-month-view-container"><div class="jqms-month-view ' + (_.isString(cssClass) ? cssClass : '') + '" tabindex="-1"></div></div><div class="jqms-list-view"><ul class="jqms-list-items"></ul></div></div>');
            var monthView = content.find('.jqms-month-view');

            var monthStart = new Date(settings.date.getFullYear(), settings.date.getMonth(), 1);
            var fillerCellCount = 0;
            for (; fillerCellCount < monthStart.getDay(); fillerCellCount++) {
                monthView.append('<div class="jqms-day-cell"></div>');
            }

            var monthEvents = _.filter(settings.events, function (event) {
                if (event && event.start && settings && settings.date) {
                    if (event.allday) {
                        return event.start.getUTCFullYear() === settings.date.getFullYear() && event.start.getUTCMonth() === settings.date.getMonth();
                    } else {
                        return event.start.getFullYear() === settings.date.getFullYear() && event.start.getMonth() === settings.date.getMonth();
                    }
                }
                return false;
            });

            var daysInMonth = new Date(settings.date.getFullYear(), settings.date.getMonth() + 1, 0).getDate();

            // add day cells.
            for (var i = 1; i <= daysInMonth; i++) {
                var cell = $('<div class="jqms-day-cell"></div>');
                cell.append('<span>' + i + '</span>');
                cell.data('day', i);
                cell.click(function () {
                    settings.date.setDate($(this).data('day'));
                    bindCalendar();
                });

                if (today.getFullYear() === settings.date.getFullYear() && today.getMonth() === settings.date.getMonth() && today.getDate() === i) {
                    cell.addClass('jqms-today');
                }

                if (settings.date.getDate() === i) {
                    cell.addClass('jqms-active');
                }



                if (_.filter(monthEvents, function (event) {
                    return event && event.start && ((!event.allday && event.start.getDate() === i) || (event.allday && event.start.getUTCDate() === i));
                }).length > 0) {
                    cell.append('<span>&#9679;</span>');
                }
                monthView.append(cell);
            }

            // Fix layouts for months that are either less or more than 5 "weeks"/rows.
            if ((daysInMonth + fillerCellCount) > 35) {
                monthView.addClass('jqms-long');
            } else if ((daysInMonth + fillerCellCount) === 28) {
                monthView.addClass('jqms-short');
            }

            monthView.on('webkitAnimationEnd animationend', function () {
                monthView.removeClass('animated slideInRight slideInLeft');
            });
            monthView.click(function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            // bind day list.
            var dayEvents = _.filter(monthEvents, function (event) {
                return event && event.start && ((!event.allday && event.start.getDate() === settings.date.getDate()) || (event.allday && event.start.getUTCDate() === settings.date.getDate()));
            });

            var listItems = content.find('.jqms-list-items');
            _.each(_.sortBy(dayEvents, function (event) {
                return event.start.getTime();
            }), function (event) {
                var startTime = settings.labels.allday;
                var endTime = settings.labels.allday;
                if (!event.allday) {
                    if (settings.use24HourClock) {
                        startTime = (event.start.getHours() < 10 ? '0' : '') + event.start.getHours() + ':' + (event.start.getMinutes() < 10 ? '0' : '') + event.start.getMinutes();
                        endTime = (event.end.getHours() < 10 ? '0' : '') + event.end.getHours() + ':' + (event.end.getMinutes() < 10 ? '0' : '') + event.end.getMinutes();
                    } else {
                        var starthours = event.start.getHours() % 12;
                        var endhours = event.end.getHours() % 12;
                        if (starthours === 0) {
                            starthours = 12;
                        }
                        if (endhours === 0) {
                            endhours = 12;
                        }
                        startTime = (starthours < 10 ? '0' : '') + starthours + ':' + (event.start.getMinutes() < 10 ? '0' : '') + event.start.getMinutes() + (event.start.getHours() > 12 ? ' PM' : ' AM');
                        endTime = (endhours < 10 ? '0' : '') + endhours + ':' + (event.end.getMinutes() < 10 ? '0' : '') + event.end.getMinutes() + (event.end.getHours() > 12 ? ' PM' : ' AM');
                    }
                }
                var listItem = $('<li><div><span>' + startTime + '</span><span>' + endTime + '</span></div><span>' + event.title + '</span></li>');

                listItem.data('event', JSON.stringify(event));

                listItem.click(function (e) {
                    settings.onEventClick(e, JSON.parse($(this).data('event')));
                });
                listItems.append(listItem);
            });

            $this.append(content);

            if (window.IScroll) {
                var myScroll = new IScroll($this.find('.jqms-month-view-container')[0], {
                    disableMouse: true,
                    disablePointer: true,
                    bindToWrapper: true,
                    scrollX: true,
                    probeType: 3,
                    eventPassthrough: true
                });
                var goToPrev = false, goToNext = false;

                myScroll.on('scroll', function (e) {
                    if (this.x > ($(window).width() * 0.05)) {
                        goToPrev = true;
                    } else if (this.x < -($(window).width() * 0.05)) {
                        goToNext = true;
                    } else {
                        goToPrev = false;
                        goToNext = false;
                    }
                });
                $this.find('.jqms-month-view').on('touchend', function () {
                    if (goToNext) {
                        nextMonth();
                    } else if (goToPrev) {
                        prevMonth();
                    }
                });
            }
        };
        bindCalendar();
        return this;
    };

}(jQuery));