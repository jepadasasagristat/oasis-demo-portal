/**
 * Demo accounts used in the hands-on guide.
 *
 * These are the demo users for the hosted Data Bank prototype.
 */

export const DEMO_ACCOUNTS = {
  producer: {
    roleLabel: 'Producer account',
    usedFor: 'Data Upload (validation only)',
    email: 'prod-demo@da.gov.ph',
    password: 'demo1234',
  },
  consumer: {
    roleLabel: 'Consumer account',
    usedFor: 'Data Table Builder, visualization, and export',
    email: 'cons-demo@da.gov.ph',
    password: 'demo1234',
  },
} as const;
