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
            onEventClick: function (event, e) {},
            onEventCreate: function (date, e) {},
            labels: {
                allday: "all-day",
                newevent: "New",
                today: "Today",
                ends: "Ends",
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
                    + '</a><a class="jqms-next"><i class="' + settings.nextClass + '"></i></a></div><div class="jqms-days"></div>'
                    + '<div class="jqms-picker"><div class="jqms-picker-header"><a class="jqms-picker-previous"><i class="' + settings.prevClass
                    + '"></i></a><span class="jqms-picker-title">' + settings.date.getFullYear() + '</span><a class="jqms-picker-next"><i class="'
                    + settings.nextClass + '"></a></div><div class="jqms-months"></div></div></div>');

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

            var changeMonth = function (newYear, newMonth) {
                if (_.isNumber(newYear) && _.isNumber(newMonth)) {
                    var inClass = 'animated ', outClass = 'animated ';
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
                        }
                    }
                    settings.date.setFullYear(newYear);
                    settings.date.setMonth(newMonth);
                    $this.find('.jqms-month-view').on('webkitAnimationEnd animationend', function () {
                        bindCalendar(inClass);
                    }).addClass(outClass);
                }
            };

            header.find('.jqms-month-picker').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                $this.find('.jqms-picker').css('display', 'flex').on('click', function (e) {
                    e.stopPropagation();
                });
                $this.on('click', function () {
                    $this.find('.jqms-picker').css('display', 'none');
                    $this.off('click');
                });
            });

            var $picker = header.find('.jqms-picker');
            $picker.data('year', settings.date.getFullYear());
            _.each(settings.labels.months, function (month, idx) {
                $picker.find('.jqms-months').append('<button class="jqms-month" data-month="' + idx + '">' + month + '</button>');
            });
            $picker.find('.jqms-month').click(function () {
                changeMonth(parseInt($picker.data('year')), parseInt($(this).data('month')));
            });
            $picker.find('.jqms-picker-previous').click(function (e) {
                var newYear = parseInt($picker.data('year')) - 1;
                $picker.data('year', newYear);
                $picker.find('span.jqms-picker-title').text(newYear);
            });
            $picker.find('.jqms-picker-next').click(function (e) {
                var newYear = parseInt($picker.data('year')) + 1;
                $picker.data('year', newYear);
                $picker.find('span.jqms-picker-title').text(newYear);
            });


            $this.append(header);

            var content = $('<div class="jqms-view-container"><div class="jqms-month-view-container"><div class="jqms-month-view ' + (_.isString(cssClass) ? cssClass : '') + '" tabindex="-1"></div></div><div class="jqms-list-view"><ul class="jqms-list-items"></ul></div></div>');
            var monthView = content.find('.jqms-month-view');

            var monthStart = new Date(settings.date.getFullYear(), settings.date.getMonth(), 1);
            var monthEnd = new Date(settings.date.getFullYear(), settings.date.getMonth() + 1, 1);
            var fillerCellCount = 0;
            for (; fillerCellCount < monthStart.getDay(); fillerCellCount++) {
                monthView.append('<div class="jqms-day-cell"></div>');
            }

            var monthEvents = _.filter(settings.events, function (event) {
                if (event && event.start && event.end && settings && settings.date) {
                    if (event.start >= monthStart && event.start < monthEnd) {
                        return true;
                    } else if (event.end >= monthStart && event.end < monthEnd) {
                        return true;
                    } else if (event.start < monthStart && event.end > monthEnd) {
                        return true;
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


                var dayStart = new Date(settings.date.getFullYear(), settings.date.getMonth(), i);
                var dayEnd = new Date(settings.date.getFullYear(), settings.date.getMonth(), i + 1);
                if (_.filter(monthEvents, function (event) {
                    if (event && event.start && event.end) {
                        if (event.start >= dayStart && event.start < dayEnd) {
                            return true;
                        } else if (event.end > dayStart && event.end < dayEnd) {
                            return true;
                        } else if (event.start < dayStart && event.end >= dayEnd) {
                            return true;
                        }
                    }
                    return false;
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
            var dayStart = new Date(settings.date.getFullYear(), settings.date.getMonth(), settings.date.getDate());
            var dayEnd = new Date(settings.date.getFullYear(), settings.date.getMonth(), settings.date.getDate() + 1);
            var dayEvents = _.filter(monthEvents, function (event) {
                if (event && event.start && event.end) {
                    if (event.start >= dayStart && event.start < dayEnd) {
                        return true;
                    } else if (event.end > dayStart && event.end < dayEnd) {
                        return true;
                    } else if (event.start < dayStart && event.end >= dayEnd) {
                        return true;
                    }
                }
                return false;
            });

            var listItems = content.find('.jqms-list-items');
            var dayStart = new Date(settings.date.getFullYear(), settings.date.getMonth(), settings.date.getDate());
            var dayEnd = new Date(settings.date.getFullYear(), settings.date.getMonth(), settings.date.getDate() + 1);

            _.each(_.sortBy(dayEvents, function (event) {
                return event.start.getTime();
            }), function (event) {
                var startTime, endTime;

                if (event.start.getTime() === dayStart.getTime() && event.end.getTime() === dayEnd.getTime()) {
                    startTime = settings.labels.allday;
                    endTime = '&nbsp;';
                } else if (event.start >= dayStart && event.start < dayEnd) {
                    if (settings.use24HourClock) {
                        startTime = (event.start.getHours() < 10 ? '0' : '') + event.start.getHours() + ':' + (event.start.getMinutes() < 10 ? '0' : '') + event.start.getMinutes();
                    } else {
                        var starthours = event.start.getHours() % 12;
                        if (starthours === 0) {
                            starthours = 12;
                        }
                        startTime = (starthours < 10 ? '0' : '') + starthours + ':' + (event.start.getMinutes() < 10 ? '0' : '') + event.start.getMinutes() + (event.start.getHours() > 12 ? ' PM' : ' AM');
                    }
                } else if (event.start < dayStart && event.end >= dayEnd) {
                    startTime = settings.labels.allday;
                } else {
                    startTime = settings.labels.ends;
                }

                if (event.end > dayStart && event.end < dayEnd) {
                    if (settings.use24HourClock) {
                        endTime = (event.end.getHours() < 10 ? '0' : '') + event.end.getHours() + ':' + (event.end.getMinutes() < 10 ? '0' : '') + event.end.getMinutes();
                    } else {
                        var endhours = event.end.getHours() % 12;
                        if (endhours === 0) {
                            endhours = 12;
                        }
                        endTime = (endhours < 10 ? '0' : '') + endhours + ':' + (event.end.getMinutes() < 10 ? '0' : '') + event.end.getMinutes() + (event.end.getHours() > 12 ? ' PM' : ' AM');
                    }
                } else if (event.end < dayStart && event.end >= dayEnd) {
                    endTime = settings.labels.allday;
                } else {
                    endTime = '&nbsp;';
                }

                var listItem = $('<li><div><span>' + startTime + '</span><span>' + (event.allday ? '&nbsp;' : endTime) + '</span></div><span>' + event.title + '</span></li>');

                listItem.data('event', JSON.stringify(event));

                listItem.click(function (e) {
                    settings.onEventClick(JSON.parse($(this).data('event')), e);
                });
                listItems.append(listItem);
            });

            $this.append(content);

            // build footer.
            var footer = $('<div class="jqms-footer"><a class="jqms-today">' + settings.labels.today + '</a><a class="jqms-new-event">' + settings.labels.newevent + '</a></div>');
            footer.find('.jqms-today').click(function () {
                var now = new Date();
                settings.date.setDate(now.getDate());
                changeMonth(now.getFullYear(), now.getMonth());
                $('.jqms-active').removeClass('jqms-active');
                $('.jqms-today').addClass('jqms-active');
            });
            if (_.isFunction(settings.onEventCreate)) {
                footer.find('.jqms-new-event').click(function (e) {
                    settings.onEventCreate(settings.date, e);
                });
            } else {
                footer.find('.jqms-new-event').hide();
            }

            $this.append(footer);

            // bind scroll events.
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