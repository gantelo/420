// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}


// Read the file and print its contents.
var fs = require('fs')
    , filename = process.argv[2];
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    const losMen = {
        "Paxu": 0,
        "Chorizioli": 0,
        "Cotilli": 0,
        "Albano": 0,
        "Buzzeo": 0,
        "Mudo": 0,
        "Gabriel": 0,
        "Pollo": 0,
        "Fer": 0,
        "Pigal": 0,
        "Juani": 0,
        "Pepe": 0,
        "Muerte": 0,
        "Cumina3": 0,
        "Pauloncho": 0,
        "Nessi": 0,
        "LuchoC": 0
    }

    const splitData = data.split('\n');

    const dict = {};

    let repeats = [];

    //1/1/21, 04:20 - Chorizioli: 420
    let prevDate = '';

    splitData.forEach((line) => {
        const isValidHour = line.split(', ')[1].split(' - ').includes('16:20') || line.split(', ')[1].split(' - ').includes('04:20');
        const isValidMsg = line.split(': ')[1].trim().startsWith('420');
        const hour = line.split(', ')[1].split(' - ')[0];
        const date = line.split(',')[0];
        const name = line.split(' - ')[1].split(':')[0];

        if (date !== prevDate) {
            repeats = [];
        }

        let shouldIncrease = false;

        if (repeats.includes(`${name}-${hour}`)) {
            shouldIncrease = false;
        } else {
            shouldIncrease = true;
        }

        repeats.push(`${name}-${hour}`)

        losMen[name] += isValidHour && isValidMsg && shouldIncrease ? 1 : 0;
        

        dict[date] = JSON.parse(JSON.stringify(losMen));

        prevDate = date;
    })

    fs.writeFileSync('test.json', JSON.stringify(dict))
    // console.log(dict)
});