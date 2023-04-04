import { App, Stack, StackProps } from "aws-cdk-lib";
import { Alarm, ComparisonOperator, Dashboard, GraphWidget, Metric } from "aws-cdk-lib/aws-cloudwatch";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface LambdaDashboardsStackProps extends StackProps {
  dashboardName: string;
  requiredDashboards: boolean;
  requiredAlarms: boolean;
}

interface LambdaFunctionProps {
  functionName: string;
  displayName: string;
  memorySize: number;
  duration: number;
}

export class CdkLambdaDashboardStack extends Stack {

  protected readonly lambdaDashboard: Dashboard;

  protected readonly invocations = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Invocations",
    statistic: "sum"
  });

  protected readonly duration = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Duration",
    statistic: "min"
  });

  protected readonly errors = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Errors",
    statistic: "sum"
  });

  protected readonly throttles = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Throttles",
    statistic: "sum"
  });

  protected readonly concurrentExecutions = new Metric({
    namespace: "AWS/Lambda",
    metricName: "ConcurrentExecutions",
    statistic: "sum"
  });


  protected readonly memorySize = new Metric({
    namespace: "AWS/Lambda",
    metricName: "MemorySize",
    statistic: "avg"
  });

  private requiredAlarms : boolean;

  constructor(scope: App, id: string, props: LambdaDashboardsStackProps) {
    super(scope, id, props);

    const { dashboardName, requiredDashboards = true, requiredAlarms = true } = props;
    if (requiredDashboards) {
      this.lambdaDashboard = new Dashboard(this, dashboardName, {
        dashboardName: dashboardName
      });
    }
    this.requiredAlarms = requiredAlarms;
  }

  // adds one row to dashboard for each lambda function
  public addLambda({ functionName, displayName, memorySize }: LambdaFunctionProps) {
    const dimensions = {
      "FunctionName": functionName
    };
    if (this.lambdaDashboard) {
      this.lambdaDashboard.addWidgets(
        new GraphWidget({
          title: `${ displayName } Invocations`,
          left: [
            this.invocations.with({
              dimensionsMap: dimensions,
            }),
          ]
        }),

        new GraphWidget({
          title: `${ displayName } Duration`,
          left: [
            this.duration.with({
              dimensionsMap: dimensions,
            }),
            this.duration.with({
              dimensionsMap: dimensions,
              statistic: "avg"
            }),
            this.duration.with({
              dimensionsMap: dimensions,
              statistic: "max"
            }),
          ]
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
          ]
        }),

        new GraphWidget({
          title: `${ displayName } ConcurrentExecutions`,
          right: [
            this.concurrentExecutions.with({
              dimensionsMap: dimensions,
            }),
          ]
        }),
      );
    }

    if (this.requiredAlarms) {
      const invocationsAlarm = new Alarm(this, `${functionName}-InvocationsAlarm`, {
        metric: this.invocations.with({
          dimensionsMap: dimensions,
        }),
        threshold: 1000,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      const errorsAlarm = new Alarm(this, `${functionName}-ErrorsAlarm`, {
        metric: this.errors.with({
          dimensionsMap: dimensions,
        }),
        threshold: 1,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      const durationAlarm = new Alarm(this, `${functionName}-DurationAlarm`, {
        metric: this.duration.with({
          dimensionsMap: dimensions,
          statistic: "avg"
        }),
        threshold: 1000,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      const throttlesAlarm = new Alarm(this, `${functionName}-ThrottlesAlarm`, {
        metric:  this.throttles.with({
          dimensionsMap: dimensions,
        }),
        threshold: 10,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      const memoryUsageAlarm = new Alarm(this, `${functionName}-MemoryUsageAlarm`, {
        metric: this.memorySize.with({
          dimensionsMap: dimensions,
        }),
        threshold: memorySize * 0.9, // 90% of memory size
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      });
    }
  }
}