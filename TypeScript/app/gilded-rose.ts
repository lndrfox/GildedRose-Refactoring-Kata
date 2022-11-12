import {Item} from "@/item";
import {updateItem} from "@/update.quality.helper";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      updateItem(item);
    })
  }
}

