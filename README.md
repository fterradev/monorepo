# monorepo sample
JS Monorepo sample with path mapping that works at both development and run times.

### Installation
1. Clone the repository.
2. Run `lerna bootstrap [--hoist]`.

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