var BACKDRIFT_PENALTY = 0.9;
var THROW_COOLDOWN = 25;
var WALLJUMP_DECAY = 1;
var MAXWALL_JUMPS = 5000;
var MOVEABLE_STATES = ["move", "jump", "fall", "land", "wallslide", "airChargeThrow"];
var PHYSICS_STATES = [...MOVEABLE_STATES, "createKnife", "airWaitAnim"];
var THROWABLE_STATES = ["move", "jump", "fall"];
var PLAYER_SCALE = 1.25;
var CHARGE_FRAMES = 10;
