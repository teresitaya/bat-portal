export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'dc0b40f9-4895-4f7b-942a-4c47ee36ff6e',
    },
  },
  apiConfig: {
    scopes: [
      'User.Read',
     /* 'Application.Read.All'
       'Directory.Read.All', 
      'DeviceManagementManagedDevices.Read.All',
      'GroupMember.Read.All',
      'DeviceManagementApps.Read.All',
      'AuditLog.Read.All',
      'RoleManagement.Read.Directory',
      'IdentityRiskEvent.Read.All',
      'SecurityEvents.Read.All',
      'DeviceManagementConfiguration.Read.All',
      'Policy.Read.All',
      'Domain.Read.All',
      'Sites.Read.All', */
       'ActivityFeed.Read',
      'ActivityFeed.ReadDlp',
      'ServiceHealth.Read'
    ],
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
