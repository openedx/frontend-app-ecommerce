⛔️ WARNING
==========

This repository is deprecated. For updates, `follow along on the DEPR ticket <https://github.com/openedx/public-engineering/issues/22>`_.

|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release|

frontend-app-ecommerce
======================

Introduction
------------

This is a micro-frontend application responsible for the display of an authenticated user's single purchase order history and subscription history. Additional work has been done and is in-progress to enable receipt pages in this application, currently hosted in ecommerce.

Installation
------------

This MFE is bundled with `Devstack <https://github.com/openedx/devstack>`_, see the `Getting Started <https://github.com/openedx/devstack#getting-started>`_ section for setup instructions.

1. Install Devstack using the `Getting Started <https://github.com/openedx/devstack#getting-started>`_ instructions.

2. Start up Devstack, if it's not already started.

3. Log in to Devstack (http://localhost:18000/login )

4. Within this project, install requirements and start the development server:

   .. code-block::

      npm ci
      npm start # The server will run on port 1996

   Note: We prefer ``npm ci`` over ``npm install`` to match the way CI and production builds work and avoid unintentional changes to ``package-lock.json`` when doing other work.  Note, however, that using ``npm ci`` can obscure necessary updates to ``package-lock.json`` that may have accidentally been left out of prior commits.  If ``npm install`` changes ``package-lock.json``, those are changes that *should* be checked in.

5. Once the dev server is up, visit http://localhost:1996 to access the MFE

   .. image:: ./docs/images/localhost_preview.png

Environment Variables/Setup Notes
---------------------------------

This MFE is configured via environment variables supplied at build time.  All micro-frontends have a shared set of required environment variables, as documented in the Open edX Developer Guide under `Required Environment Variables <https://edx.readthedocs.io/projects/edx-developer-docs/en/latest/developers_guide/micro_frontends_in_open_edx.html#required-environment-variables>`__.

To have ecommerce send users to this receipt page (instead of its own), there are two items to set in ecommerce: 
1) Django admin waffle flag: enable_receipts_via_ecommerce_mfe
2) ECOMMERCE_MICROFRONTEND_URL environment variable

This micro-frontend has no additional required environment variables.

Known Issues
------------

None

Development Roadmap
-------------------

This MFE is currently in maintenance mode, as we have no further development planned for it.  However, if we want to pull more ecommerce interfaces out into a micro-frontend, this would be where they should live.  Note that `frontend-app-payment <https://github.com/openedx/frontend-app-payment>`_ contains the checkout flow.

Anyone merging to this repository is expected to `release and monitor their changes <https://openedx.atlassian.net/wiki/spaces/RS/pages/1835106870/How+to+contribute+to+our+repositories>`__; if you are not able to do this DO NOT MERGE, please coordinate with someone who can to ensure that the changes are released.

==============================

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
