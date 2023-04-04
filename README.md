# AWS Lambda Alerts and Dashboard

The cloudwatch-lambda-alerts library provides an easy way to create alerts for AWS Lambda functions using Amazon CloudWatch. With this library, you can monitor key metrics such as invocations, errors, duration, throttles, and memory usage, and trigger alarms based on certain thresholds.
This library also generate CloudWatch dashboard for the lambda functions.

This library will create alerts for AWS Lambda which includes:

- Invocations (if the invocations reached 90% of allocation)
- Errors (when there is any error in the lambda)
- Duration (when lambda reached 90% of the duration)
- Throttles (when lambda is being throttled for 10)
- Memory (when lambda reached 90% of memory allocated)

## Installation

To install the cloudwatch-lambda-alerts library, you can use your preferred package manager, such as npm or Yarn:

```bash
npm install cloudwatch-lambda-alerts
```
or

```bash
yarn add cloudwatch-lambda-alerts
```

## Usage
To use the cloudwatch-lambda-alerts library, you first need to create a new instance of the CloudWatchLambdaAlerts class:

```typescript
import { CloudWatchLambdaAlerts } from 'cloudwatch-lambda-alerts';

const alertsStack = new CloudWatchLambdaAlerts(this, "LambdaStack", {
  dashboardName: `${ENV} Lambda 1`,
  requiredDashboards: true,
  requiredAlarms: true,
  topic,
});

alertsStack.addLambda({
  functionName: 'Function Name 1',
  displayName: 'Function Name 1',
  memorySize: memorySize, // memory size in MB
  invocations: 1000, // invocations in 1 minute
  duration: 10, // duration in seconds
});

```

## Contributing
Contributions to the cloudwatch-lambda-alerts library are welcome! If you find a bug or would like to suggest a new feature, please open an issue on the GitHub repository.

### License
The cloudwatch-lambda-alerts library is licensed under the MIT License. See the LICENSE file for more information.