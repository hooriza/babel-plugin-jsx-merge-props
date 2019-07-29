const path = require('path');
const fs = require('fs-extra');
const babel = require('@babel/core');

const pluginPath = require.resolve('./index');

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const transformFile = async srcPath =>
  (await babel.transformFileAsync(srcPath, { plugins: [pluginPath] })).code;

const normalizeLines = str => {
  return str.trimRight().replace(/\r\n/g, '\n');
};

const normalizeCode = code => code.replace(/\r\n/g, '\n').trim();

describe('babel-plugin-jsx-merge-props', () => {
  const paths = fs.readdirSync(path.resolve(__dirname, './fixtures'));
  paths.forEach(testPath => {
    test(testPath, async () => {
      const transformed = await transformFile(
        path.resolve(__dirname, './fixtures', testPath, 'actual.js')
      );

      const expected = await fs.readFile(
        path.resolve(__dirname, './fixtures', testPath, 'expected.js'),
        'utf-8'
      );

      expect(normalizeCode(transformed)).toEqual(normalizeCode(expected));
    });
  });
});
