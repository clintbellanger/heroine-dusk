/**
 Dialog info for game shops
 */

var SHOP_COUNT = 3;

var SHOP_WEAPON = 0;
var SHOP_ARMOR = 1;
var SHOP_SPELL = 2;
var SHOP_ROOM = 3;

var shop = new Array();
for (var i=0; i<SHOP_COUNT; i++) {
  shop[i] = new Object();
  shop[i].item = new Array();
}

shop[0].name = "Milford's General";
shop[0].exit = {x:4, y:9};
shop[0].item[0] = {type:SHOP_WEAPON, value:2};
shop[0].item[1] = {type:SHOP_ARMOR, value:2};


//---- Set choice options for shops --------


function shop_set(shop_id) {
  
  dialog.shop_id = shop_id;
  dialog.title = shop[shop_id].name;
  dialog.select_pos = BUTTON_POS_OPT2;

  // most shops should use the exit button as the third option
  dialog.option[2].button = DIALOG_BUTTON_EXIT;
  dialog.option[2].msg1 = "Exit";
  dialog.option[2].msg2 = "";

  // shops can have two items for purchase
  for (var i=0; i<=1; i++) {
    if (shop[shop_id].item[i].type == SHOP_WEAPON) {
      shop_set_weapon(i, shop[shop_id].item[i].value);
    }
    else if (shop[shop_id].item[i].type == SHOP_ARMOR) {
      shop_set_armor(i, shop[shop_id].item[i].value);
    }
  }

}

function shop_set_weapon(slot, weapon_id) {
  var disable_reason = "";
  if (weapon_id == avatar.weapon) disable_reason = "(You own this)";
  else if (weapon_id < avatar.weapon) disable_reason = "(Yours is better)";

  shop_set_buy(slot, info.weapons[weapon_id].name, info.weapons[weapon_id].gold, disable_reason);
}

function shop_set_armor(slot, armor_id) {
  var disable_reason = "";
  if (armor_id == avatar.armor) disable_reason = "(You own this)";
  else if (armor_id < avatar.armor) disable_reason = "(Yours is better)";

  shop_set_buy(slot, info.armors[armor_id].name, info.armors[armor_id].gold, disable_reason);
}

function shop_set_buy(slot, name, cost, disable_reason) {

  dialog.option[slot].msg1 = "Buy " + name;

  // show the gold cost or the reason you can't
  if (disable_reason != "") {
    dialog.option[slot].msg2 = disable_reason;
  }
  else {
    dialog.option[slot].msg2 = "for " + cost + " gold";
  }

  // display the dialog button if the item can be purchased
  var can_buy = true;
  if (avatar.gold < cost) can_buy = false;
  if (disable_reason != "") can_buy = false;

  if (can_buy) {
    dialog.option[slot].button = DIALOG_BUTTON_BUY;
  }
  else {
    dialog.option[slot].button = DIALOG_BUTTON_NONE;
  }
}

//---- Handle choices for shops --------

function shop_act(shop_id, slot_id) {

  if (slot_id == 2) {
    shop_exit(shop_id);
    return;
  }

  if (shop[shop_id].item[slot_id].type == SHOP_WEAPON) {
    shop_buy_weapon(shop[shop_id].item[slot_id].value);
    return;
  }

  if (shop[shop_id].item[slot_id].type == SHOP_ARMOR) {
    shop_buy_armor(shop[shop_id].item[slot_id].value);
    return;
  }

}

function shop_buy_weapon(weapon_id) {
  var cost = info.weapons[weapon_id].gold;
  if (avatar.gold < cost) return;

  avatar.gold -= cost;
  avatar.weapon = weapon_id;
  dialog.message = "Bought " + info.weapons[weapon_id].name;
  shop_set(dialog.shop_id);
  redraw = true;

}

function shop_buy_armor(armor_id) {
  var cost = info.armors[armor_id].gold;
  if (avatar.gold < cost) return;

  avatar.gold -= cost;
  avatar.armor = armor_id;
  dialog.message = "Bought " + info.armors[armor_id].name;
  shop_set(dialog.shop_id);
  redraw = true;
}

function shop_buy_room(cost) {
  if (avatar.gold < cost) return;
  
  avatar.gold -= cost;
  avatar.hp = avatar.max_hp;
  avatar.mp = avatar.max_mp;
  dialog.message = "You have rested";
  redraw = true;
}

function shop_exit(shop_id) {
  gamestate = STATE_EXPLORE;
  redraw = true; 
}




