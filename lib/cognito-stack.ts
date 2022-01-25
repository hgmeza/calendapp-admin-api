import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { aws_cognito as cognito } from 'aws-cdk-lib';
import { ClientAttributes } from 'aws-cdk-lib/aws-cognito';

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pool = new cognito.UserPool(this, 'AdminUserPool', {
      userPoolName: 'CalendappAdmin',
      selfSignUpEnabled: false,
      userInvitation: {
        emailSubject: 'Su Código Temporal Para Calendapp',
        emailBody:
          'Para ingresar a su cuenta, utilize este código {####} junto a su correo electrónico {username}',
      },
      signInAliases: {
        username: false,
        email: true,
      },
      autoVerify: { email: true },
      customAttributes: {
        role: new cognito.StringAttribute({
          minLen: 0,
          maxLen: 20,
          mutable: false,
        }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        tempPasswordValidity: Duration.days(3),
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    const clientWriteAttributes = new ClientAttributes().withCustomAttributes(
      'role',
    );
    const clientReadAttributes =
      clientWriteAttributes.withCustomAttributes('role');

    const client = pool.addClient('calendapp-app-client', {
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    });

    new CfnOutput(this, 'userPoolId', {
      value: pool.userPoolId,
    });
    new CfnOutput(this, 'userPoolClientId', {
      value: client.userPoolClientId,
    });
  }
}
