//http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.15/api/where/methods/routes-for-agency.html
// function getAgencyInfo(agency){
//     $.ajax({
//         type: 'GET',
//         url: "http://52.88.188.196:8080/api/api/where/agency/"+agency+".json?key=TEST",
//         contentType: 'application/json',
//         crossDomain: true,
//         dataType: 'jsonp',
//         headers: {
//             'X-Alt-Referer': 'sit.mydomain.com',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
//             'Access-Control-Allow-Credentials': 'true'
//         },
//         success: function(data) { 
//             //http://52.88.188.196:8080/api/api/where/routes-for-agency/STA.json?key=TEST
//         },
//         error: function(xhr, status, err) { 
//             console.log(err);}
//       }); 
// }

// Use this to display a list of all available Stop Id's for a specified agency.
// function stopIdsForAgency(agency) {
//     $.ajax({
//         type: 'GET',
//         url: "http://52.88.188.196:8080/api/api/where/stop-ids-for-agency/"+agency+".json?key=TEST",
//         contentType: 'application/json',
//         crossDomain: true,
//         dataType: 'jsonp',
//         headers: {
//             'X-Alt-Referer': 'sit.mydomain.com',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
//             'Access-Control-Allow-Credentials': 'true'
//         },
//         success: function(data) {
//         },
//         error: function(xhr, status, err) { 
//             console.log(err);}
//       });
// }

// function getScheduleForStop(stop) {
//     $.ajax({
//         type: 'GET',
//         url: "http://52.88.188.196:8080/api/api/where/schedule-for-stop/"+stop+".json?key=TEST",
//         contentType: 'application/json',
//         crossDomain: true,
//         dataType: 'jsonp',
//         headers: {
//             'X-Alt-Referer': 'sit.mydomain.com',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
//             'Access-Control-Allow-Credentials': 'true'
//         },
//         success: function(data) { 
//         },
//         error: function(xhr, status, err) { 
//             console.log(err);}
//     }); 
// }

function getStopInfo(stopId) {
    $.ajax({
        type: 'GET',
        url: "http://52.88.188.196:8080/api/api/where/stop/"+stopId+".json?key=TEST",
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
            'X-Alt-Referer': 'sit.mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(data) {
            document.getElementById("stop").innerHTML = data.data.entry.name;
        },
        error: function(xhr, status, err) { 
            console.log(err);}
    }); 
}

function getTripDetails(originTripId, originStopId, originRouteId) {
    $.ajax({
        type: 'GET',
        url: "http://52.88.188.196:8080/api/api/where/trip-details/"+originTripId+".json?key=TEST",
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
            'X-Alt-Referer': 'sit.mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(data) {
            var stopTimes = data.data.entry.schedule.stopTimes
            for (var i = 0; i < stopTimes.length; i++) {
                // Match our stop stop with the bus stop in this route's trip
                if (stopTimes[i].stopId === originStopId) {
                    console.log(stopTimes);
                    console.log("FOUND A MATCH at " + i);
                    $.ajax({
                        type: 'GET',
                        url: "http://52.88.188.196:8080/api/api/where/stop/"+stopTimes[i].stopId+".json?key=TEST",
                        contentType: 'application/json',
                        crossDomain: true,
                        dataType: 'jsonp',
                        headers: {
                            'X-Alt-Referer': 'sit.mydomain.com',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                            'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        success: function(data) {
                            document.getElementById("departs_CardBusStop").innerHTML = data.data.entry.name;
                        },
                        error: function(xhr, status, err) { 
                            console.log(err);}
                    });
                    var DEPARTSmillisecondsToDeparture = stopTimes[i].departureTime * 1000;
                    document.getElementById("departs_CardTime").innerHTML =  milliSec_to_ClockTime(data.data.entry.serviceDate + DEPARTSmillisecondsToDeparture);

                    // IF: route is not at end of it's trip
                    if (stopTimes[i] != stopTimes[stopTimes.length - 1]) {
                        console.log("still on same trip");
                        $.ajax({
                            type: 'GET',
                            url: "http://52.88.188.196:8080/api/api/where/stop/"+stopTimes[stopTimes.length - 1].stopId+".json?key=TEST",
                            contentType: 'application/json',
                            crossDomain: true,
                            dataType: 'jsonp',
                            headers: {
                                'X-Alt-Referer': 'sit.mydomain.com',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                                'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
                                'Access-Control-Allow-Credentials': 'true'
                            },
                            success: function(data) {
                                document.getElementById("arrives_CardBusStop").innerHTML = data.data.entry.name;
                            },
                            error: function(xhr, status, err) { 
                                console.log(err);}
                        });
                        var ARRIVESmillisecondsToDeparture = stopTimes[stopTimes.length - 1].arrivalTime * 1000;
                        document.getElementById("arrives_CardTime").innerHTML =  milliSec_to_ClockTime(data.data.entry.serviceDate + ARRIVESmillisecondsToDeparture);
                    }
                    // ELSE: route is at end of trip, check to see if routeId changes or not.
                        // TRUE: blank out or warn to number chnage inside card to prevent confusion.
                        // FALSE: display final destination of same route's trip, should be opposite or it's original origin.
                    else {
                        console.log("reached end of trip, starting new trip");
                        getTripById(data.data.entry.schedule.nextTripId, originRouteId, originStopId)
                    }
                }
            }
        },
        error: function(xhr, status, err) { 
            console.log(err);}
    }); 
}

