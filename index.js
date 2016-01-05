(function(){
    'use strict';
    var fs = require('fs'),
        above = ['t','i','d','f','h','j','k','l','b',
                 'й','ё'],
        below = ['q','y','p','g','j',
                 'ц','у','щ','ф','р','д'];

    above = above.concat('!?ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮQWERTYUIOPASDFGHJKLZXCVBNMЁ'.split(''));
    below = below.concat('ЦЩДQ'.split(''));

    function count (data, outFile) {
        var map = {},
            l = data.length,
            aboveScore = 0,
            belowScore = 0;
        for (let i = 0; i < l; i++) {
            if (data[i] in map) {
                map[data[i]]++;
            } else {
                map[data[i]] = 1;
            }
        }
        var out = '';
        for (let i in map) {
            let k = map[i] / l;
            if (above.indexOf(i) !== -1) {
                aboveScore += k;
            }
            if (below.indexOf(i) !== -1) {
                belowScore += k;
            }
            out += i + '\t' + map[i] + '\t' + k + '\n';
        }
        out += '\n\nAbove:\t' + aboveScore + '\nBelow:\t' + belowScore;
        fs.writeFile(outFile, out);
    }

    fs.readFile('eng.txt', {
        encoding: 'utf-8'
    }, function (err, data) {
        if (err) throw err;
        count(data, 'engOut.txt');
    });
    fs.readFile('ru.txt', {
        encoding: 'utf-8'
    }, function (err, data) {
        if (err) throw err;
        count(data, 'ruOut.txt');
    });
})();
