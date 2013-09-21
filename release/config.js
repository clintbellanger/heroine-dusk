/**
 Various config options to help deployment to different platforms.
 */

// The art has been prescaled by this factor.
// PRESCALE 1 means the default 160x120 assets are used in the image folder.
// e.g. PRESCALE 4 means the image folder has been replaced with the 640x480 prescaled assets.
var PRESCALE = 1;

// The output should be scaled to the following multiple of 160x120
// If STRETCH_TO_SCREEN is enabled, this output scale is recalculated for the current window size
// If STRETCH_TO_SCREEN is disabled, specify a custom output scale here.
var SCALE = 1;

// If disabled, the display won't scale any images (it will simply display PRESCALEd data).
var STRETCH_TO_SCREEN = true;

// user options that can be set from the main menu
var OPTIONS = new Object();
OPTIONS.animation = true;
OPTIONS.music = true;
OPTIONS.sfx = true;
