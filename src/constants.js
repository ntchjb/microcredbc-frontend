export const roles = {
  issuer: 'issuer',
  earner: 'earner',
  consumer: 'consumer',
};

export const defaultProfile = {
  name: '',
  description: '',
  image: '',
  url: '',
  telephone: '',
  email: '',
};

export const defaultTemplate = {
  alignment: [],
  archived: false,
  criteria: { narrative: '' },
  description: '',
  id: '',
  image: '',
  issuer: defaultProfile,
  name: '',
  tags: [],
};

export const defaultAssertion = {
  recipient: {
    name: '',
    url: '',
    telephone: '',
    description: '',
    image: '',
    email: '',
  },
  badge: defaultTemplate,
  issuedOn: '',
  narrative: '',
  expires: '',
  revoked: false,
  revocationReason: '',
  evidence: [
    {
      id: '',
      narrative: '',
      name: '',
      description: '',
      genre: '',
      audience: '',
    },
  ],
};

export const defaultAssertionInfo = {
  recipient: {},
  badge: '',
  evidence: [],
  narrative: '',
  expires: '',
};

export const defaultBadgeInfo = {
  name: '',
  description: '',
  image: null,
  criteria: {
    narrative: '',
  },
  alignment: [],
  tags: [],
};
