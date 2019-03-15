# CI and QA with Angular
By [Emmanuel Demey](https://twitter.com/EmmanuelDemey), Developer Advocate @ Zenika

The ideas of this meetup can be applied to other front technologies as these problematics are shared.

## Starting a project

Always start with a code generator and keep an eye on the production build (`npm run build -- --prod`).
You will avoid early mistakes and start with a structure and some tools recommended by the community.

## Testing

Unit tests with [Karma](http://karma-runner.github.io/3.0/index.html) and End to end with [Protractor](https://www.protractortest.org/#/).
During the CI, it is preferable to run `npm run test -- --watch=false`.
For your e2e tests, each scenario must be described in a `.po.ts` (PO: Page Object) file and included in the `.spec.ts` of the components using it.
These files contain a description of what it is possible to find in their related workflows.

Karma makes it very hard to run isolated test suites without editing the configuration.
If this feature is important for your project, you can replace Karma with [Jest](https://jestjs.io/).
The dependency is [@angular-builders/jest](https://www.npmjs.com/package/@angular-builders/jest).
Do not forget to update the "test" configuration in your `angular.json` and `tsconfig.spec.json` with `@angular-builders/jest:run`.
Also, it is important to note that Jest only supports CommonJS modules.

## Linting

Use and abuse [TSLint](https://palantir.github.io/tslint/). You can specify, enable and disable its rules with `tslint.json`.
Furthermore, the rules specific to Angular will use your `angular.json`.

[Prettier](https://prettier.io/) will avoid most of your formatting issues by generating an internal representation of your code and rewriting it consistently afterwards.
Prettier can be configured with `prettier.rc`.
To display a list of files that do not comply with the linting standards, you can run `prettier -l **/*.ts`.

## Git hooks

Instead of relying on the CI to check the correctness of your changes, you can add a pre-commit hook with [Husky](https://github.com/typicode/husky).
With some configuration in `package.json`, you should be able to run your linter locally right before the commit happens.

## Schematics

At the base of the `ng generate` command, Schematics allow developers to quickly add new features to a project by handling scaffolding.

## Code coverage

Always check that the code cover never drops.
For that, you need a third party service that computes and saves the metrics computed during the CI.

## Testing the CI
It is possible to test the CI locally by installing a runner and sending commits.
You can then squash the commits to keep the tree clean.
