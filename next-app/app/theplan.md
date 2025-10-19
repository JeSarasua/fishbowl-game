[] - Find a UI library for swiping interface

Canididates:

- react-gestures

[X] - Fix state.json files they need to be able to start fresh

[X] - Improve consistency of models for both front-end and back-end these are all over the place rn

[X] - Figure out how I'm gonna manage state for gameStarted, restart, etc. across
multiple components. Some options can be to use react context with a provider (a
component that provides the context) or prop drilling. See useWebSocket.ts for more details
