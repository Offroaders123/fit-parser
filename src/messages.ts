import { getMessageName, getFieldObject } from './fit.js';

export function getFitMessage(messageNum) {
  return {
    name: getMessageName(messageNum),
    getAttributes: (fieldNum) => getFieldObject(fieldNum, messageNum),
  };
}

/**
 * TODO
*/
export function getFitMessageBaseType<K>(foo: K): K {
  return foo;
}
