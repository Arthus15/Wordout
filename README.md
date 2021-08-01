# Wordout
Wordout is a desktop app design for helping to pass *Police Ortographic test*. As a user you will have a default database with few words to make some test, but is up to you to add more word.

## Tech Stack
Electron + typescript. That's all. 

## Languages
Just **Spanish** at the moment.

## Can I contribute?
Absolutely, I want the app to be an open-source/free app. I will review personally any PR.

## How to create a new version
I've develop an auto-upload system which get's all the files from *build* folder but db and icon. Any PR or new feature should have a new working build folder 
and new version *x.y.z* (x is the major version, y minor and z for bugs) and should be increase in *version.json* and *build/version.json* file. Both **must have** the same version set. **NO PR WILL BE APPROVED WITHOUT THE CORRECT VERSION SET**

## Commands

### Debug

Allows you to compile and run the app in local
``` 
npm run debug
```

### Compile

Generates build folder
```
npm run compile
```
