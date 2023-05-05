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
