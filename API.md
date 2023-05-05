# A CDK Logical ID Mapper

Have you ever used the CDK's [.overrideLogicalId](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.CfnResource.html#overridewbrlogicalwbridnewlogicalid) method? Chances are you were using it wrong. This is bad:

```typescript
const topic = new Topic(stack, 'SomeTopic');
(topic.node.defaultChild as CfnResource).overrideLogicalId('MyTopic')
```

You shouldn't do this because the LogicalId is an aspect of the stack instance, and here you're making
it an aspect of the stack definition. So if you create this stack multiple times, you override the logicalId in all of the
stack instances.

Chances are you need to override the logicalId of a record because you just refactored a bunch of your code, either changing Ids
or nesting constructs in other constructs. Both things change your logicalIds. If you've deployed your stack before to an
environment then changing logicalIds will cause a recreation of the resources and that might cause some serious issues
as stateful resources get deleted, or you run into naming conflicts (if you're naming your resources explicitly), or worse, you introduce an outage or lose data.

This library has one class in it, `LogicalIdMapper` that implements the IAspect interface, so you use it as an aspect to a specific scope. Like all aspects, it is given every resource in your scope and if it's found in the given map, it will override the logicalId.

This has two primary advantages:
1. You don't pollute your stack code with logicalId overrides which makes things hard to read and hard to maintain.
2. You allow overrides to happen at a per-stack level instead of across all your stacks.

## Usage

```typescript

const app = new App();
const stack = new Stack(app, 'TestStack');

new Topic(stack, 'SomeTopic');

Aspects.of(stack).add(new LogicalIdMapper({
  map: {
    SomeTopicDB89918F: 'MyTopic', // rename the SomeTopicDB89918F logical ID to MyTopic
  }
}));
```

## Contributions.

If you have [Issues](https://github.com/mbonig/cdk-logical-id-mapper), [yo, I'll solve it](https://www.youtube.com/watch?v=rog8ou-ZepE).

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### LogicalIdMapperProps <a name="LogicalIdMapperProps" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps"></a>

#### Initializer <a name="Initializer" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps.Initializer"></a>

```typescript
import { LogicalIdMapperProps } from '@matthewbonig/cdk-logical-id-mapper'

const logicalIdMapperProps: LogicalIdMapperProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps.property.map">map</a></code> | <code>{[ key: string ]: string}</code> | A map of existing logicalId to new logicalIds. |

---

##### `map`<sup>Required</sup> <a name="map" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps.property.map"></a>

```typescript
public readonly map: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of existing logicalId to new logicalIds.

---

*Example*

```typescript
{
    SomeTopicDB89918F: 'MyTopic',
    SomeOtherTopicDB89918F: 'MyOtherTopic',
}
```


## Classes <a name="Classes" id="Classes"></a>

### LogicalIdMapper <a name="LogicalIdMapper" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper"></a>

- *Implements:* aws-cdk-lib.IAspect

An aspect which can be applied to a stack to override the logicalId of a resource.

*Example*

```typescript
Aspects.of(stack).add(new LogicalIdMapper({
 map: {
   SomeTopicDB89918F: 'MyTopic',
   SomeOtherTopicDB89918F: 'MyOtherTopic',
  }
});
```


#### Initializers <a name="Initializers" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.Initializer"></a>

```typescript
import { LogicalIdMapper } from '@matthewbonig/cdk-logical-id-mapper'

new LogicalIdMapper(props: LogicalIdMapperProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.Initializer.parameter.props">props</a></code> | <code><a href="#@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps">LogicalIdMapperProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.Initializer.parameter.props"></a>

- *Type:* <a href="#@matthewbonig/cdk-logical-id-mapper.LogicalIdMapperProps">LogicalIdMapperProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@matthewbonig/cdk-logical-id-mapper.LogicalIdMapper.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---





