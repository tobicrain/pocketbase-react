import * as React from 'react';
import { createContext, useEffect } from 'react';
import { useClientContext } from '../hooks/useClientContext';

export type AuthProviderInfo = {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
};

export type SignInWithEmailType = (email: string, password: string) => Promise<void>;
export type SignInWithProviderType = (provider: string) => Promise<void>;
export type SignOutType = () => void;
export type SendPasswordResetEmailType = (email: string) => Promise<void>;
export type SendEmailVerificationType = (email: string) => Promise<void>;
export type UpdateEmailType = (email: string) => Promise<void>;
export type DeleteUserType = (id: string) => Promise<void>;

export interface AuthActions {
  signInWithEmail: SignInWithEmailType;
  signInWithProvider: SignInWithProviderType;
  submitProviderResult: (url: string) => Promise<void>;
  signOut: SignOutType;
  sendPasswordResetEmail: SendPasswordResetEmailType;
  sendEmailVerification: SendEmailVerificationType;
  updateEmail: UpdateEmailType;
  deleteUser: DeleteUserType;
}

export const AuthContext = createContext<AuthActions | null>(null);

export type AuthProviderProps = {
  children: React.ReactNode;
  redirectUrl: string;
  openURL: (url: string) => Promise<void>;
};


export const AuthProvider = (props: AuthProviderProps) => {
  const client = useClientContext();
  const [authProviders, setAuthProviders] = React.useState<AuthProviderInfo[]>();
  
  const actions: AuthActions = {
    signInWithEmail: async (email: string, password: string) => {
      await client?.users.authViaEmail(email, password);
    },
    signInWithProvider: async (provider: string) => {
      const authProvider = authProviders?.find((p) => p.name === provider);
      const url = authProvider?.authUrl + props.redirectUrl;
      await props.openURL(url);
    },
    submitProviderResult: async (url: string) => {
      const params = new URLSearchParams(url.split('?')[1]);
      const code = params.get('code');
      const state = params.get('state');
      const authProvider = authProviders?.find((p) => p.state === state);
      if (authProvider && code) {
        await client?.users.authViaOAuth2(authProvider.name, code, authProvider.codeVerifier, props.redirectUrl);
      }
    },
    signOut: () => {
      client?.authStore.clear();
    },
    sendPasswordResetEmail: async (email: string) => {
      await client?.users.requestPasswordReset(email);
    },
    sendEmailVerification: async (email: string) => {
      await client?.users.requestVerification(email);
    },
    updateEmail: async (email: string) => {
      await client?.users.requestEmailChange(email);
    },
    deleteUser: async (id: string) => {
      await client?.users.delete(id)
    }
  };

  React.useEffect(() => {
    (async () => {
      const methods = await client?.users.listAuthMethods();
      setAuthProviders(methods?.authProviders);
    })();
  }, []);

  return (
    <AuthContext.Provider value={actions}>{props.children}</AuthContext.Provider>
  );
};
