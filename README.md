# to-do-app-cumbersome-v1.0
A simple to-do app by node.js for practice purpose.

This is a to-do list app I wrote by using Express + EJS, which did not even meet my own standard.

## Existing Problems

1. The add and delete feature, though works, are handled awkwardly. In v2.0, each add and delete user action should not trigger a list regeneration. DOM addition and deletion should be handled on-the-spot, instead of regenerating a whole list every time these actions are triggered.

2. The search feature is not implemented. Still not wrap my head around it for the moment so have to leave it for the next version.

3. Database is not involved. In v2.0, MongoDB should be used to store list items.

4. Current code structure is awkward, awkward and awkward... have to organize my code in a better way in the upcoming version.

Stay calm and be a happy coder!
