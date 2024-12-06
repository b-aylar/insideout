let port; // serial port object
let reader; // serial port reader
let keepReading = false; // flag to indicate if the reading process should continue
let count = 0; // counter of data points

// set up chart.js for data visualization
// get the canvas context
const ctx = document.getElementById('chart').getContext('2d'); 
const chart = new Chart(ctx, {
    type: 'line', // line chart
    data: {
        labels: [], // timestamps for the x-axis
        datasets: [{
            label: 'COM Port Data', 
            data: [], // array to store data
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false, // disable area fill under the line
            tension: 0.1, // line tension for smoother curves
            pointStyle: false, // disable point markers
            cubicInterpolationMode: 'monotone' // smoother curve interpolation
        }]
    },
    options: {
        responsive: true, // chart adjusts to container size
        animation: false, // disable animation
        scales: {
            x: { 
                title: { display: true, text: 'Timestamp' }, // x-axis
                ticks: { autoSkip: true, maxTicksLimit: 10 } // limit number of x-axis labels
            },
            y: { 
                title: { display: true, text: 'Voltage, V' } // y-axis
            }
        }
    }
});

// event listener for the connect button
document.getElementById('connect').addEventListener('click', async () => {
    try {
        // request a serial port and open connection
        port = await navigator.serial.requestPort(); // show port selection window
        await port.open({ baudRate: 9600 }); // open port with specified baud rate

        // update button states
        document.getElementById('connect').disabled = true;
        document.getElementById('disconnect').disabled = false;

        // start reading data from port
        keepReading = true;
        readFromPort();
    } catch (err) {
        // error handling
        console.error('Error connecting to the port:', err); 
        alert('Failed to connect to the port. Make sure you have the correct permissions.');
    }
});

// event listener for the disconnect button
document.getElementById('disconnect').addEventListener('click', async () => {
    // stop reading data
    keepReading = false;

    // cancel and release the reader if active
    if (reader) {
        await reader.cancel();
        reader.releaseLock();
    }
    // close the port if open
    if (port) {
        await port.close();
    }

    // update button states
    document.getElementById('connect').disabled = false;
    document.getElementById('disconnect').disabled = true;
});

// read data from the port
async function readFromPort() {
    // decode incoming data as text
    const decoder = new TextDecoderStream(); 
    // connect port readable stream to decoder
    const inputDone = port.readable.pipeTo(decoder.writable); 
    // get the reader from the decoded stream
    reader = decoder.readable.getReader(); 

    // log area for displaying raw data (voltage)
    const output = document.getElementById('output'); 
    try {
        // read while flag is true and count of data points is less than 100
        while (keepReading && count < 100) {
            // read data
            const { value, done } = await reader.read(); 
            if (done) {
                break;
            }
            if (value) {
                // append received data to log
                output.textContent += value;

                // transform data type into float
                const parsedValue = parseFloat(value.trim());
                if (!isNaN(parsedValue)) {
                    // add data to chart
                    addDataToChart(parsedValue);
                    // calculate BPM based on data 
                    calculateBPM(parsedValue);
                }
            }
            // delay for 100ms between reads for stabilization
            await new Promise(resolve => setTimeout(resolve, 100));
            count++; 
        }
        // stop reading after count limit
        keepReading = false;

        // clean up resources
        if (reader) {
            await reader.cancel();
            reader.releaseLock();
        }
        if (port) {
            await port.close();
        }
    } catch (err) {
        // log reading errors
        console.error('Error reading from port:', err);
    } finally {
        // ensure the reader is released
        reader.releaseLock();
    }
}

// add data points to the chart
function addDataToChart(data) {
    // get the current time
    const now = new Date().toLocaleTimeString(); 

    // add new data point to the chart
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(data);

    // limit the chart to the last 50 data points
    if (chart.data.labels.length > 50) {
        // remove oldest label and data point for the graph to shift
        chart.data.labels.shift(); 
        chart.data.datasets[0].data.shift();
    }

    // update the chart to reflect changes
    chart.update();
}

// calculate and display heart rate (BPM)
function calculateBPM(data) {
    // counter for peaks
    let bpm_count = 0;
    // get chart data points
    const dataPoints = chart.data.datasets[0].data;

    // count peaks
    for (let i = 1; i < dataPoints.length - 1; i++) {
        // check for exceeding the threshold voltage and middle peak being the highest among three
        if (dataPoints[i] > 512 && dataPoints[i] > dataPoints[i - 1] && dataPoints[i] > dataPoints[i + 1]) {
            bpm_count++;
        }
    }

    // calculate BPM assuming we record data for 5 secs (60/5=12)
    let bpm = bpm_count * 12;
    // update BPM display
    document.getElementById('bpm').textContent = `Your current heart rate is ${String(bpm)}`; 
    return bpm;
}

// event listener for the next button
document.getElementById('next').onclick = function (event) {
    // redirect to the quiz page
    window.location.href = '/quiz.html';
};
