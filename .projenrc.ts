import { awscdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Matthew Bonig',
  authorAddress: 'matthew.bonig@gmail.com',
  cdkVersion: '2.4.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: '@matthewbonig/cdk-logical-id-mapper',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:mbonig/cdk-logical-id-mapper.git',
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
