const model = require('./model');
const path = require('path');
const addData = require(path.join(__dirname, 'config', 'data.js'))

module.exports = {
    get : {
        data : (req, res) => {
            model.get.data(data => {

                // 데이터에 아무것도 없는 경우 데이터를 삽입한다.
                if(data.length === 0) {
                    var count = 0;

                    addData.data.forEach( (el) => {
                        model.add.data(el, result => {
                            if(result) {
                                count = count + 1;
                            }
                        })
                    })

                    if(count === addData.data.length) {
                        model.get.data(data => {
                            return res.send(data)
                        })
                    }

                } else {
                    // 데이터가 있는 경우
                    return res.send(data);
                }
            })
        }
    }
}