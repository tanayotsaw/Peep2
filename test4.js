'use strict';

//import
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const Traceroute = require('nodejs-traceroute');
var target = process.argv.slice(2);
//var target = '8.8.8.8'

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();
//Datetime
let datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log(datetime)
//time
let time = + hours + ":" + minutes + ":" + seconds;
console.log(datetime)

//create connection
const pool = mysql.createConnection({
    host: "172.22.5.186",
    user: "boss",
    password: "boss",
    database: "tracert"

});

const Connection_Tracert = () => {
    return new Promise((resolve, reject) => {
        pool.connect(function (err) {

            if (err) {
                return reject(error);
            }
            return resolve(console.log("Connected!"));
        });

    });

};

const Delete_Tracert = () => {
    return new Promise((resolve, reject) => {
        pool.query('delete from Tracert', (err) => {

            if (err) {
                return reject(error);

            }
            return resolve(console.log("Delete complete"));
        });
    });
};

const Insert_Tracert = () => {
    return new Promise((resolve, reject) => {

        try {
            const tracer = new Traceroute();


            tracer

                .on('destination', (destination) => {
                    console.log(`destination: ${destination}`);
                })
                .on('hop', (hop) => {

                    pool.query('insert into Tracert (Hop,IP_tracert,Rtt,Time) VALUES (?,?,?,?)',
                        [hop.hop, hop.ip, hop.rtt1, datetime], (err) => {
                            if (err) {
                                return reject(err);

                            }
                            return resolve(pip);

                        })
                    const pip = [console.log(`hop: ${JSON.stringify(hop)}`),
                    console.log("Insert Complete")];

                    if(target == hop.ip){
                        setTimeout(Logout_Tracert, 2000);
                    }

                })

            tracer.trace(target);
        } catch (ex) {
            console.log(ex);
        }
    });
};

const Logout_Tracert = () => {
    return new Promise((resolve, reject) => {

        pool.end(function (err) {

            if (err) {
                return reject(err);
            }
            return resolve(console.log("Logout Complete"));
        });

    });

};

async function main() {

    await Connection_Tracert();
    await Delete_Tracert();
    await Insert_Tracert();
     //setTimeout(Logout_Tracert, 50000);


}

main();





