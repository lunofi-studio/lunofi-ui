/**
 * Hand-authored registry metadata for lunofi-ui.
 *
 * Maps each component file name (without extension) to its public-facing
 * `title`, `description`, and `categories`. The build script merges this with
 * auto-detected `dependencies` / `registryDependencies` from the source
 * imports. Components missing from this map fall back to a Title-Case title
 * derived from the file name and an empty description (the build logs a
 * warning so the gap can be filled in here later).
 *
 * `extraRegistryDependencies` lets you add registry deps the import scanner
 * cannot infer (e.g. a component that renders another only through composition
 * documented in examples). It is merged with the auto-detected set.
 */

/** @type {{ name: string; homepage: string; }} */
export const registry = {
  name: 'lunofi-ui',
  homepage: 'https://lunofi-ui.com',
};

/**
 * @typedef {object} ItemMeta
 * @property {string} [title]
 * @property {string} [description]
 * @property {string[]} [categories]
 * @property {string[]} [extraRegistryDependencies]
 */

/** @type {Record<string, ItemMeta>} */
export const items = {
  accordion: {
    title: 'Accordion',
    description:
      'Vertically stacked, collapsible sections for disclosing content one panel at a time.',
    categories: ['disclosure'],
  },
  'alert-dialog': {
    title: 'Alert Dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    categories: ['overlay', 'feedback'],
  },
  announcement: {
    title: 'Announcement',
    description: 'A compact pill for surfacing product updates, changelog entries, or promotions.',
    categories: ['feedback'],
  },
  badge: {
    title: 'Badge',
    description: 'A small label for statuses, counts, and categorization.',
    categories: ['data-display'],
  },
  banner: {
    title: 'Banner',
    description: 'A prominent, full-width message for alerts, notices, and contextual feedback.',
    categories: ['feedback'],
  },
  breadcrumb: {
    title: 'Breadcrumb',
    description: 'A navigation trail showing the current page within a site hierarchy.',
    categories: ['navigation'],
  },
  button: {
    title: 'Button',
    description: 'A clickable element for triggering actions, with variants and sizes.',
    categories: ['actions'],
  },
  card: {
    title: 'Card',
    description: 'A flexible surface for grouping related content and actions.',
    categories: ['layout', 'data-display'],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'A control for toggling a single binary option on or off.',
    categories: ['forms'],
  },
  collapsible: {
    title: 'Collapsible',
    description: 'A primitive for showing and hiding a single section of content.',
    categories: ['disclosure'],
  },
  dialog: {
    title: 'Dialog',
    description: 'A modal overlay for focused tasks, forms, and confirmations.',
    categories: ['overlay'],
  },
  drawer: {
    title: 'Drawer',
    description: 'A panel that slides in from an edge of the screen for secondary content.',
    categories: ['overlay'],
  },
  'dropdown-menu': {
    title: 'Dropdown Menu',
    description: 'A menu of actions or options revealed from a trigger.',
    categories: ['overlay', 'navigation'],
  },
  field: {
    title: 'Field',
    description: 'Form field scaffolding with label, description, and validation messaging.',
    categories: ['forms'],
  },
  form: {
    title: 'Form',
    description: 'A form wrapper with fieldset grouping and accessible validation handling.',
    categories: ['forms'],
  },
  input: {
    title: 'Input',
    description: 'A single-line text input field.',
    categories: ['forms'],
  },
  label: {
    title: 'Label',
    description: 'An accessible label associated with a form control.',
    categories: ['forms'],
  },
  pill: {
    title: 'Pill',
    description: 'A rounded tag with optional dismiss action for filters and selections.',
    categories: ['data-display'],
  },
  popover: {
    title: 'Popover',
    description: 'A floating container anchored to a trigger for rich, transient content.',
    categories: ['overlay'],
  },
  'preview-card': {
    title: 'Preview Card',
    description: 'A hover-triggered card that previews linked content.',
    categories: ['overlay', 'data-display'],
  },
  progress: {
    title: 'Progress',
    description: 'A bar that communicates the completion status of a task.',
    categories: ['feedback'],
  },
  'radio-group': {
    title: 'Radio Group',
    description: 'A set of mutually exclusive options where only one can be selected.',
    categories: ['forms'],
  },
  'scroll-area': {
    title: 'Scroll Area',
    description: 'A scrollable region with styled, cross-browser scrollbars.',
    categories: ['layout'],
  },
  select: {
    title: 'Select',
    description: 'A control for choosing one option from a dropdown list.',
    categories: ['forms'],
  },
  separator: {
    title: 'Separator',
    description: 'A thin divider for visually grouping content.',
    categories: ['layout'],
  },
  sheet: {
    title: 'Sheet',
    description: 'A drawer alias exposing Sheet-named exports backed by the Dialog primitive.',
    categories: ['overlay'],
  },
  skeleton: {
    title: 'Skeleton',
    description: 'A placeholder shimmer shown while content is loading.',
    categories: ['feedback'],
  },
  slider: {
    title: 'Slider',
    description: 'A control for selecting a numeric value from a range.',
    categories: ['forms'],
  },
  spinner: {
    title: 'Spinner',
    description: 'An animated indicator for indeterminate loading states.',
    categories: ['feedback'],
  },
  switch: {
    title: 'Switch',
    description: 'A toggle control for switching a setting on or off.',
    categories: ['forms'],
  },
  table: {
    title: 'Table',
    description: 'Composable building blocks for rendering tabular data.',
    categories: ['data-display'],
  },
  tabs: {
    title: 'Tabs',
    description: 'A set of layered sections of content shown one panel at a time.',
    categories: ['navigation', 'disclosure'],
  },
  textarea: {
    title: 'Textarea',
    description: 'A multi-line text input field.',
    categories: ['forms'],
  },
  toggle: {
    title: 'Toggle',
    description: 'A two-state button that can be on or off.',
    categories: ['actions', 'forms'],
  },
  'toggle-group': {
    title: 'Toggle Group',
    description: 'A set of toggle buttons that can be single- or multi-select.',
    categories: ['actions', 'forms'],
  },
  tooltip: {
    title: 'Tooltip',
    description: 'A small floating label that describes an element on hover or focus.',
    categories: ['overlay', 'feedback'],
  },

  // Library items (registry:lib).
  utils: {
    title: 'Utils',
    description: 'The `cn` class-name helper combining clsx and tailwind-merge.',
    categories: ['lib'],
  },

  // Theme item (registry:theme).
  theme: {
    title: 'Theme',
    description: 'The calm lunofi-ui theme: OKLCH design tokens and Tailwind v4 theme mapping.',
    categories: ['theme'],
  },
};
