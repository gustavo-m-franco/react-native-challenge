import { action } from 'typesafe-actions';
import { BaseAction } from './types';

export function createActionCreator<T extends string, P>(
  type: T,
): (payload: P) => BaseAction<T, P>;

export function createActionCreator<T extends string>(
  type: T,
): () => BaseAction<T, undefined>;

export function createActionCreator<T extends string, P>(
  type: T,
): (payload: P) => BaseAction<T, P> {
  return (payload: P) => action<T, P>(type, payload);
}
