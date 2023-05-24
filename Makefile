JSON := $(shell find . -type f -name '*.json' 2>/dev/null)

lint: $(JSON)

$(JSON):
	json_verify < $@

.PHONY: lint $(JSON)
