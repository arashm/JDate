BIN = ./node_modules/.bin/
NODE ?= node

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