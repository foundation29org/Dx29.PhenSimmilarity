define({ "api": [
  {
    "type": "POST",
    "url": "/v1/calculate",
    "title": "Calcule phenSimilarity",
    "name": "phenSimilarity",
    "group": "Compare_symptoms",
    "version": "1.0.0",
    "description": "<p>This method allows to compare a list of symptoms with another</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var body = {\"list_reference\":[\"HP:0001250\"],\"list_compare\":[]}\nthis.http.post('http://localhost:8080/api/v1/calculate',body)\n .subscribe( (res : any) => {\n   console.log('Result Ok');\n  }, (err) => {\n   console.log('Result Ko');\n   ...\n  }",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isDx29App",
            "description": "<p>String that indicates if the execution has been done by Dx29 WebApp Client or not. By default is false.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>A list with all symptoms and the information about the comparision with the list to compare.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n       \"Id\": \"HP:0009115\",\n       \"HasPatient\": true,\n       \"HasDisease\": false,\n       \"Relationship\": \"None\",\n       \"RelatedId\": null,\n       \"Score\": 0\n   },\n   {\n       \"Id\": \"HP:0040064\",\n       \"HasPatient\": false,\n       \"HasDisease\": true,\n       \"Relationship\": \"None\",\n       \"RelatedId\": null,\n       \"Score\": 0\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Json",
            "description": "<p>BodyFormat Body must be a json with list_reference and list_compare keys, and both keys must have array values</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: Request with not correct body: null",
          "content": "HTTP/1.1 400 Bad Request\n    Invalid Request data: SyntaxError: Unexpected token n in JSON at position 0",
          "type": "json"
        },
        {
          "title": "Error-Response: Request with not correct body format: send json instead of a list",
          "content": "HTTP/1.1 400 Bad Request\n     {\n         \"message\": [\n             \"You must provide list_reference item with a list of symptoms\",\n             \"You must provide list_compare item with a list of symptoms\"\n         ]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/phenSimilarity.js",
    "groupTitle": "Compare_symptoms"
  },
  {
    "type": "GET",
    "url": "/v1/version",
    "title": "Get version",
    "name": "About",
    "group": "Version",
    "version": "1.0.0",
    "description": "<p>This method allows to get the version of the microservice</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('http://localhost:8080/api/v1/version')\n .subscribe( (res : any) => {\n   console.log('Result Ok');\n  }, (err) => {\n   console.log('Result Ko');\n   ...\n  }",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Sring",
            "optional": false,
            "field": "String",
            "description": "<p>The value of the microservice version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     \"v0.0.01\"",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/about.js",
    "groupTitle": "Version"
  }
] });
