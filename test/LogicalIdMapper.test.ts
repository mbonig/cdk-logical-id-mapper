import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LogicalIdMapper } from '../src';

test('Maps Ids', () => {

  // arrange
  const app = new App();
  const stack = new Stack(app, 'TestStack');
  new Topic(stack, 'SomeTopic');
  Aspects.of(stack).add(new LogicalIdMapper({
    SomeTopicDB89918F: 'MyTopic',
  }));

  // act
  const template = Template.fromStack(stack);

  // assert
  const topics = template.findResources('AWS::SNS::Topic');
  expect(Object.keys(topics)[0]).toEqual('MyTopic');
});
