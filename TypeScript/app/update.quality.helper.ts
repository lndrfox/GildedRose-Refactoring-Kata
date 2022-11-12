import {Item} from "@/item";


export function updateItem(item: Item) {
  if(shouldBeUpdated(item)){
    decreaseSellIn(item);
    if(item.name == 'Aged Brie'){
      updateQualityAgedBrieItem(item);
    } else if(item.name == 'Backstage passes to a TAFKAL80ETC concert'){
      updateQualityBackstagePassesItem(item);
    } else {
      updateQualityGenericItem(item);
    }
  }
}

/* NON EXPORTED UTILS */

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

/* GENERIC HELPER FUNCTIONS */

function shouldBeUpdated(item :Item){
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

function sellDatePassed(item : Item){
  return item.sellIn <= 0;
}

/* GENERIC ITEM HELPER FUNCTIONS */

function updateQualityGenericItem(item : Item){
  if(sellDatePassed(item)) {
    decreaseQualityBy(item, 2);
  } else {
    decreaseQualityBy(item, 1);
  }
}

/* AGED BRIE ITEM HELPER FUNCTIONS */

function updateQualityAgedBrieItem(item : Item){
  if(sellDatePassed(item)) {
    increaseQualityBy(item, 2);
  } else {
    increaseQualityBy(item, 1);
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
