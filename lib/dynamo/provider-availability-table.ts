import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ProviderAvailabilityTable extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Table(this, 'ProviderAvailabilityTable', {
      tableName: 'provider-availability',
      partitionKey: { name: 'provider', type: AttributeType.STRING },
      sortKey: { name: 'specialty', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // should be retained for production envs
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}
