function Set_TIMER_MODE () {
    TIMER_MODE_NONE = 0
    TIMER_MODE_5_MIN = 1
    TIMER_MODE_10_MIN = 2
    TIMER_MODE_60_MIN = 3
}
function Set_GlobalVar () {
    uint32_t_g_previousTick = 0
    uint8_t_g_brightness = MAXIMUM_BRIGHTNESS
    uint8_t_g_blinkingMode = SPEED_MODE_NONE
    uint8_t_g_timerMode = TIMER_MODE_NONE
    bool_g_power = false
    int32_t_g_timerModeCountdown = 0
    int32_t_g_blinkingCountdown = 0
    bool_g_blinkingPower = false
}
function voidSetup () {
	
}
function tone () {
    for (let index = 0; index < 3; index++) {
        music.playTone(988, music.beat(BeatFraction.Whole))
        pause(1000)
    }
}
function SoundLED () {
    if (input.soundLevel() >= SoundHi && input.lightLevel() <= Lite) {
        light.setBrightness(10)
        light.showRing(
        `white white white white white white white white white white`
        )
        pause(10000)
    } else if (input.soundLevel() >= SoundLo && input.lightLevel() <= Lite) {
        pins.LED.digitalWrite(true)
        pause(50000)
    } else {
        pins.LED.digitalWrite(false)
    }
}
function TempSetLED () {
    light.setBrightness(25)
    if (TempSet <= 50) {
        light.showRing(
        `black black black black yellow black black black black black`
        )
    } else if (TempSet <= 55) {
        light.showRing(
        `black black black yellow yellow black black black black black`
        )
    } else if (TempSet <= 60) {
        light.showRing(
        `black black yellow yellow yellow black black black black black`
        )
    } else if (TempSet <= 65) {
        light.showRing(
        `black yellow yellow yellow yellow black black black black black`
        )
    } else if (TempSet <= 70) {
        light.showRing(
        `yellow yellow yellow yellow yellow black black black black black`
        )
    } else if (TempSet <= 75) {
        light.showRing(
        `yellow yellow yellow yellow yellow black black black black yellow`
        )
    } else if (TempSet <= 80) {
        light.showRing(
        `yellow yellow yellow yellow yellow black black black yellow yellow`
        )
    } else if (TempSet <= 85) {
        light.showRing(
        `yellow yellow yellow yellow yellow black black yellow yellow yellow`
        )
    } else if (TempSet <= 90) {
        light.showRing(
        `yellow yellow yellow yellow yellow black yellow yellow yellow yellow`
        )
    } else if (TempSet <= 95) {
        light.showRing(
        `yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow`
        )
    } else if (TempSet <= 100) {
        light.showRing(
        `black black black black black black black black black black`
        )
    }
}
function Read_point () {
    Lite = input.lightLevel()
    serial.writeValue("Lite", input.lightLevel())
    Temp = input.temperature(TemperatureUnit.Fahrenheit)
    serial.writeValue("Temp", input.temperature(TemperatureUnit.Fahrenheit))
    serial.writeValue("Sound", input.soundLevel())
}
function Set_MODE_INSTANCE_ID () {
    MODE_INSTANCE_TIMER = 12
    MODE_INSTANCE_BLINKING = 13
}
function Set_BRIGHTNESS () {
    MAXIMUM_BRIGHTNESS = 100
    MINIMUM_BRIGHTNESS = 0
}
function Write_point () {
    serial.writeNumber(Lite)
    console.logValue("Lite", Lite)
    serial.writeNumber(SoundLo)
    console.logValue("Sound Lo", SoundLo)
    serial.writeNumber(SoundHi)
    console.logValue("Sound Hi", SoundHi)
    serial.writeNumber(Temp)
    console.logValue("Temp", Temp)
    serial.writeNumber(TempSet)
    console.logValue("Temp Set", TempSet)
}
function Set_SPEED_MODE () {
    SPEED_MODE_NONE = 0
    SPEED_MODE_LOW = 1
    SPEED_MODE_MEDIUM = 2
    SPEED_MODE_HIGH = 3
}
function TempSetButton () {
    if (input.buttonB.isPressed()) {
        TempSet += 1
        tone()
        console.logValue("Setting", TempSet)
    }
    if (input.buttonA.isPressed()) {
        TempSet += -1
        tone()
        console.logValue("Setting", TempSet)
    }
}
function Set_Alexa_App_Specific_Property_Ordinals () {
    PROPERTY_POWER_STATE = 0
    PROPERTY_BRIGHTNESS = 1
    PROPERTY_SPEED_MODE = 2
    PROPERTY_TIMER_MODE = 3
}
function SetVar () {
    Lite = 150
    SoundHi = 150
    SoundLo = 150
    TempSet = 70
    Set_MODE_INSTANCE_ID()
    Set_TIMER_MODE()
    Set_SPEED_MODE()
    Set_BRIGHTNESS()
    Set_GlobalVar()
}
let PROPERTY_TIMER_MODE = 0
let PROPERTY_SPEED_MODE = 0
let PROPERTY_BRIGHTNESS = 0
let PROPERTY_POWER_STATE = 0
let SPEED_MODE_HIGH = 0
let SPEED_MODE_MEDIUM = 0
let SPEED_MODE_LOW = 0
let MINIMUM_BRIGHTNESS = 0
let MODE_INSTANCE_BLINKING = 0
let MODE_INSTANCE_TIMER = 0
let Temp = 0
let TempSet = 0
let SoundLo = 0
let Lite = 0
let SoundHi = 0
let bool_g_blinkingPower = false
let int32_t_g_blinkingCountdown = 0
let int32_t_g_timerModeCountdown = 0
let bool_g_power = false
let uint8_t_g_timerMode = 0
let SPEED_MODE_NONE = 0
let uint8_t_g_blinkingMode = 0
let MAXIMUM_BRIGHTNESS = 0
let uint8_t_g_brightness = 0
let uint32_t_g_previousTick = 0
let TIMER_MODE_60_MIN = 0
let TIMER_MODE_10_MIN = 0
let TIMER_MODE_5_MIN = 0
let TIMER_MODE_NONE = 0
SetVar()
tone()
let LOG_COMPONENT_NAME = "ALX-CPX"
forever(function () {
    Read_point()
    Write_point()
    SoundLED()
    TempSetButton()
    TempSetLED()
})
