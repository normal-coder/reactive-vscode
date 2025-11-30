import { createSingletonComposable } from './createSingletonComposable'

/**
 * Define a service that should only be instantiated once.
 *
 * @category lifecycle
 */
export const defineService = createSingletonComposable
