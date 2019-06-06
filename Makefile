transifex_resource = frontend-app-ecommerce

# this directory must match .babelrc
transifex_temp = ./temp/babel-plugin-react-intl

include node_modules/.bin/transifex-Makefile
# to override the language list from transifex-Makefile, add a langs variable here:
# transifex_langs = "fr,es-419"