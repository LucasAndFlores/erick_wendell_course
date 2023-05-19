# a partir da pasta raiz
# find . -name *.test.js -not -path '*node_modules**'

# find . -name *.js -not -path '*node_modules**' | ipt

CONTENT="'use strict';" \

find . -name *.js -not -path '*node_modules**' \
| npx ipt -o \
	| xargs -I '{file}' sed -i "1s/^/$CONTENT\n\n/g" {file}
