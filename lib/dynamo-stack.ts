import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PatientsTable } from './dynamo/patients-table';
import { ProviderAvailabilityTable } from './dynamo/provider-availability-table';

export class DynamoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new PatientsTable(this, 'PatientsTable');
    new ProviderAvailabilityTable(this, 'ProviderAvailabilityTable');
  }
}
