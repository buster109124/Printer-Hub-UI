<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans:400,500,600&display=swap");

:root {
  --header-color: #061b2e;
  --body-color: #7f92a4;
  --label-color: #526475;
  --action-color: #1c85e8;
  --accent-color: #e64784;
  --accent-color-second: #41bfda;
  --invalid-color: #ff8082;
  --caution-color: #ffc259;
  --valid-color: #2cc8a7;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--body-color);
}

a {
  color: var(--action-color);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 2% 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Work Sans", sans-serif;
  font-weight: 600;
  color: var(--header-color);
}

label {
  display: block;
  font-size: 90%;
  font-weight: 500;
  color: var(--label-color);
  margin-top: 18px;
  margin-bottom: 8px;
}

input[type="text"],
input[type="url"],
input[type="tel"],
input[type="email"] {
  border: none;
  background-color: transparent;
  padding: 2% 0;
  margin-bottom: 4%;
  border-bottom: 1px solid var(--header-color);
  color: inherit;
  font-family: inherit;
  font-size: 110%;
  font-weight: 500;
  color: var(--header-color);
  transition: all 0.25s ease-in-out;
}

input[type="text"]:focus,
input[type="url"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus {
  border: solid 1px var(--action-color);
  border-radius: 5px;
  padding-left: 10px;
}

input[type="text"]:focus::placeholder,
input[type="url"]:focus::placeholder,
input[type="tel"]:focus::placeholder,
input[type="email"]:focus::placeholder {
  color: var(--action-color);
}

input[type="text"]:hover,
input[type="url"]:hover,
input[type="tel"]:hover,
input[type="email"]:hover {
  padding-left: 10px;
  border-color: var(--action-color);
}

input[type="text"]:hover + label,
input[type="url"]:hover + label,
input[type="tel"]:hover + label,
input[type="email"]:hover + label {
  padding-left: 10px;
  border-color: var(--action-color);
}

input[type="text"]:hover::placeholder,
input[type="url"]:hover::placeholder,
input[type="tel"]:hover::placeholder,
input[type="email"]:hover::placeholder {
  opacity: 0.7;
  color: var(--action-color);
}

input:invalid + label {
  padding-left: 10px;
  color: var(--invalid-color);
}

input:invalid {
  color: var(--invalid-color);
  border: solid 1px var(--invalid-color);
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
}

input:invalid::placeholder {
  opacity: 0.7;
}

input.fill {
  width: 85%;
}

.selection {
  display: inline-block;
  margin-right: 1em;
  overflow: hidden;
}

.selection input[type="radio"],
.selection input[type="checkbox"] {
  display: none;
}

.selection label,
button {
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  color: var(--header-color);
  background-color: #dadada;
  border: none;
  /* border: 1px solid var(--header-color); */
  display: inline-block;
  padding: 1em 1.75em;
  margin: 0;
  transition: color, background-color 0.25s ease-in-out;
}

.selection input[type="radio"]:checked + label,
.selection input[type="checkbox"]:checked + label,
button {
  color: #fff;
  background-color: var(--action-color);
  border-color: var(--action-color);
}

button {
  font-family: inherit;
  font-weight: 600;
  margin: 0.5em 0.5em 0em 0;
  transition: opacity 0.25s ease-in-out;
}

#app {
  height: 100%;
}

::placeholder {
  opacity: 0.32;
  font-style: italic;
  font-weight: 400;
  font-size: 80%;
}
</style>