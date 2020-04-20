/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var bodyParser = require('body-parser');
var express = require('express');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = 'todo';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // Update in case is required to use that definition
const partitionKeyName = 'pk';
const partitionKeyType = 'S';
const sortKeyName = 'sk';
const sortKeyType = 'S';
const hasSortKey = sortKeyName !== '';
const path = '/todos';
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

const userIdPrefix = 'user:';
const todoIdPrefix = 'todo:';

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case 'N':
      return Number.parseInt(param);
    default:
      return param;
  }
};

const getNewId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

const mapDbToTodoModel = (items) => {
  return items.map((i) => {
    return {
      id: i.sk,
      text: i.data.text,
      done: i.data.done,
    };
  });
};

const mapTodoModelToDb = (req) => {
  let pk = userIdPresent
    ? `${userIdPrefix}${req.apiGateway.event.requestContext.identity.cognitoIdentityId}`
    : convertUrlType(
        `${userIdPrefix}${req.params[partitionKeyName]}`,
        partitionKeyType
      );
  pk = pk || UNAUTH;

  let sk = req.params[sortKeyName]
    ? convertUrlType(req.params[sortKeyName], sortKeyType)
    : req.body.id;

  return {
    pk,
    sk,
    data: {
      text: req.body.text + '',
      done: !!req.body.done,
    },
  };
};

/********************************
 * HTTP Get method for list objects *
 ********************************/
app.get(path + hashKeyPath, function (req, res) {
  var condition = {};
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ',
  };

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [
      `${userIdPrefix}${req.apiGateway.event.requestContext.identity.cognitoIdentityId}` ||
        UNAUTH,
    ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [
        convertUrlType(
          `${userIdPrefix}${req.params[partitionKeyName]}`,
          partitionKeyType
        ),
      ];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition,
  };

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err });
    } else {
      const todos = mapDbToTodoModel(data.Items);
      res.json(todos);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/
app.get(path + hashKeyPath + sortKeyPath, function (req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] =
      `${userIdPrefix}${req.apiGateway.event.requestContext.identity.cognitoIdentityId}` ||
      UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(
        `${userIdPrefix}${req.params[partitionKeyName]}`,
        partitionKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(
        req.params[sortKeyName],
        sortKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params,
  };

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Item) {
        const todos = mapDbToTodoModel([data.Items]);
        res.json(todos[0]);
      } else {
        res.json(data);
      }
    }
  });
});

/************************************
 * HTTP put method for update object *
 *************************************/
app.put(path + hashKeyPath + sortKeyPath, function (req, res) {
  const item = mapTodoModelToDb(req);

  let putItemParams = {
    TableName: tableName,
    Item: item,
  };
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'put call succeed!', url: req.url, data: data });
    }
  });
});

/************************************
 * HTTP post method for insert object *
 *************************************/
app.post(path, function (req, res) {
  const item = mapTodoModelToDb(req);
  item[sortKeyName] = `${todoIdPrefix}${getNewId()}`;

  let putItemParams = {
    TableName: tableName,
    Item: item,
  };
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'post call succeed!', url: req.url, data: data });
    }
  });
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/
app.delete(path + hashKeyPath + sortKeyPath, function (req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] =
      `${userIdPrefix}${req.apiGateway.event.requestContext.identity.cognitoIdentityId}` ||
      UNAUTH;
  } else {
    params[partitionKeyName] = `${userIdPrefix}${req.params[partitionKeyName]}`;
    try {
      params[partitionKeyName] = convertUrlType(
        `${userIdPrefix}${req.params[partitionKeyName]}`,
        partitionKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(
        req.params[sortKeyName],
        sortKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params,
  };
  dynamodb.delete(removeItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
    } else {
      res.json({ url: req.url, data: data });
    }
  });
});
app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
