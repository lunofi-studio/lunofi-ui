import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';

import * as previewAnnotations from './preview';

// Applies the shared preview (globals.css import + theme decorator) and the
// React renderer annotations to every story executed under Vitest, so tests
// render with the real calm theme and a working render function.
const project = setProjectAnnotations([previewAnnotations]);

beforeAll(project.beforeAll);
