/**
 * Tasteful, on-theme sample data for the live component previews. Kept small
 * and neutral — no real people, no bright brand colors — so previews read calm
 * and consistent with the rest of the docs.
 */

interface Invoice {
  id: string;
  customer: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  amount: string;
}

const invoices: Invoice[] = [
  { id: 'INV-1024', customer: 'Acme Co.', status: 'Paid', amount: '$1,200.00' },
  { id: 'INV-1023', customer: 'Globex', status: 'Pending', amount: '$640.00' },
  { id: 'INV-1022', customer: 'Soylent', status: 'Overdue', amount: '$320.00' },
  { id: 'INV-1021', customer: 'Initech', status: 'Paid', amount: '$980.00' },
];

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

const team: TeamMember[] = [
  { name: 'Mira Okafor', role: 'Design', initials: 'MO' },
  { name: 'Devon Reyes', role: 'Engineering', initials: 'DR' },
  { name: 'Sana Patel', role: 'Product', initials: 'SP' },
  { name: 'Lou Tremblay', role: 'Support', initials: 'LT' },
];

const breadcrumbTrail = ['Docs', 'Components', 'Breadcrumb'];

const timezones = [
  { value: 'utc', label: 'UTC' },
  { value: 'pst', label: 'Pacific (PST)' },
  { value: 'cet', label: 'Central Europe (CET)' },
  { value: 'jst', label: 'Japan (JST)' },
];

const changelog = [
  { version: 'v0.3.0', note: 'Added drawer, sheet, and dropdown menu.' },
  { version: 'v0.2.1', note: 'Calmer focus rings across form controls.' },
  { version: 'v0.2.0', note: 'Introduced the registry and copy-paste flow.' },
  { version: 'v0.1.0', note: 'First public set of 24 components.' },
];

export { invoices, team, breadcrumbTrail, timezones, changelog };
export type { Invoice, TeamMember };
