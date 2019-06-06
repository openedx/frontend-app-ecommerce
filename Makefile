transifex_resource = frontend-app-ecommerce
# this directory must match .babelrc
transifex_temp = ./temp/babel-plugin-react-intl

requirements:
	npm install

validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json

# To override the language list from transifex-Makefile, add a transifex_langs argument to this make command.
# Example: transifex_langs="fr,es-419"
extract_translations:	requirements
	make -f node_modules/.bin/transifex-Makefile i18n.extract i18n.concat transifex_resource=$(transifex_resource) transifex_temp=$(transifex_temp)

push_translations:
	make -f node_modules/.bin/transifex-Makefile push_translations

pull_translations:
	make -f node_modules/.bin/transifex-Makefile pull_translations

detect_changed_source_translations:
	make -f node_modules/.bin/transifex-Makefile detect_changed_source_translations
