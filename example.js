const Connector = require('./src/index');

const connector = new Connector();

connector.on('connect', async (data, fetch)=>{
    let res = await fetch('get', '/lol-summoner/v1/current-summoner');
    if (res.status === 200){
        let data = await res.json();
        console.log(`You are already logged as ${data.displayName}`);
    } else {
        console.log('You are not currently logged. Please log into your account!');
    }
});
connector.on('disconnect', _ =>{
    connector.stop();
});

connector.on('/lol-summoner/v1/current-summoner', (data)=>{
    if (data.eventType !== 'Update'){
        return;
    }
    console.log(`Logged as ${data.data.displayName}`);
});

connector.start();