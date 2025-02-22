function dailyGraph(station, name){
  // Function to draw the chart with daily averages for a specific station. Uses a Google chart.
    var selectedStation = station;
    var stationName = name;

    $.getJSON("/dailyData/" + selectedStation, null, function(daily){

    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Day', 'Average Number of Available Bikes',],
          ['Mon',  daily[0]["AVG(available_bikes)"],    ],
          ['Tue',  daily[1]["AVG(available_bikes)"],    ],
          ['Wed',  daily[2]["AVG(available_bikes)"],    ],
          ['Thu',  daily[3]["AVG(available_bikes)"],    ],
          ['Fri',  daily[4]["AVG(available_bikes)"],    ],
          ['Sat',  daily[5]["AVG(available_bikes)"],   ],
          ['Sun',  daily[6]["AVG(available_bikes)"],   ],

        ]);

        var options = {
          title: "Daily Data for " + stationName, 
          vAxis: {
              minValue: 0,
              title: "Average Number of Available Bikes",
              textStyle:{color: 'white'},
              titleTextStyle: {color: 'white'},
            },
          hAxis: {
              title: "Day",
              titleTextStyle: {color: 'white'},
              textStyle:{color: 'white'}
            },
          
          legend: 'none',
          backgroundColor: "rgb(34, 40, 49)",
          colors: ['red'],
          titleTextStyle: {color: 'white'},
          lineWidth: 3,
          animation: {
            duration: 800,
            startup: true 
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
    })

}

function hourlyGraph(station, name){
  // Function to draw the chart with hourly averages for a specific station on the current day. Uses a Google chart.
  var selectedStation = station;
  var stationName = name;
  var d = new Date();
  var day = d.getDay();

  $.getJSON("/hourlyData/" + selectedStation + "/" + day, null, function(hourly){

  google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Time', 'Average Number of Available Bikes',],
        ['5am',  hourly[5]["AVG(available_bikes)"],    ],
        ['6am',  hourly[6]["AVG(available_bikes)"],    ],
        ['7am',  hourly[7]["AVG(available_bikes)"],    ],
        ['8am',  hourly[8]["AVG(available_bikes)"],    ],
        ['9am',  hourly[9]["AVG(available_bikes)"],    ],
        ['10am',  hourly[10]["AVG(available_bikes)"],   ],
        ['11am',  hourly[11]["AVG(available_bikes)"],   ],
        ['12pm',  hourly[12]["AVG(available_bikes)"],   ],
        ['1pm',  hourly[13]["AVG(available_bikes)"],   ],
        ['2pm',  hourly[14]["AVG(available_bikes)"],   ],
        ['3pm',  hourly[15]["AVG(available_bikes)"],   ],
        ['4pm',  hourly[16]["AVG(available_bikes)"],   ],
        ['5pm',  hourly[17]["AVG(available_bikes)"],   ],
        ['6pm',  hourly[18]["AVG(available_bikes)"],   ],
        ['7pm',  hourly[19]["AVG(available_bikes)"],   ],
        ['8pm',  hourly[20]["AVG(available_bikes)"],   ],
        ['9pm',  hourly[21]["AVG(available_bikes)"],   ],
        ['10pm',  hourly[22]["AVG(available_bikes)"],   ],
        ['11pm',  hourly[23]["AVG(available_bikes)"],   ],
        ['12am',  hourly[0]["AVG(available_bikes)"],   ],

      ]);

      var options = {
        title: "Hourly Data for " + stationName,
        vAxis: {
            minValue: 0,
            title: "Average Number of Available Bikes",
            textStyle:{color: 'white'},
            titleTextStyle: {color: 'white'},
          },
        hAxis: {
            title: "Time",
            titleTextStyle: {color: 'white'},
            textStyle:{color: 'white'}
          },
        
        legend: 'none',
        backgroundColor: "rgb(34, 40, 49)",
        colors: ['red'],
        titleTextStyle: {color: 'white'},
        lineWidth: 3,
        animation: {
          duration: 800,
          startup: true 
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('hourly_div'));

      chart.draw(data, options);
    } 
  }) 

} 


function dropDownRoute(){ 
  // Function to get walking route from current location (UCD) to station selected in dropdown menu. 
  $.getJSON("/StaticData/" + value , null, function(dor){
      selectedLat = dor[0].latitude;
      selectedLong = dor[0].longitude
  
      var request = {
        origin: {
          lat: currentLocation[0].lat,
          lng: currentLocation[0].long
        },

        destination: {
          lat: selectedLat,
          lng: selectedLong
        },
        travelMode: 'WALKING'
      };
      directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
  })
}
