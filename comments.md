# NOTES - CR 2

### React
	- No tests? Why no TDD?
	- Less verbose destructuring off of props in Components
	- Some redundant connect() calls. It's okay to forgo the react-redux API or use it in parts, but I would reference what you've mapped to props as such, and not dot it off the state (eg ProductItem)
	- What components can we make even dumber? (Get rid o' class syntax entirely)
	- Repetitive components, ProductItem vs SingleProduct
	- Broken img assets on MVP
	- Unnecessary {children} in Login Component
	- Move Dispatch out of OnEnter in <Main />
	- Ordering flow incomplete on MVP

### Redux
	- Logging Middleware in DEV only
	- CRUD actions for reviews/orders? Which are necessary?

### Workflow
	- Move index.scss into public
	- Write a better Readme
	- No more direct commits to master (merges only)
	- Imbalanced commit ratio
	- User Stories

		- 'As an [X] I want to [Y] by [Z]'
		- [Z] is state-changing action to bake into redux

	- Semantic commit messages:

	   - the type of commit (feature, test, fix, style, refactor, etc.)
	   - the subject of the committed code
	   - a present-tense description of what the commited code does


### Deployment
	-NODE_ENV defaults to production
	- Webpack is dev dependency, so how are we managing the build process on the deployed branch (not wrong, just want to discuss)