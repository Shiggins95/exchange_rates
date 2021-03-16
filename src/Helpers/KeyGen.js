import { v4 as uuidv4 } from 'uuid';

export const _generateUniqueKey = (prefix) => `${prefix}-${uuidv4()}`;
