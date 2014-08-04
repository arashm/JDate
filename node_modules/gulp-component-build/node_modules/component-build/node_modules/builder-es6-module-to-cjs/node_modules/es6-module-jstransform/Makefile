BIN 	= ./node_modules/.bin
PATH  := $(BIN):$(PATH)

install link:
	@npm $@

example::
	$(MAKE) -C example/ assets.json start

lint:
	@jshint *.js

test::
	@mocha -b -R spec specs/*.js

release-patch: test lint
	@$(call release,patch)

release-minor: test lint
	@$(call release,minor)

release-major: test lint
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
