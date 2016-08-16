# FT Next's Email Article

A component to share paywalled articles with others through email, whether they are FT subscribers or not.

This is the client-side UI.

## Demos

[financial-times.github.io/n-email-article](http://financial-times.github.io/n-email-article)

CircleCI doesn't push latest to GitHub Pages.  You will need to do it manually using your GitHub credentials:

```sh
sh gh-pages.sh
```

## Installation

```sh
git clone git@github.com:financial-times/n-email-article
cd n-email-article
make install
```

## Development

To start a development web server with hot reloading capability:

```sh
make run
```

then open in the web browser:

[https://local.ft.com:5050/webpack-dev-server/](https://local.ft.com:5050)

## Usage

See [demos](./demos) and search for `n-email-article` in [next-article](https://github.com/financial-times/next-article) for actual uses in production.
