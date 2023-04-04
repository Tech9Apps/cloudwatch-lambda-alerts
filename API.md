# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LambdaStack <a name="LambdaStack" id="cloudwatch-lambda-alerts.LambdaStack"></a>

#### Initializers <a name="Initializers" id="cloudwatch-lambda-alerts.LambdaStack.Initializer"></a>

```typescript
import { LambdaStack } from 'cloudwatch-lambda-alerts'

new LambdaStack(scope: Construct, id: string, props: ILambdaStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.props">props</a></code> | <code><a href="#cloudwatch-lambda-alerts.ILambdaStackProps">ILambdaStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cloudwatch-lambda-alerts.LambdaStack.Initializer.parameter.props"></a>

- *Type:* <a href="#cloudwatch-lambda-alerts.ILambdaStackProps">ILambdaStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.addLambda">addLambda</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cloudwatch-lambda-alerts.LambdaStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addLambda` <a name="addLambda" id="cloudwatch-lambda-alerts.LambdaStack.addLambda"></a>

```typescript
public addLambda(__0: AddLambdaProps): void
```

###### `__0`<sup>Required</sup> <a name="__0" id="cloudwatch-lambda-alerts.LambdaStack.addLambda.parameter.__0"></a>

- *Type:* <a href="#cloudwatch-lambda-alerts.AddLambdaProps">AddLambdaProps</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cloudwatch-lambda-alerts.LambdaStack.isConstruct"></a>

```typescript
import { LambdaStack } from 'cloudwatch-lambda-alerts'

LambdaStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cloudwatch-lambda-alerts.LambdaStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.LambdaStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cloudwatch-lambda-alerts.LambdaStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### AddLambdaProps <a name="AddLambdaProps" id="cloudwatch-lambda-alerts.AddLambdaProps"></a>

#### Initializer <a name="Initializer" id="cloudwatch-lambda-alerts.AddLambdaProps.Initializer"></a>

```typescript
import { AddLambdaProps } from 'cloudwatch-lambda-alerts'

const addLambdaProps: AddLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.AddLambdaProps.property.displayName">displayName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.AddLambdaProps.property.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.AddLambdaProps.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.AddLambdaProps.property.invocations">invocations</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.AddLambdaProps.property.memorySize">memorySize</a></code> | <code>number</code> | *No description.* |

---

##### `displayName`<sup>Required</sup> <a name="displayName" id="cloudwatch-lambda-alerts.AddLambdaProps.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* string

---

##### `duration`<sup>Required</sup> <a name="duration" id="cloudwatch-lambda-alerts.AddLambdaProps.property.duration"></a>

```typescript
public readonly duration: number;
```

- *Type:* number

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="cloudwatch-lambda-alerts.AddLambdaProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---

##### `invocations`<sup>Required</sup> <a name="invocations" id="cloudwatch-lambda-alerts.AddLambdaProps.property.invocations"></a>

```typescript
public readonly invocations: number;
```

- *Type:* number

---

##### `memorySize`<sup>Required</sup> <a name="memorySize" id="cloudwatch-lambda-alerts.AddLambdaProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ILambdaStackProps <a name="ILambdaStackProps" id="cloudwatch-lambda-alerts.ILambdaStackProps"></a>

- *Implemented By:* <a href="#cloudwatch-lambda-alerts.ILambdaStackProps">ILambdaStackProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudwatch-lambda-alerts.ILambdaStackProps.property.dashboardName">dashboardName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.ILambdaStackProps.property.requiredAlarms">requiredAlarms</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.ILambdaStackProps.property.requiredDashboards">requiredDashboards</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cloudwatch-lambda-alerts.ILambdaStackProps.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |

---

##### `dashboardName`<sup>Required</sup> <a name="dashboardName" id="cloudwatch-lambda-alerts.ILambdaStackProps.property.dashboardName"></a>

```typescript
public readonly dashboardName: string;
```

- *Type:* string

---

##### `requiredAlarms`<sup>Required</sup> <a name="requiredAlarms" id="cloudwatch-lambda-alerts.ILambdaStackProps.property.requiredAlarms"></a>

```typescript
public readonly requiredAlarms: boolean;
```

- *Type:* boolean

---

##### `requiredDashboards`<sup>Required</sup> <a name="requiredDashboards" id="cloudwatch-lambda-alerts.ILambdaStackProps.property.requiredDashboards"></a>

```typescript
public readonly requiredDashboards: boolean;
```

- *Type:* boolean

---

##### `topic`<sup>Required</sup> <a name="topic" id="cloudwatch-lambda-alerts.ILambdaStackProps.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---

