# signalr-no-jquery
## SignalR JS Client with shimmed jQuery not polluting global namespace

jQuery shim borrowed from [react-native-signalR](https://github.com/olofd/react-native-signalr)

This version of signalR client doesn't add jQuery to `window` object but imports jQueryShim locally to signalR and exports `hubConnection`.
jQueryShim file contains only bare-minimum of jQuery to make signalR client run.

This package is not meant to be used with ASP.NET Core version of SignalR

### Usage

npm i -D signalr-no-jquery


#### ES6 Loader


```
import { hubConnection } from 'signalr-no-jquery';
```

#### HTML

Use just like regular signalR but without $ namespace

```
const connection = hubConnection('http://[address]:[port]', options);
const hubProxy = connection.createHubProxy('hubNameString');

// set up event listeners i.e. for incoming "message" event
hubProxy.on('message', function(message) {
    console.log(message);
});

// connect
connection.start({ jsonp: true })
.done(function(){ console.log('Now connected, connection ID=' + connection.id); })
.fail(function(){ console.log('Could not connect'); });

```

#### Update 4/01/2017: accessing global setttings like through former $.connection

Note: This is an object holding global settings and it's not the same as connection handle returned by hubConnection

```
import { connection } from 'signalr-no-jquery';
```

### Problems

Feel free to create pull requests and raise issues https://github.com/DVLP/signalr-no-jquery/issues
