/**
 Dialog info for game shops
 */

var SHOP_COUNT = 9;

var SHOP_WEAPON = 0;
var SHOP_ARMOR = 1;
var SHOP_SPELL = 2;
var SHOP_ROOM = 3;
var SHOP_MESSAGE = 4;

var shop = new Array();
for (var i=0; i<SHOP_COUNT; i++) {
  shop[i] = new Object();
  shop[i].item = new Array();
}

// Cedar Village Shops
shop[0].name = "Cedar Arms";
shop[0].item[0] = {type:SHOP_WEAPON, value:2};
shop[0].item[1] = {type:SHOP_WEAPON, value:3};
shop[0].background = 1;

shop[1].name = "Simmons Fine Clothier";
shop[1].item[0] = {type:SHOP_ARMOR, value:2};
shop[1].item[1] = {type:SHOP_ARMOR, value:3};
shop[1].background = 1;

shop[2].name = "The Pilgrim Inn";
shop[2].item[0] = {type:SHOP_MESSAGE, msg1:"We saw dead walking", msg2:"from the Canal Boneyard."};
shop[2].item[1] = {type:SHOP_ROOM, value:10};
shop[2].background = 1;

shop[3].name = "Sage Therel";
shop[3].item[0] = {type:SHOP_MESSAGE, msg1:"Fire magic is effective", msg2:"against undead and bone."};
shop[3].item[1] = {type:SHOP_SPELL, value:2};
shop[3].background = 1;

shop[4].name = "Woodsman";
shop[4].item[1] = {type:SHOP_MESSAGE, msg1:"I'm staying right here", msg2:"until the sun comes back."};
shop[4].background = 1;

shop[5].name = "Stonegate Entrance";
shop[5].item[0] = {type:SHOP_MESSAGE, msg1:"No one allowed in or", msg2:"out of the city."};
shop[5].item[1] = {type:SHOP_MESSAGE, msg1:"(The demo ends here.", msg2:"Thanks for playing!)"};
shop[5].background = 1;

shop[6].name = "Thomas the Fence";
shop[6].item[0] = {type:SHOP_MESSAGE, msg1:"Unlock magic opens doors", msg2:"and harms automatons."};
shop[6].item[1] = {type:SHOP_SPELL, value:3};
shop[6].background = 1;

shop[7].name = "Thieves Guild";
shop[7].item[0] = {type:SHOP_MESSAGE, msg1:"For a small fee we can", msg2:"grant you safe passage"};
shop[7].item[1] = {type:SHOP_MESSAGE, msg1:"into Stonegate City.", msg2:"(Buy the full version!)"};
shop[7].background = 1;

shop[8].name = "A Nightmare";
shop[8].item[0] = {type:SHOP_MESSAGE, msg1:"Darkness has overtaken", msg2:"the human realm."};
shop[8].item[1] = {type:SHOP_MESSAGE, msg1:"The monastery is no", msg2:"longer safe."};
shop[8].background = 2;

//---- Set choice options for shops --------


function shop_set(shop_id) {
  
  dialog.shop_id = shop_id;
  dialog.title = shop[shop_id].name;
  dialog.select_pos = BUTTON_POS_OPT2;
  dialog.items_for_sale = false;

  // most shops should use the exit button as the third option
  dialog.option[2].button = DIALOG_BUTTON_EXIT;
  dialog.option[2].msg1 = "Exit";
  dialog.option[2].msg2 = "";

  // shops can have two items for purchase
  for (var i=0; i<=1; i++) {
    if (shop[shop_id].item[i]) {
      if (shop[shop_id].item[i].type == SHOP_WEAPON) {
        shop_set_weapon(i, shop[shop_id].item[i].value);
      }
      else if (shop[shop_id].item[i].type == SHOP_ARMOR) {
        shop_set_armor(i, shop[shop_id].item[i].value);
      }
	  else if (shop[shop_id].item[i].type == SHOP_SPELL) {
	    shop_set_spell(i, shop[shop_id].item[i].value);
	  }
	  else if (shop[shop_id].item[i].type == SHOP_ROOM) {
	    shop_set_room(i, shop[shop_id].item[i].value);
	  }
      else if (shop[shop_id].item[i].type == SHOP_MESSAGE) {
        shop_set_message(i, shop[shop_id].item[i].msg1, shop[shop_id].item[i].msg2);
      }
	}
	else {
	  shop_clear_slot(i);
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

function shop_set_spell(slot, spell_id) {
  var disable_reason = "";
  if (spell_id <= avatar.spellbook) disable_reason = "(You know this)";
  else if (spell_id > avatar.spellbook +1) disable_reason = "(Too advanced)";
  
  shop_set_buy(slot, "Spellbook: " + info.spells[spell_id].name, info.spells[spell_id].gold, disable_reason); 
}

function shop_set_room(slot, room_cost) {
  var disable_reason = "";
  if (avatar.hp == avatar.max_hp && avatar.mp == avatar.max_mp) disable_reason = "(You are well rested)";
  shop_set_buy(slot, "Room for the night", room_cost, disable_reason);
}

function shop_set_message(slot, msg1, msg2) {
  dialog.option[slot].button = DIALOG_BUTTON_NONE;
  dialog.option[slot].msg1 = msg1;
  dialog.option[slot].msg2 = msg2;
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
  
  // used to determine whether to display current gold
  dialog.items_for_sale = true;
}

function shop_clear_slot(slot) {
  dialog.option[slot].msg1 = "";
  dialog.option[slot].msg2 = "";
  dialog.option[slot].button = DIALOG_BUTTON_NONE;
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

  if (shop[shop_id].item[slot_id].type == SHOP_SPELL) {
    shop_buy_spell(shop[shop_id].item[slot_id].value);
    return;
  }
  
  if (shop[shop_id].item[slot_id].type == SHOP_ROOM) {
    shop_buy_room(shop[shop_id].item[slot_id].value);
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

function shop_buy_spell(spell_id) {
  var cost = info.spells[spell_id].gold;
  if (avatar.gold < cost) return;
  
  avatar.gold -= cost;
  avatar.spellbook = spell_id;
  dialog.message = "Learned " + info.spells[spell_id].name;
  shop_set(dialog.shop_id);
  redraw = true;
}

function shop_buy_room(cost) {
  if (avatar.gold < cost) return;
  
  avatar.gold -= cost;
  avatar.hp = avatar.max_hp;
  avatar.mp = avatar.max_mp;
  dialog.message = "You have rested";
  shop_set(dialog.shop_id);
  redraw = true;
}

function shop_exit(shop_id) {
  gamestate = STATE_EXPLORE;
  redraw = true; 
}




