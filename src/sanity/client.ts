import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'xgnkga4w',
  dataset: 'production',
  apiVersion: '2023-01-01', // Use a date in the past or today, not the future
  useCdn: true,
});