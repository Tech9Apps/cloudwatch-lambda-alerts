import { Alarm, ComparisonOperator, Dashboard, GraphWidget, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export interface ILambdaStackProps {
  readonly dashboardName: string;
  readonly requiredDashboards: boolean;
  readonly requiredAlarms: boolean;
  readonly topic: Topic;
}

export interface AddLambdaProps {
  readonly functionName: string;
  readonly displayName: string;
  readonly memorySize: number;
  readonly duration: number;
  readonly invocations: number;
}

export class LambdaStack extends Construct {

  // @ts-ignore
  protected readonly lambdaDashboard: Dashboard;

  protected readonly invocations = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'Invocations',
    statistic: 'sum',
  });

  protected readonly duration = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'Duration',
    statistic: 'min',
  });

  protected readonly errors = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'Errors',
    statistic: 'sum',
  });

  protected readonly throttles = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'Throttles',
    statistic: 'sum',
  });

  protected readonly concurrentExecutions = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'ConcurrentExecutions',
    statistic: 'sum',
  });


  protected readonly memorySize = new Metric({
    namespace: 'AWS/Lambda',
    metricName: 'MemorySize',
    statistic: 'avg',
  });

  protected readonly requiredAlarms: boolean;
  protected readonly topic: Topic;

  constructor(scope: Construct, id: string, props: ILambdaStackProps) {
    super(scope, id);

    const {
      dashboardName,
      requiredDashboards = true,
      requiredAlarms = true,
      topic,
    } = props;
    if (requiredDashboards) {
      this.lambdaDashboard = new Dashboard(this, dashboardName, {
        dashboardName: dashboardName,
      });
    }
    this.requiredAlarms = requiredAlarms;
    this.topic = topic;
  }

  // adds one row to dashboard for each lambda function
  public addLambda({ functionName, displayName, memorySize, duration, invocations } : AddLambdaProps) {
    const dimensions = {
      FunctionName: functionName,
    };

    if (this.lambdaDashboard) {
      this.lambdaDashboard.addWidgets(
        new GraphWidget({
          title: `${ displayName } Invocations`,
          left: [
            this.invocations.with({
              dimensionsMap: dimensions,
            }),
          ],
        }),

        new GraphWidget({
          title: `${ displayName } Duration`,
          left: [
            this.duration.with({
              dimensionsMap: dimensions,
            }),
            this.duration.with({
              dimensionsMap: dimensions,
              statistic: 'avg',
            }),
            this.duration.with({
              dimensionsMap: dimensions,
              statistic: 'max',
            }),
          ],
        }),

        new GraphWidget({
          title: `${ displayName } Errors`,
          left: [
            this.errors.with({
              dimensionsMap: dimensions,
            }),
            this.throttles.with({
              dimensionsMap: dimensions,
            }),
          ],
        }),

        new GraphWidget({
          title: `${ displayName } ConcurrentExecutions`,
          right: [
            this.concurrentExecutions.with({
              dimensionsMap: dimensions,
            }),
          ],
        }),
      );
    }

    if (this.requiredAlarms) {
      const invocationsAlarm = new Alarm(this, `${ functionName }-InvocationsAlarm`, {
        alarmName: `${ displayName } Invocations Alarm`,
        metric: this.invocations.with({
          dimensionsMap: dimensions,
        }),
        threshold: invocations * 0.9, // 90% of invocations
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });
      invocationsAlarm.addAlarmAction(new SnsAction(this.topic));
      invocationsAlarm.addOkAction(new SnsAction(this.topic));

      const errorsAlarm = new Alarm(this, `${ functionName }-ErrorsAlarm`, {
        alarmName: `${ displayName } Errors Alarm`,
        metric: this.errors.with({
          dimensionsMap: dimensions,
        }),
        threshold: 1,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });
      errorsAlarm.addAlarmAction(new SnsAction(this.topic));
      errorsAlarm.addOkAction(new SnsAction(this.topic));

      const durationAlarm = new Alarm(this, `${ functionName }-DurationAlarm`, {
        alarmName: `${ displayName } Duration Alarm`,
        metric: this.duration.with({
          dimensionsMap: dimensions,
          statistic: 'avg',
        }),
        threshold: duration * 0.9 * 1000, // 90% of duration in milliseconds
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });
      durationAlarm.addAlarmAction(new SnsAction(this.topic));
      durationAlarm.addOkAction(new SnsAction(this.topic));

      const throttlesAlarm = new Alarm(this, `${ functionName }-ThrottlesAlarm`, {
        alarmName: `${ displayName } Throttles Alarm`,
        metric: this.throttles.with({
          dimensionsMap: dimensions,
        }),
        threshold: 10,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });
      throttlesAlarm.addAlarmAction(new SnsAction(this.topic));
      throttlesAlarm.addOkAction(new SnsAction(this.topic));

      const memoryUsageAlarm = new Alarm(this, `${ functionName }-MemoryUsageAlarm`, {
        alarmName: `${ displayName } Memory Usage Alarm`,
        metric: this.memorySize.with({
          dimensionsMap: dimensions,
        }),
        threshold: memorySize * 0.9, // 90% of memory size
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      memoryUsageAlarm.addAlarmAction(new SnsAction(this.topic));
      memoryUsageAlarm.addOkAction(new SnsAction(this.topic));
    }
  }
}

