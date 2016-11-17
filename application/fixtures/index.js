

export const patroller = {
  "id" : 1,
  "first_name" : "Joe",
  "last_name" : "Zuiches",
  "username" : "jzuiches"
};

export const trainings = {
  "user_id" : 1,
  "location" : "Red Dog",
  "trainer" : "Lel",
  "training_date" : "10/20/2016",
  "comments" : "one beacon in 2 minutes",
  "training_time" : 1.0,
  "training_code_id" : 1

};

export const Divisions = ['Beacons & RECCO','Lift Evac','Funitel Evac','Rope Rescue', 'First Aid','More Training','More Training','Misc.'];

export const ListOfPatrollers = [{id:1, name: 'Rich Andrews'}, {id:2, name:'Aaron Barnett'},{id:3, name:'Lel Tone'},{id:4, name:'Scott Matthews'}];


export const TrainingCodes =
    [
      {
      "name":"5000 - Transceiver",
      "code": 5000
      },
      {
        "name":"5001 - Transceiver-Single Burial",
        "code": 5001
      },
      {
        "name":"5002 - Transceiver-Multiple Burial",
        "code": 5002
      },
      {
        "name":"5100 - RECCO",
        "code": 5100
      },
      {
        "name":"5101 - RECCO-Single Burial",
        "code": 5101
      },
      {
        "name":"5102 - RECCO-Multiple Burial",
        "code": 5102
      },
      {
        "name":"5103 - Personal Noise",
        "code": 5103
      }
    ];

    export const TrainingTime =
        [
          {
          "name":"15 min",
          "code": 0.25
          },
          {
            "name":"30 min",
            "code": 0.5
          },
          {
            "name":"45 min",
            "code": 5002
          },
          {
            "name":"1 hour",
            "code": 5100
          },
          {
            "name":"1 hour 15 min",
            "code": 5101
          },
          {
            "name":"1 hour 30 min",
            "code": 5102
          },
          {
            "name":"1 hour 45 min",
            "code": 5103
          },
          {
            "name":"2 hours",
            "code": 5103
          },
          {
            "name":"2 hours 15 min",
            "code": 5103
          },
          {
            "name":"2 hours 30 min",
            "code": 5103
          },
          {
            "name":"2 hours 45 min",
            "code": 5103
          },
          {
            "name":"3 hours",
            "code": 5103
          }
        ];

        export const User =         {
          "id":2,
          "email":"jzuiches@yahoo.com",
          "name":"Bob",
          "activated":true,
          "admin":true,
          "created_at":"2016-10-26T23:32:40.547Z",
          "updated_at":"2016-10-27T03:10:22.644Z",
          "trainings":[
            {"id":6,
            "user_id":2,
            "training_division_id":2,
            "location":"Big Blue",
            "trainer":"Eric Selenfruend",
            "created_at":"2016-11-05T03:30:54.811Z",
            "updated_at":"2016-11-05T03:30:54.811Z",
            "training_date":"2016-11-04",
            "comments":"cable riding",
            "training_time":2.0,
            "training_code_id":null,
            "training_codes":[
              {"id":9,
              "code":3002,
              "training_name":"3002 - Level 2 - Basic Cable Sliding"}
              ]
            },
            {"id":5,
            "user_id":2,
            "training_division_id":4,
            "location":"Red Dog Ridge",
            "trainer":"gael",
            "created_at":"2016-11-01T03:49:12.711Z",
            "updated_at":"2016-11-02T02:19:47.405Z",
            "training_date":"2016-10-31",
            "comments":"",
            "training_time":1.0,
            "training_code_id":null,
            "training_codes":[]},
            {"id":3,
            "user_id":2,
            "training_division_id":3,
            "location":"260",
            "trainer":"Scotty",
            "created_at":"2016-10-31T04:19:01.639Z",
            "updated_at":"2016-11-01T23:36:16.478Z",
            "training_date":"2016-10-30",
            "comments":"did stuff",
            "training_time":3.0,
            "training_code_id":null,
            "training_codes":[
              {"id":15,
              "code":8001,
              "training_name":"8001 - Knots"},
              {"id":18,
              "code":8004,
              "training_name":"8004 - Raising/Lowering Systems"}
              ]
            },
            {"id":2,
            "user_id":2,
            "training_division_id":1,
            "location":"Red Dog",
            "trainer":"Lel",
            "created_at":"2016-10-27T03:12:46.401Z",
            "updated_at":"2016-10-31T01:28:56.984Z",
            "training_date":"2015-10-20",
            "comments":"two beacons",
            "training_time":1.0,
            "training_code_id":1,
            "training_codes":[
              {"id":2,
              "code":5001,
              "training_name":"5001 - Transceiver-Single Burial"},
              {"id":4,
              "code":5100,
              "training_name":"5100 - RECCO"}]
            }
          ]
        }
