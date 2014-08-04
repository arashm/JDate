BIN = ./node_modules/.bin/
NODE ?= node
SRC = $(shell find lib -name "*.js")
BUILD = $(subst lib,build,$(SRC))

build: $(BUILD)

build/%.js: lib/%.js
	@mkdir -p build/builders build/plugins
	@$(BIN)regenerator --include-runtime $< > $@

clean:
	@rm -rf build components public

test: build
	@$(NODE) $(BIN)mocha \
		--harmony-generators \
		--require should \
		--reporter spec \
		--timeout 30s \
		--bail

.PHONY: test clean
