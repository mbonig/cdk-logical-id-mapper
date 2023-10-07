import { App, Aspects, Stack, Stage } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LogicalIdMapper } from '../src';

test('Maps Ids', () => {
  // arrange
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new Topic(stack, 'SomeTopic');

  Aspects.of(stack).add(
    new LogicalIdMapper({
      map: {
        SomeTopicDB89918F: 'MyTopic',
      },
    }),
  );

  // act
  const template = Template.fromStack(stack);

  // assert
  const topics = template.findResources('AWS::SNS::Topic');
  expect(Object.keys(topics)[0]).toEqual('MyTopic');
});

test('Maps Ids in Stage', () => {
  // arrange
  const app = new App();
  const pipelineStack = new Stack(app, 'PipelineStack');
  const stage = new Stage(pipelineStack, 'Stage');
  const stageStack = new Stack(stage, 'StageStack');
  new Topic(stageStack, 'SomeTopic');

  Aspects.of(stage).add(
    new LogicalIdMapper({
      map: {
        SomeTopicDB89918F: 'MyTopic',
      },
    }),
  );

  // act
  const template = Template.fromStack(stageStack);

  // assert
  const topics = template.findResources('AWS::SNS::Topic');
  expect(Object.keys(topics)[0]).toEqual('MyTopic');
});
