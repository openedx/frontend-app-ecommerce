|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release|

frontend-app-ecommerce
======================

This is a micro-frontend application responsible for the display of an authenticated user's order history. Please tag **@edx/revenue-squad** on any PRs or issues.

----------

Development
-----------

Start Devstack
^^^^^^^^^^^^^^

To use this application `devstack <https://github.com/edx/devstack>`__ must be running and you must be logged into it.

-  Start devstack
-  Log in (http://localhost:18000/login)
Start the development server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this project, install requirements and start the development server by running:

.. code:: bash

   npm ci
   npm start # The server will run on port 1996

Once the dev server is up visit http://localhost:1996.

----------

Configuration and Deployment
----------------------------

This MFE is configured via node environment variables supplied at build time. See the .env file for the list of required environment variables. Example build syntax with a single environment variable:

.. code:: bash

   NODE_ENV=development ACCESS_TOKEN_COOKIE_NAME='edx-jwt-cookie-header-payload' npm run build


For more information see the document: `Micro-frontend applications in Open
edX <https://github.com/edx/edx-developer-docs/blob/5191e800bf16cf42f25c58c58f983bdaf7f9305d/docs/micro-frontends-in-open-edx.rst>`__.

----------

.. |Build Status| image:: https://api.travis-ci.org/edx/frontend-app-ecommerce.svg?branch=master
   :target: https://travis-ci.org/edx/frontend-app-ecommerce
.. |Codecov| image:: https://img.shields.io/codecov/c/github/edx/frontend-app-ecommerce
   :target: https://codecov.io/gh/edx/frontend-app-ecommerce
.. |npm_version| image:: https://img.shields.io/npm/v/@edx/frontend-app-ecommerce.svg
   :target: @edx/frontend-app-ecommerce
.. |npm_downloads| image:: https://img.shields.io/npm/dt/@edx/frontend-app-ecommerce.svg
   :target: @edx/frontend-app-ecommerce
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-app-ecommerce.svg
   :target: @edx/frontend-app-ecommerce
.. |semantic-release| image:: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
   :target: https://github.com/semantic-release/semantic-release
