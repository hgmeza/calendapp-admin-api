import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

type PatientDsProps = {
  gqlApi: appsync.GraphqlApi;
};

export class PatientsDs extends Construct {
  constructor(scope: Construct, id: string, props: PatientDsProps) {
    super(scope, id);

    const { gqlApi } = props;
    const patientsTable = Table.fromTableName(
      this,
      'PatientsTable',
      'patients',
    );
    const patientDs = gqlApi.addDynamoDbDataSource(
      'PatientSource',
      patientsTable,
    );

    patientDs.createResolver({
      typeName: 'Query',
      fieldName: 'getPatients',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    patientDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'createPatientRecord',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting('patient'),
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}
