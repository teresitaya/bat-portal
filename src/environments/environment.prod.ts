export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'AZURE_CLIENT_ID_PARAM',
    },
  },
  apiConfig: {
    scopes: [],
    uri: 'https://graph.microsoft.com/v1.0',
  },
  b2cPolicies: {
    names: {
      signUpSignIn: '',
      resetPassword: '',
      editProfile: '',
    },
    authorities: {
      signUpSignIn: {
        authority: 'https://login.microsoftonline.com/common',
      },
      resetPassword: {
        authority: '',
      },
      editProfile: {
        authority: '',
      },
    },
    authorityDomain: '',
  },
};
