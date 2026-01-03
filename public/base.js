// @ts-check

var loadStartedAt = Date.now();
var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
var themes = ['light-theme', 'dark-theme'];
var documentElement = document.documentElement;
var preferredTheme = prefersDark ? themes[1] : themes[0];

console.log({ preferredTheme, prefersDark });

documentElement.classList.add(preferredTheme);