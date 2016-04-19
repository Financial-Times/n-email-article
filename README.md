# FT Next's Email Article

A component to share paywalled articles with others through email, whether they are FT subscribers or not.

This is the client-side UI.  See [next-rtcl-email-api](https://github.com/Financial-Times/next-rtcl-email-api) for the server-side API.

## Demos

[financial-times.github.io/n-email-article](http://financial-times.github.io/n-email-article)

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

[http://localhost:8080](http://localhost:8080)

## Usage

In your project:

```sh
bower install n-email-article
```

then in your CSS file:

```css
@import "n-email-article/main"
```

and your JS file (assuming ES2015):

```js
import { EmailArticle } from 'n-email-article';

const container = document.querySelector('[data-n-email-article]');
new EmailArticle(container);
```