//http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.15/api/where/methods/vehiclesForAgency.html
function getArrivalsAndDeparturesObjForStop(stopId) {
    $.ajax({
        type: 'GET',
        url: "http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/"+stopId+".json?key=TEST",
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
            'X-Alt-Referer': 'sit.mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(data) { 
            var filteredRoutes = [];
            var busRoutes = data.data.entry.arrivalsAndDepartures;

            // check to see if stop has any more routes for the day listed
            if (busRoutes == null) {
                // display OFFLINE screen
                // return;
            }

            // filter out expired routes
            busRoutes.forEach(function(route) {
                // if: arrival time for next bus hasn't happened yet...
                // basically, if the bus's arrival time is in the future from the current time.
                if (route.scheduledArrivalTime > data.currentTime) {
                    filteredRoutes.push(route);
                }
            });

            // set route numbers
            if (filteredRoutes[0] != null) {
                /* Main Info */

                // countdown timer
                $("#arrivesIN_top_text").text("arrives in");
                document.getElementById("arrivesIN_minute").innerHTML = Math.floor((filteredRoutes[0].scheduledArrivalTime - data.currentTime) / 60000);
                $("#arrivesIN_bottom_text").text("minutes");
                colorizeArrivalMinutes();

                // route name & number
                document.getElementById("main_routeName_text").innerHTML = filteredRoutes[0].tripHeadsign;
                document.getElementById("route_main_number").innerHTML = filteredRoutes[0].routeShortName;
                
                // card info
                // departure card: stop name and departure time
                getTripDetails(filteredRoutes[0].tripId, filteredRoutes[0].stopId, filteredRoutes[0].routeId);
                
                // IF: more than one route exists, set bus after that
                if (filteredRoutes.length > 1) {
                    /* Sidebar Info */

                    // countdown timer
                    $("#alsoIN_top_text").text("also in");
                    document.getElementById("alsoIN_minute").innerHTML = Math.floor((filteredRoutes[1].scheduledArrivalTime - data.currentTime) / 60000);
                    $("#alsoIN_bottom_text").text("minutes");

                    // route name & number
                    document.getElementById("side_routeName_text").innerHTML = filteredRoutes[1].tripHeadsign;
                    document.getElementById("route_side_number").innerHTML = filteredRoutes[1].routeShortName;
                    
                    // TODO: slide out $(".side-bg") into $(".main-bg")
                }
                // ELSE: blank out side bar
                else {
                    $(".alsoIN_text").text("");
                    $("#alsoIN_minute").text("");
                    document.getElementById("route_side_number").innerHTML = "";
                    document.getElementById("side_routeName_text").innerHTML = "";
                    
                    // TODO: expand $(".main-bg") to full-screen
                    // TODO: is it possible to pull 
                }
            }
            else {
                console.log("no results");
            }
            //http://52.88.188.196:8080/api/api/where/routes-for-agency/STA.json?key=TEST
        },
        error: function(xhr, status, err) {
            console.log(err);}
    }); 
}

function getTripById(tripId, originRouteId, originStopId) {
    $.ajax({
        type: 'GET',
        url: "http://52.88.188.196:8080/api/api/where/trip/"+tripId+".json?key=TEST",
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
            'X-Alt-Referer': 'sit.mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(data) { 
            if (data.data.entry.routeId != originRouteId) {
                blankOrWarnCard();
            }
            else {
                getTripDetails(tripId, originStopId);
            }
        },
        error: function(xhr, status, err) {
            console.log(err);}
    }); 
}

//http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.15/api/where/methods/vehiclesForAgency.html
function getArrivalAndDepartureForStop(stopId, tripId, serviceDate, vehicleId) {
    $.ajax({
        type: 'GET',
        url: "http://52.88.188.196:8080/api/api/where/arrival-and-departure-for-stop/"+stopId+".json?key=TEST&tripId="+tripId+"&serviceDate="+serviceDate+"&vehicleId="+vehicleId+"",
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
            'X-Alt-Referer': 'sit.mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(data) { 
        },
        error: function(xhr, status, err) {
            console.log(err);}
    }); 
}


function blankOrWarnCard() {
    document.getElementById("departs_CardBusStop").innerHTML = "NOTICE <br><br>ROUTE IS CHANGING";
    document.getElementById("departs_CardTime").innerHTML = "";
    document.getElementById("arrives_CardBusStop").innerHTML = "NOTICE <br><br>ROUTE IS CHANGING";
    document.getElementById("arrives_CardTime").innerHTML = "";
}

function colorizeArrivalMinutes() {
    if (parseInt($("#arrivesIN_minute").text()) >= 10) {
        $("#arrivesIN_minute").css("color", "green");
    }
    else if (parseInt($("#arrivesIN_minute").text()) >= 5) {
        $("#arrivesIN_minute").css("color", "orange");
    }
    else if (parseInt($("#arrivesIN_minute").text()) < 5) {
        $("#arrivesIN_minute").css("color", "red");
    }
}

function placeLogo(image) {
    $("#logo").attr("src", image);
}

function util_main() {    
    loadJSON(function(response) {
        let manifest_JSON = JSON.parse(response);
        // colorizeArrivalMinutes(); // DELETE: for debugging purposes only, dlete afterwards
        getArrivalsAndDeparturesObjForStop(manifest_JSON.settings.stopId.toString());
        getStopInfo(manifest_JSON.settings.stopId.toString());
        placeLogo(manifest_JSON.settings.logo.toString());
    });
}

// MAIN CALL TO START //
util_main();
