# LetsConfig

Load config file (.ts) & Return type-safe object.

## Features

⚡ load configuration fast
🎓 stop configure configuration 
📦 cute size

## Installation

``` bash
pnpm add lets
```

## Cookbooks

// start with default config
``` typescript
const myConfig = new LetsConfig({});
```
// simple configuration, extend config properties
``` typescript
default: {
    name: {
        value: 'Dorage Lee',
        description: 'username in service',
        modfied: {
            firstName: (name) => name.split(' ')[0]
            lastName: (name) => name.split(' ')[1]
        }
    }
}
```
// start with load file
``` typescript
// find with filename
const myConfig = LetsConfig.Load({
    // find by absolute path
    name: '~/.config/lets.config.ts',
    // find by relative path
    name: 'lets.config.ts',
    // find by relative path
    name: './configs/lets.config.ts',
    // find by regex
    name: /lets\.config\.(?=development|production)\.ts/,
    // find by matcher
    name: (filename, fullpath) => {
        if(filename === /lets\.${process.env.NODE_ENV}\.ts/) return true;
        return false;
    }
    ...
})
```
// validate configuration file by zod
``` typescript
const myConfig = LetsConfig.Load({
    ...
    // find with string
    validator: (config:any) => {
        if (zConfig.safeParse(config).success)
            return {};
        return config;
    }
})
```
// merge multiple configs
``` typescript
myConfig.merge('~/lets.config.ts')
```

## Roadmaps

// help typing config
// generate pretty config file
// add custom loader
// pass configuration by cli arguments
// arguments > custom configuration file > default configuration
