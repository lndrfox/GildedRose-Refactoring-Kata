import {Item} from "@/item";


export function updateItem(item: Item) {
  if(shouldBeUpdated(item)){
    decreaseSellIn(item);
    if(item.name == 'Aged Brie'){
      updateQualityAgedBrieItem(item);
    } else if(item.name == 'Backstage passes to a TAFKAL80ETC concert'){
      updateQualityBackstagePassesItem(item);
    } else if (isConjuredItem(item)){
      updateQualityConjuredItem(item);
    } else {
      updateQualityGenericItem(item);
    }
  }
}

/* NON EXPORTED UTILS */

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

const GENERIC_ITEM_DECREASE_VALUE = 1 ;
const GENERIC_ITEM_DECREASE_VALUE_AFTER_SELL_IN = GENERIC_ITEM_DECREASE_VALUE * 2;

const AGED_BRIE_INCREASE_VALUE = GENERIC_ITEM_DECREASE_VALUE ;
const AGED_BRIE_INCREASE_VALUE_AFTER_SELL_IN = GENERIC_ITEM_DECREASE_VALUE * 2;

const CONJURED_ITEM_DECREASE_VALUE = GENERIC_ITEM_DECREASE_VALUE *2 ;
const CONJURED_ITEM_DECREASE_VALUE_AFTER_SELL_IN = GENERIC_ITEM_DECREASE_VALUE_AFTER_SELL_IN * 2;

/* GENERIC HELPER FUNCTIONS */

function shouldBeUpdated(item :Item) : boolean{
  return item.name != 'Sulfuras, Hand of Ragnaros';
}

function decreaseSellIn(item: Item){
  item.sellIn = item.sellIn -1 ;
}

function decreaseQualityBy(item : Item, decrease : number){
  let newQuality : number = item.quality - decrease;
  item.quality = (newQuality) < MIN_QUALITY ? MIN_QUALITY : newQuality;
}

function increaseQualityBy(item : Item, increase : number){
  let newQuality : number = item.quality + increase;
  item.quality = (newQuality) > MAX_QUALITY ? MAX_QUALITY : newQuality;
}

function dropQualityToMin (item : Item){
  item.quality = MIN_QUALITY;
}

function sellDatePassed(item : Item) :boolean{
  return item.sellIn <= 0;
}

/* GENERIC ITEM HELPER FUNCTIONS */

function updateQualityGenericItem(item : Item){
  if(sellDatePassed(item)) {
    decreaseQualityBy(item, GENERIC_ITEM_DECREASE_VALUE_AFTER_SELL_IN);
  } else {
    decreaseQualityBy(item, GENERIC_ITEM_DECREASE_VALUE);
  }
}

/* AGED BRIE ITEM HELPER FUNCTIONS */

function updateQualityAgedBrieItem(item : Item){
  if(sellDatePassed(item)) {
    increaseQualityBy(item, AGED_BRIE_INCREASE_VALUE_AFTER_SELL_IN);
  } else {
    increaseQualityBy(item, AGED_BRIE_INCREASE_VALUE);
  }
}

/* AGED BRIE ITEM HELPER FUNCTIONS */

function updateQualityBackstagePassesItem(item : Item){
  if(sellDatePassed(item)) {
    dropQualityToMin(item);
  } else if (item.sellIn > 10){
    increaseQualityBy(item, 1);
  } else if (item.sellIn > 5){
    increaseQualityBy(item, 2);
  } else {
    increaseQualityBy(item, 3);
  }
}

/* CONJURED ITEM HELPER FUNCTIONS */

function updateQualityConjuredItem(item : Item){
  if(sellDatePassed(item)) {
    decreaseQualityBy(item, CONJURED_ITEM_DECREASE_VALUE_AFTER_SELL_IN);
  } else {
    decreaseQualityBy(item, CONJURED_ITEM_DECREASE_VALUE);
  }
}

function isConjuredItem(item : Item) : boolean{
  return item.name.startsWith('Conjured');
}
