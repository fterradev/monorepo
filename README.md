# monorepo sample
JS Monorepo sample with path mapping that works at both development time and runtime.

### Installation
1. Clone the repository.
2. Run `lerna bootstrap [--hoist]`. (Hoisting is optional)

### Run
See it in action, so you can make sure this setup really works (at runtime).
````
// either
yarn start

// or
cd packages/app
node index.js 
````


## Setup breakout
### Lerna
The tool for initializing the monorepo structure (and allows for improved scripting) as a set directories under /packages.

### jsconfig.js files
Each package can define its own inner path mapping on its jsconfig file > compilerOptions > paths.

This is sufficient for the IDE (development time) to resolve modules within a package according to its own mapping.

But when a package uses another package, for example, package A uses package B.

Package A needs to use `references` property to point package B.

Package B on the other hand needs to use `composite` to make it a "referable" package.

### tsconfig-paths
The jsconfig files are not automatically used at runtime.

Module tsconfig-paths can be used to apply this mapping at runtime.

We use its `register` function for that, and we do it in the package's index, so it's ready to resolve any mapped entry.

One key point to make it work was using the `cwd` parameter, so it gets applied from the package's perspective, instead of the process' cwd.

Also worth mentioning that, though lerna ships with tsconfig-paths, we need to explicitly install it. First because the version used by lerna is an earlier one, which doesn't expose the `cwd` parameter. And second for properly setting it as a dependency for the package.

Note: in fact the mapping must be `register`ed at every exposed exports. Since we generally expect other packages to import only the **index** of another package, it's sufficient to `register` it only in that same file.

## General notes

### Intellisense
Intellisense works across packages even when the source of it is path-mapped. See the `process` function imported from `business` in the [./packages/app/src/app.js](./packages/app/src/app.js) file.

The `references` section in the jsconfig is what makes it work. Try removing it.

### Comments on jsconfig.json
VS code has no problem of having comments on this file - there is probably a special rule for it. But requiring a json file with comments does not work. If that is needed, it should be possible to do it with a lib like https://www.npmjs.com/package/require-json5.

### About errors in jsconfig.json.
When you add a `references` entry to as to refer a new package, it requires some updates in the referred jsconfig.
Like adding the `composite` property - which is by design.

But we also get errors related to typescript compilation - although we are not using typescript at all. Those were worked around by using `"noEmit": false` and `"outDir": "dist"`. The latter just so the engine doesn't complain that the source files would be overwritten, as the outDir is by default the same folder, ie ts files are compiled to js files and output to the same folder, which is not allowed when we also have js source files.
