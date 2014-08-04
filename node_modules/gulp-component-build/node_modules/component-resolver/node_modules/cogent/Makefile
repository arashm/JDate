BIN = $(npm bin)
SRC = $(wildcard lib/*.js)
BUILD = $(subst lib,build,$(SRC))

build:
	@mkdir -p build
	@$(MAKE) $(BUILD)

build/%.js: lib/%.js
	@$(BIN)regenerator --include-runtime $< > $@

clean:
	@rm -rf build

test:
	$(BIN)mocha --require gnode \
		--harmony-generators \
		--require should \
		--reporter spec

.PHONY: test clean