/// <reference types="node" />

/**
 * Replaces module imports with a configured mock.
 *
 * @param targetModules  The filenames of the modules to be mock.
 *
 * @param mocksDirectory The directory that stores all the mocks
 *
 * @param extension      The file extension .(js|ts)
 */
declare function mock(
  targetModules: string[],
  mocksDirectory: string
): NodeJS.ReadWriteStream;

export = mock;
