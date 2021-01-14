const csv = require('csv-parser');
const fs = require('fs');
const csvw = require('csv-writer');

var input = [];

fs.createReadStream('volunteer_attendance_data.csv')
    .pipe(csv())
    .on('data', (row) => { 
        input.push(row); 
    })
    .on('end', () => {
        main();
    });

function main() {
    var shifts = {};
    input.forEach(element => {
        if (!shifts[element['date'] + " " + element['shift']]) {
            shifts[element['date'] + " " + element['shift']] = [];
        }
        shifts[element['date'] + " " + element['shift']].push(element['volunteerName']);
    });
    console.log(shifts, '\n');

    var graph = {};
    for (const [key, value] of Object.entries(shifts)) {
        for (var i = 0; i < value.length; i++) {
            for (var j = 0; j < value.length; j++) {
                if (i == j) {
                    continue;
                }
                if (!graph[value[i]]) {
                    graph[value[i]] = {};
                }
                if (!graph[value[i]][value[j]]) {
                    graph[value[i]][value[j]] = 0;
                }
                graph[value[i]][value[j]]++;
            }
        }
    }
    console.log(graph, '\n');

    const createCsvWriter = csvw.createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: [
            {id: 'node1', title: 'node1'},
            {id: 'node2', title: 'node2'},
            {id: 'weight', title: 'weight'}
        ]
    });

    const records = [];
    for (const [key1, value1] of Object.entries(graph)) {
        for (const [key2, value2] of Object.entries(value1)) {
            records.push({node1: key1, node2: key2, weight: value2});
        }
    }
    console.log(records, '\n');

    csvWriter.writeRecords(records)
    .then(() => {
        console.log('writing output.csv...\ndone');
    });
};

