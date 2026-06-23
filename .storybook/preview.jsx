/** @type { import('@storybook/react-vite').Preview } */
import '../src/_scss/_global.scss';
import registerIcons from '../src/js/registerIcons';

registerIcons();

const preview = {
  parameters: {
  options: {
    name: 'USAspending',
    showAddonPanel: true,
    tags: ['autodocs']
  },
  viewport: {},
  a11y: {
    element: 'body',
    config: {},
    options: {},
    test: 'todo'
  },
  globals: {
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
  },
}};
export default preview;