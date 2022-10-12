// Import the fontawesome core.
import { library } from '@fortawesome/fontawesome-svg-core';

// Import specific icons.
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faVuejs } from '@fortawesome/free-brands-svg-icons';

/**
 * Array for adding font-awesome icon's imports.
 *
 * If you need use some fa icon, add its imports here.
 */
const faIconsImports = [faArrowLeft, faHouse, faVuejs];

/**
 * Initialize font awesome for use in Vue.js app.
 *
 * @see faIconsImports
 */
export const fontAwesomeInitialization = () => {
  console.log('fontAwesomeInitialization(): Initializing FontAwesome.');

  // Add icons to the font awesome library.
  library.add(...faIconsImports);
};
