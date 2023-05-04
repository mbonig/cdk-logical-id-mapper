# A CDK Logical ID Mapper

Have you ever used the CDK's [.overrideLogicalId](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.CfnResource.html#overridewbrlogicalwbridnewlogicalid) method? Well, chances are you were probably using it wrong.

This library has one class in it, `LogicalIdMapper`. It's a simple class that takes a CDK stack and a map of logical IDs to new logical IDs. It then iterates through the stack and replaces the logical IDs with the new ones.


