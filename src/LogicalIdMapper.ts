import { CfnElement, CfnResource, IAspect, Stack } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

export interface LogicalIdMapperProps {
  /**
   * A map of existing logicalId to new logicalIds.
   *
   * @example
   * {
   *     SomeTopicDB89918F: 'MyTopic',
   *     SomeOtherTopicDB89918F: 'MyOtherTopic',
   * }
   */
  readonly map: Record<string, string>;
}

/**
 * An aspect which can be applied to a stack to override the logicalId of a resource.
 *
 * @example
 * Aspects.of(stack).add(new LogicalIdMapper({
 *  map: {
 *    SomeTopicDB89918F: 'MyTopic',
 *    SomeOtherTopicDB89918F: 'MyOtherTopic',
 *   }
 * });
 */
export class LogicalIdMapper implements IAspect {
  constructor(private props: LogicalIdMapperProps) {

  }

  visit(node: IConstruct): void {
    const currentLogicalId = Stack.of(node).getLogicalId(node as CfnElement);
    // is there a map for this logicalId?
    if (!!this.props.map[currentLogicalId]) {
      // if we're on a L1 resource, try to do the override directly
      if ((node as CfnResource).overrideLogicalId) return (node as CfnResource).overrideLogicalId(this.props.map[currentLogicalId]);
    }
  }
}
