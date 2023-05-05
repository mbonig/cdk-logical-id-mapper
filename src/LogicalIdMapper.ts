import { CfnElement, CfnResource, IAspect, Stack } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

interface IdMap extends Record<string, string> {
}

export class LogicalIdMapper implements IAspect {
  constructor(private idMap: IdMap) {

  }

  visit(node: IConstruct): void {
    const currentLogicalId = Stack.of(node).getLogicalId(node as CfnElement);
    // is there a map for this logicalId?
    if (!!this.idMap[currentLogicalId]) {
      // if we're on a L1 resource, try to do the override directly
      if ((node as CfnResource).overrideLogicalId) return (node as CfnResource).overrideLogicalId(this.idMap[currentLogicalId]);
    }
  }
}
