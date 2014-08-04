BIN = ./node_modules/.bin/

test:
	@$(NODE) $(BIN)mocha \
		--require should \
		--reporter spec \
		--harmony-generators \
		--timeout 10000 \
		--bail

.PHONY: test