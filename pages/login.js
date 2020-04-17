import React from 'react';
import Link from 'next/link';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import awsconfig from '../aws-exports';
import { MyLayout } from '../components/MyLayout';

Amplify.configure(awsconfig);

const contentStyle = {
  paddingLeft: '0',
  paddingRight: '0',
  textAlign: 'center',
};

export default () => (
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
      <div className="success">
        <h2>ログインしました！</h2>
        <Link href="/">
          <a>Todo Listへ</a>
        </Link>
      </div>
    </AmplifyAuthenticator>

    <style jsx>{`
      .success {
        display: grid;
        grid-row-gap: 3em;
        max-width: 50vw;
        margin: 2em auto;
        text-align: center;
      }
    `}</style>
  </MyLayout>
);
