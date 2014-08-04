BIN = ./node_modules/.bin/
NODE ?= node
SRC = $(shell find lib -name "*.js")
BUILD = $(subst lib,build,$(SRC))

build: $(BUILD)

build/%.js: lib/%.js
	@mkdir -p build/remotes
	@$(BIN)regenerator --include-runtime $< > $@

clean:
	@rm -rf build

test:
	@$(NODE) $(BIN)mocha \
		--harmony-generators \
		--require should \
		--reporter spec \
		--timeout 10000 \
		--bail

.PHONY: test clean