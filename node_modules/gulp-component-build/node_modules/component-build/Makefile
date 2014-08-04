
BIN = ./node_modules/.bin/
NODE ?= node

test:
	@$(NODE) $(BIN)mocha \
		--harmony-generators \
		--reporter spec \
		--timeout 10s \
		--bail

.PHONY: test