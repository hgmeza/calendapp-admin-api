import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { PatientsDs } from './graphql/patients-ds';

export class GraphQlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gqlApi = new appsync.GraphqlApi(this, 'GraphQlApi', {
      name: 'GrapQlApi',
      schema: appsync.Schema.fromAsset(
        join(__dirname, '..', 'graphql', 'schema.graphql'),
      ),
      // authorizationConfig: {
      //   defaultAuthorization: {
      //     authorizationType: appsync.AuthorizationType.USER_POOL,
      //   },
      // },
    });
    new PatientsDs(this, 'PatientsDs', { gqlApi });

    new CfnOutput(this, 'Api Url', { value: gqlApi.graphqlUrl });
  }
}
