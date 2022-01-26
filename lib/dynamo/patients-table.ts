import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class PatientsTable extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Table(this, 'PatientsTable', {
      tableName: 'patients',
      partitionKey: { name: 'provider', type: AttributeType.STRING },
      sortKey: { name: 'createdAt', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // should be retained for production envs
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}
