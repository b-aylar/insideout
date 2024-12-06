void setup() {
    Serial.begin(9600); // initialize serial monitor to baud rate 9600
    while (!Serial);    // wait for the serial monitor to open
    Serial.println("Adafruit board is ready");
}

void loop() {
    Serial.println(analogRead(9)); // read data from pin A9
    delay(50); // delay to stabilize readingsw
}
