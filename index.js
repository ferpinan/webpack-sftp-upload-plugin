'use strict'

const Client = require('scp2');
const client = new Client.Client();

var Client2 = require('scp2').Client;

class WebpackSftp {
    constructor(options = {}) {
        this.options = options
        this.startTime = null
        this.endTime = null
    }

    apply(compiler) {
        compiler.plugin('done', compilation => {
            if (!this.options.port) {
                this.options.port = 22
            }

            var mypath = this.options.path;
            var myLocal = this.options.local;
            var myOpts = this.options;

            this.startTime = Date.now()
            console.log('\nStart upload, please wait...')

            var client2 = new Client2(this.options);
            client2.mkdir (mypath, myOpts, function(){
                Client.scp(myLocal, myOpts, err => {
                    if (err){
                        console.log(err);
                        throw err;
                    }
                    console.log(`Uploaded ${myLocal} successfully in `);
                    client2.close();
                })
            });

            // this.upload(this.options.local, this.options)
        })
    }

    upload(local, obj) {
        Client.scp(local, obj, err => {
            if (err) throw err
            this.endTime = Date.now()
            console.log(`Uploaded ${local} successfully in ${this.endTime - this.startTime}ms`)
        })
    }
}

module.exports = WebpackSftp;
