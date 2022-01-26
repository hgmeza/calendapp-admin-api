import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CognitoStack } from './cognito-stack';
import { DynamoStack } from './dynamo-stack';
import { GraphQlStack } from './graphql-stack';
export class CalendappAdminApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CognitoStack(this, 'Cognito');
    new DynamoStack(this, 'Dynamo');
    new GraphQlStack(this, 'GraphQl');
  }
}
