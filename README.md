# microcredbc-frontend

This is Vue.js single-page application for managing digital badges that are stored in Hyperledger Fabric. It is written in Vue.js and use Vuetify for our user interface.

This web application is intended to use with our [Fabric SDK RESTful server](https://github.com/ntchjb/fabric-sdk-rest), and [microcred smart contract](https://github.com/ntchjb/microcredbc-chaincode).

## Project setup

Type the following command to install dependencies
```
npm install
```

### Configuration

There are several properties that need to be provided before building. Environment variable is used to provide these properties.

``` shell
# Address of RESTful server
VUE_APP_FABRIC_API_URL=http://localhost:3000
# Curve name of the signature used for signing transactions
VUE_APP_SIGNING_NAMED_CURVE='P-256'
# Hash algorithm used for signature generation
VUE_APP_SIGNING_HASH='SHA-256'
# Hyperledger Fabric's channel name
VUE_APP_CHANNEL_NAME='mychannel'
# MSP ID of the organization that provide this web application
VUE_APP_MSPID='Org1MSP'
# Name of the chaincode (smart contract)
VUE_APP_CHAINCODE_NAME='microc'
```

A file named `.env.<mode>.local` may be created to store environment variables as the above example. Please refer to [Vue CLI & environment setup](https://cli.vuejs.org/guide/mode-and-env.html)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## License

Copyright 2020 © JAIBOON Nathachai
