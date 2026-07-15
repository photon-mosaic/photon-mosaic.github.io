// Fills in the "next meeting" line on the landing page.
// The community meeting recurs every two weeks on Wednesdays at 16:00
// UK time (Europe/London), anchored to Wed 3 June 2026.

(function () {
    "use strict";

    var ANCHOR_NAIVE_UTC = Date.UTC(2026, 5, 3, 16, 0);
    var PERIOD_MS = 14 * 24 * 60 * 60 * 1000;
    var MEETING_DURATION_MS = 60 * 60 * 1000;

    // UTC offset of Europe/London at the given instant (handles BST/GMT).
    function londonOffsetMs(date) {
        var tzPart = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            timeZoneName: "longOffset",
        })
            .formatToParts(date)
            .find(function (part) {
                return part.type === "timeZoneName";
            });
        var match = tzPart && tzPart.value.match(/GMT([+-])(\d{2}):(\d{2})/);
        if (!match) {
            return 0; // plain "GMT"
        }
        var sign = match[1] === "-" ? -1 : 1;
        return sign * (Number(match[2]) * 60 + Number(match[3])) * 60 * 1000;
    }

    // UTC timestamp of the k-th meeting (16:00 wall-clock in London).
    function meetingStart(k) {
        var naive = ANCHOR_NAIVE_UTC + k * PERIOD_MS;
        return naive - londonOffsetMs(new Date(naive));
    }

    // First meeting that has not yet finished.
    function nextMeetingStart(now) {
        var k = Math.max(0, Math.floor((now - ANCHOR_NAIVE_UTC) / PERIOD_MS));
        while (meetingStart(k) + MEETING_DURATION_MS <= now) {
            k += 1;
        }
        return meetingStart(k);
    }

    function formatCountdown(ms) {
        var totalSeconds = Math.floor(ms / 1000);
        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;
        var parts = [];
        if (days > 0) {
            parts.push(days + (days === 1 ? " day" : " days"));
        }
        if (days > 0 || hours > 0) {
            parts.push(hours + (hours === 1 ? " hour" : " hours"));
        }
        parts.push(minutes + (minutes === 1 ? " minute" : " minutes"));
        if (days === 0 && hours === 0) {
            parts.push(seconds + (seconds === 1 ? " second" : " seconds"));
        }
        return parts.join(", ");
    }

    function update() {
        var el = document.getElementById("meeting-next");
        if (!el) {
            return;
        }
        var now = Date.now();
        var start = nextMeetingStart(now);
        if (now >= start) {
            el.textContent = "A meeting is happening right now — join us!";
            return;
        }
        var when = new Intl.DateTimeFormat(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
        }).format(new Date(start));
        el.textContent =
            "Next meeting: " + when + " (in " + formatCountdown(start - now) + ").";
    }

    document.addEventListener("DOMContentLoaded", function () {
        update();
        setInterval(update, 1000);
    });
})();
