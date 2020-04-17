import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import awsconfig from '../aws-exports';
import { MyLayout } from '../components/MyLayout';
import { TodoApp } from '../components/TodoApp';

Amplify.configure(awsconfig);

const contentStyle = {
  paddingLeft: '0',
  paddingRight: '0',
  textAlign: 'center',
};

export default () => {
  return (
    <MyLayout contentStyle={contentStyle}>
      <AmplifyAuthenticator>
        <AmplifySignUp
          headerText="ユーザー登録"
          slot="sign-up"
          formFields={[
            { type: 'username', required: true },
            { type: 'password', required: true },
            { type: 'email', required: true },
            {
              type: 'phone_number',
              required: false,
              disabled: true,
            },
          ]}
          submitButtonText="登録する"
        />
        <TodoApp />
      </AmplifyAuthenticator>
    </MyLayout>
  );
};
